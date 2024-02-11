import { translate } from "@docusaurus/Translate";
import type { Props } from "@theme/CodeBlock/CopyButton";
import IconSuccess from "@theme/Icon/Success";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";

import useBaseUrl from "@docusaurus/useBaseUrl";
import { getHashFromCode } from "@site/src/util/hash";
import styles from "./styles.module.css";

export default function PlaygroundButton({ code, className }: Props): JSX.Element {
	const [isOpened, setIsOpened] = useState(false);
	const openTimeout = useRef<number | undefined>(undefined);

	const playgroundPrefix = useBaseUrl("playground/");

	const handleOpenCode = useCallback(() => {
		open(playgroundPrefix + getHashFromCode(code));

		setIsOpened(true);

		openTimeout.current = window.setTimeout(() => {
			setIsOpened(false);
		}, 1000);
	}, [code]);

	useEffect(() => () => window.clearTimeout(openTimeout.current), []);

	return (
		<button
			type="button"
			aria-label={
				isOpened
					? translate({
							id: "theme.CodeBlock.playgroundOpened",
							message: "Opened Playground",
							description: "The open in playground button label on code blocks",
						})
					: translate({
							id: "theme.CodeBlock.playgroundButtonAriaLabel",
							message: "Open in playground",
							description: "The ARIA label for open in playground code blocks button",
						})
			}
			title={translate({
				id: "theme.CodeBlock.openPlayground",
				message: "Open in playground",
				description: "The open in playground button label on code blocks",
			})}
			className={clsx("clean-btn", className, styles.playgroundButton, isOpened && styles.playgroundButtonCopied)}
			onClick={handleOpenCode}
		>
			<span className={styles.playgroundButtonIcons} aria-hidden="true">
				{
					<svg
						viewBox="0 0 263 263"
						xmlns="http://www.w3.org/2000/svg"
						width="100%"
						fill="none"
						className={styles.playgroundButtonIcon}
					>
						<g transform="translate(-395 -212) rotate(15 451 213)">
							<rect x="451" y="213" width="213" height="213" rx="0" fill="#E2241A" />
							<path
								d="M580.837 381.713V403.198C584.332 404.989 588.464 406.332 593.235 407.227C598.006 408.122 603.034 408.57 608.32 408.57C613.472 408.57 618.366 408.077 623.003 407.092C627.639 406.108 631.704 404.485 635.199 402.225C638.693 399.964 641.459 397.01 643.497 393.362C645.535 389.714 646.555 385.205 646.555 379.833C646.555 375.939 645.972 372.526 644.807 369.594C643.643 366.663 641.963 364.055 639.768 361.773C637.573 359.49 634.941 357.442 631.872 355.629C628.804 353.816 625.343 352.104 621.491 350.493C618.668 349.329 616.137 348.199 613.898 347.102C611.658 346.006 609.754 344.887 608.186 343.745C606.618 342.604 605.409 341.395 604.557 340.12C603.706 338.844 603.281 337.4 603.281 335.789C603.281 334.312 603.661 332.98 604.423 331.794C605.185 330.608 606.26 329.59 607.648 328.739C609.037 327.889 610.739 327.229 612.755 326.759C614.771 326.289 617.011 326.054 619.475 326.054C621.267 326.054 623.159 326.188 625.153 326.457C627.146 326.725 629.151 327.139 631.167 327.699C633.183 328.258 635.143 328.963 637.046 329.814C638.95 330.664 640.709 331.649 642.321 332.768V312.693C639.051 311.439 635.479 310.511 631.604 309.906C627.729 309.302 623.283 309 618.265 309C613.158 309 608.32 309.548 603.751 310.645C599.182 311.742 595.161 313.454 591.689 315.781C588.218 318.109 585.474 321.074 583.458 324.677C581.442 328.281 580.434 332.589 580.434 337.602C580.434 344.003 582.282 349.463 585.978 353.984C589.674 358.505 595.284 362.332 602.81 365.465C605.767 366.674 608.522 367.86 611.075 369.024C613.629 370.187 615.835 371.396 617.694 372.649C619.553 373.903 621.02 375.268 622.095 376.745C623.171 378.222 623.708 379.9 623.708 381.78C623.708 383.168 623.372 384.455 622.7 385.641C622.028 386.827 621.009 387.857 619.643 388.729C618.276 389.602 616.574 390.285 614.536 390.777C612.498 391.27 610.112 391.516 607.38 391.516C602.721 391.516 598.107 390.699 593.537 389.065C588.968 387.431 584.735 384.981 580.837 381.713ZM545.026 328.246H572.655V310.556H495.645V328.246H523.139V407.014H545.026V328.246Z"
								fill="white"
							/>
						</g>
					</svg>
				}

				<IconSuccess className={styles.playgroundButtonSuccessIcon} />
			</span>
		</button>
	);
}
