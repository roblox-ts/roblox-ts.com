import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useRecaptcha from "../../components/useRecaptcha";
import styles from "./styles.module.css";

const API = "https://roblox-ts-org-invite-production.up.railway.app";
interface RequestStatus {
	username: string;
	status: "not_queued" | "queued" | "success";
	invitationSent: boolean;
	verifiedAt: number | null;
}
const ERROR_MESSAGES: Record<string, string> = {
	invalid_username: "Enter your exact lowercase npm username. Shared team names cannot use this form.",
	captcha_failed: "Verification failed. Please request access again to retry.",
	submission_throttled: "Too many requests were submitted recently. Please try again later.",
	status_throttled: "Too many status checks. Please try again in a minute.",
	queue_full: "The request queue is full. Please try again later.",
};

async function fetchStatus(username: string, token?: string): Promise<RequestStatus> {
	let response: Response;
	try {
		response = await fetch(
			`${API}${token === undefined ? `/api/status?username=${encodeURIComponent(username)}` : "/api/requests"}`,
			{
				method: token === undefined ? "GET" : "POST",
				body:
					token === undefined ? undefined : new URLSearchParams({ username, "g-recaptcha-response": token }),
				credentials: "omit",
				cache: "no-store",
				signal: AbortSignal.timeout(15_000),
			},
		);
	} catch {
		throw new Error(
			token === undefined
				? "Could not check your status. Check your connection and try again."
				: "Could not confirm your request. Check your status before trying again.",
		);
	}
	const data = await response.json().catch(() => {
		throw new Error("The request service returned an unexpected response. Please try again later.");
	});
	if (!response.ok)
		throw new Error(ERROR_MESSAGES[data.error] ?? "The request service is unavailable. Please try again later.");
	if (
		data.username !== username ||
		!["not_queued", "queued", "success"].includes(data.status) ||
		typeof data.invitationSent !== "boolean" ||
		!(data.verifiedAt === null || (typeof data.verifiedAt === "number" && Number.isFinite(data.verifiedAt)))
	) {
		throw new Error("The request service returned an unexpected response. Please try again later.");
	}
	return data;
}

export default function JoinOrg() {
	const [username, setUsername] = useState("");
	const [status, setStatus] = useState<RequestStatus | null>(null);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const form = useRef<HTMLFormElement>(null);
	const active = useRef(false);
	const mounted = useRef(false);
	const { container, verify } = useRecaptcha();

	const run = useCallback(async (name: string, getToken?: () => Promise<string>) => {
		if (active.current) return;
		active.current = true;
		setBusy(true);
		setError("");
		try {
			const token = getToken ? await getToken() : undefined;
			if (!mounted.current) return;
			const result = await fetchStatus(name, token);
			if (!mounted.current) return;
			setStatus(result);
			const url = new URL(window.location.href);
			url.searchParams.set("username", name);
			window.history.replaceState(window.history.state, "", url);
		} catch (cause) {
			if (mounted.current) setError(cause instanceof Error ? cause.message : "Please try again later.");
		} finally {
			active.current = false;
			if (mounted.current) setBusy(false);
		}
	}, []);

	useEffect(() => {
		mounted.current = true;
		const names = new URLSearchParams(window.location.search).getAll("username");
		if (names.length === 1 && names[0]) {
			setUsername(names[0]);
			void run(names[0]);
		} else if (names.length) setError(ERROR_MESSAGES.invalid_username);
		return () => {
			mounted.current = false;
		};
	}, [run]);

	useEffect(() => {
		if (status?.status !== "queued" || error) return;
		const timer = setInterval(() => {
			if (!document.hidden) void run(status.username);
		}, 30_000);
		return () => clearInterval(timer);
	}, [status, error, run]);

	return (
		<Layout
			title="Join Org"
			description="Request access to the @rbxts npm organization and check your invitation status."
		>
			<main className={styles.shell}>
				<p className={styles.eyebrow}>BUILD WITH ROBLOX-TS</p>
				<h1>Join @rbxts.</h1>
				<p>
					Publish your own packages in the roblox-ts npm organization. Request an invitation or check an
					existing request using your npm username.
				</p>
				<form
					ref={form}
					onSubmit={event => {
						event.preventDefault();
						void run(username, verify);
					}}
					className={styles.form}
					aria-busy={busy}
				>
					<label htmlFor="npm-username">npm username</label>
					<input
						id="npm-username"
						name="username"
						value={username}
						onChange={event => {
							setUsername(event.target.value);
							setStatus(null);
							setError("");
						}}
						placeholder="your_npm_username"
						maxLength={214}
						autoCapitalize="none"
						autoComplete="username"
						spellCheck={false}
						required
						disabled={busy}
					/>
					<div className={styles.actions}>
						<button type="submit" className="button button--primary" disabled={busy}>
							Request access
						</button>
						<button
							type="button"
							className="button button--secondary button--outline"
							disabled={busy}
							onClick={() => {
								if (form.current?.reportValidity()) void run(username);
							}}
						>
							Check status
						</button>
						{busy && <span role="status">Working…</span>}
					</div>
					<div ref={container} />
				</form>
				<noscript>
					<p>Enable JavaScript to request access and check your status.</p>
				</noscript>
				{error && (
					<p role="alert" className={styles.error}>
						{error}
					</p>
				)}
				<div aria-live="polite" aria-atomic="true">
					{status && <StatusCard result={status} />}
				</div>
				<p className={styles.guide}>
					New to publishing? Read the{" "}
					<Link to="/docs/guides/typescript-packages">package publishing guide</Link>.
				</p>
			</main>
		</Layout>
	);
}

function StatusCard({ result }: { result: RequestStatus }) {
	const success = result.status === "success";
	const queued = result.status === "queued";
	return (
		<section className={styles.card} aria-label="Request status">
			<div className={`${styles.banner} ${success ? styles.success : queued ? styles.queued : ""}`}>
				<span className={styles.symbol} aria-hidden="true">
					{success ? "✓" : queued ? "···" : "–"}
				</span>
				<strong>{success ? "SUCCESS" : queued ? "QUEUED" : "NOT QUEUED"}</strong>
			</div>
			<div className={styles.content}>
				<h2>
					{success
						? "You're in @rbxts."
						: queued
							? result.invitationSent
								? "Check your email."
								: "You're on the list."
							: "No request found."}
				</h2>
				<p>
					{success
						? "Your organization membership and personal team are set up."
						: queued
							? result.invitationSent
								? "npm sent your invitation. Open the link in that email and sign in with the account shown below to accept it."
								: "A maintainer will prepare your invitation. npm will email you a link to accept it."
							: "Check your username or request access using the form above."}
				</p>
				<div className={styles.account}>
					<span>npm /</span> {result.username}
				</div>
				{(success || queued) && (
					<ul className={styles.details}>
						<li>
							<span>{success ? "Organization access" : "Request received"}</span>
							<span>Confirmed ✓</span>
						</li>
						<li>
							<span>{success ? "Personal team" : "Invitation"}</span>
							<span>
								{success ? `${result.username} ✓` : result.invitationSent ? "Email sent" : "Waiting"}
							</span>
						</li>
						{queued && (
							<li>
								<span>Organization access</span>
								<span>Awaiting acceptance</span>
							</li>
						)}
					</ul>
				)}
				{success && (
					<a className="button button--primary" href="https://www.npmjs.com/settings/rbxts/teams">
						Open @rbxts on npm ↗
					</a>
				)}
				<p className={styles.footnote}>
					{queued
						? "Status updates every 30 seconds while this page is open. You can bookmark this page or check back using your npm username."
						: success
							? result.verifiedAt !== null && (
									<>
										Verified{" "}
										<time dateTime={new Date(result.verifiedAt).toISOString()}>
											{new Date(result.verifiedAt).toLocaleString()}
										</time>
									</>
								)
							: "Already a member? You can continue using npm. This page only tracks access requests."}
				</p>
			</div>
		</section>
	);
}
