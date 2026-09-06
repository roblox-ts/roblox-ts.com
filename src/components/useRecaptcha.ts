import { useEffect, useRef } from "react";

type Captcha = {
	render: (
		element: HTMLElement,
		options: {
			sitekey: string;
			size: "invisible";
			callback: (token: string) => void;
			"expired-callback": () => void;
			"error-callback": () => void;
		},
	) => number;
	reset: (id: number) => void;
	execute: (id: number) => void;
};

declare global {
	interface Window {
		grecaptcha?: Captcha;
		rbxtsCaptchaReady?: () => void;
	}
}

let loading: Promise<Captcha> | undefined;
function loadCaptcha(): Promise<Captcha> {
	if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha);
	if (loading) return loading;
	loading = new Promise<Captcha>((resolve, reject) => {
		const script = document.createElement("script");
		const fail = () => {
			clearTimeout(timeout);
			script.remove();
			delete window.rbxtsCaptchaReady;
			loading = undefined;
			reject(new Error("Verification could not load. Check your connection or content blocker and try again."));
		};
		const timeout = setTimeout(fail, 15_000);
		window.rbxtsCaptchaReady = () => {
			clearTimeout(timeout);
			delete window.rbxtsCaptchaReady;
			if (window.grecaptcha?.render) resolve(window.grecaptcha);
			else fail();
		};
		script.src = "https://www.google.com/recaptcha/api.js?onload=rbxtsCaptchaReady&render=explicit";
		script.async = true;
		script.onerror = fail;
		document.head.appendChild(script);
	});
	return loading;
}

export default function useRecaptcha() {
	const container = useRef<HTMLDivElement>(null);
	const widget = useRef<number | undefined>(undefined);
	const pending = useRef<{ resolve: (token: string) => void; reject: (error: Error) => void } | undefined>(undefined);
	useEffect(
		() => () => {
			pending.current?.reject(new Error("Verification cancelled."));
			pending.current = undefined;
			if (widget.current !== undefined) window.grecaptcha?.reset(widget.current);
		},
		[],
	);

	async function verify() {
		const captcha = await loadCaptcha();
		if (!container.current) throw new Error("Verification cancelled.");
		if (widget.current === undefined) {
			const fail = () => pending.current?.reject(new Error("Verification expired or failed. Please try again."));
			widget.current = captcha.render(container.current, {
				sitekey: "6LeJpLIUAAAAANNNvHEWfIBZR08Tamp06xD4yIBy",
				size: "invisible",
				callback: token => pending.current?.resolve(token),
				"expired-callback": fail,
				"error-callback": fail,
			});
		}
		captcha.reset(widget.current);
		let timeout: ReturnType<typeof setTimeout> | undefined;
		try {
			return await new Promise<string>((resolve, reject) => {
				pending.current = { resolve, reject };
				timeout = setTimeout(() => reject(new Error("Verification timed out. Please try again.")), 120_000);
				captcha.execute(widget.current!);
			});
		} finally {
			clearTimeout(timeout);
			pending.current = undefined;
			captcha.reset(widget.current);
		}
	}
	return { container, verify };
}
