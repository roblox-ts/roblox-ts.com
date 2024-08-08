import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare const grecaptcha: { reset: () => void } | undefined;

const RecaptchaLoader = () => {
	const location = useLocation();

	useEffect(() => {
		if (document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]')) {
			if (typeof grecaptcha !== "undefined") {
				grecaptcha.reset();
			}
			return;
		}

		const script = document.createElement("script");
		script.src = "https://www.google.com/recaptcha/api.js";
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, [location.pathname]);

	return null;
};

export default RecaptchaLoader;
