import { ThemeClassNames, usePrismTheme } from "@docusaurus/theme-common";
import { getPrismCssVariables } from "@docusaurus/theme-common/internal";
import clsx from "clsx";
import { type ComponentProps } from "react";
import styles from "./styles.module.css";

export default function CodeBlockContainer<T extends "div" | "pre">({
	as: As,
	...props
}: { as: T } & ComponentProps<T>): JSX.Element {
	const prismTheme = usePrismTheme();
	const prismCssVariables = getPrismCssVariables(prismTheme);
	return (
		<As
			// Polymorphic components are hard to type, without `oneOf` generics
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			{...(props as any)}
			style={prismCssVariables}
			className={clsx(props.className, styles.codeBlockContainer, ThemeClassNames.common.codeBlock)}
		/>
	);
}
