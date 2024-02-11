import { usePrismTheme, useThemeConfig } from "@docusaurus/theme-common";
import {
	containsLineNumbers,
	parseCodeBlockTitle,
	parseLanguage,
	parseLines,
	useCodeWordWrap,
} from "@docusaurus/theme-common/internal";
import Container from "@theme/CodeBlock/Container";
import type { Props } from "@theme/CodeBlock/Content/String";
import CopyButton from "@theme/CodeBlock/CopyButton";
import Line from "@theme/CodeBlock/Line";
import WordWrapButton from "@theme/CodeBlock/WordWrapButton";
import clsx from "clsx";
import { Highlight, type Language } from "prism-react-renderer";

import PlaygroundButton from "@site/src/theme/CodeBlock/PlaygroundButton";
import styles from "./styles.module.css";

// Prism languages are always lowercase
// We want to fail-safe and allow both "php" and "PHP"
// See https://github.com/facebook/docusaurus/issues/9012
function normalizeLanguage(language: string | undefined): string | undefined {
	return language?.toLowerCase();
}

export default function CodeBlockString({
	children,
	className: blockClassName = "",
	metastring,
	title: titleProp,
	showLineNumbers: showLineNumbersProp,
	language: languageProp,
}: Props): JSX.Element {
	const {
		prism: { defaultLanguage, magicComments },
	} = useThemeConfig();
	const language = normalizeLanguage(
		languageProp ?? parseLanguage(blockClassName) ?? defaultLanguage,
	);

	const isTypescript = language === "ts" || language === "tsx";

	const prismTheme = usePrismTheme();
	const wordWrap = useCodeWordWrap();

	// We still parse the metastring in case we want to support more syntax in the
	// future. Note that MDX doesn't strip quotes when parsing metastring:
	// "title=\"xyz\"" => title: "\"xyz\""
	const title = parseCodeBlockTitle(metastring) || titleProp;

	const { lineClassNames, code } = parseLines(children, {
		metastring,
		language,
		magicComments,
	});
	const showLineNumbers =
		showLineNumbersProp ?? containsLineNumbers(metastring);

	// I don't know why, but 5 spaces = 4 spaces rendered
	const codeWithSpaces = code.replace(/\t/g, new Array(5).join(" "));

	return (
		<Container
			as="div"
			className={clsx(
				blockClassName,
				language &&
					!blockClassName.includes(`language-${language}`) &&
					`language-${language}`,
			)}
		>
			{title && <div className={styles.codeBlockTitle}>{title}</div>}
			<div className={styles.codeBlockContent}>
				<Highlight
					theme={prismTheme}
					code={codeWithSpaces}
					language={(language ?? "text") as Language}
				>
					{({
						className,
						style,
						tokens,
						getLineProps,
						getTokenProps,
					}) => (
						<pre
							tabIndex={0}
							ref={wordWrap.codeBlockRef}
							className={clsx(
								className,
								styles.codeBlock,
								"thin-scrollbar",
							)}
							style={style}
						>
							<code
								className={clsx(
									styles.codeBlockLines,
									showLineNumbers &&
										styles.codeBlockLinesWithNumbering,
								)}
							>
								{tokens.map((line, i) => (
									<Line
										key={i}
										line={line}
										getLineProps={getLineProps}
										getTokenProps={getTokenProps}
										classNames={lineClassNames[i]}
										showLineNumbers={showLineNumbers}
									/>
								))}
							</code>
						</pre>
					)}
				</Highlight>
				<div className={styles.buttonGroup}>
					{(wordWrap.isEnabled || wordWrap.isCodeScrollable) && (
						<WordWrapButton
							className={styles.codeButton}
							onClick={() => wordWrap.toggle()}
							isEnabled={wordWrap.isEnabled}
						/>
					)}
					<CopyButton className={styles.codeButton} code={code} />
					{isTypescript && (
						<PlaygroundButton
							className={styles.codeButton}
							code={code}
						/>
					)}
				</div>
			</div>
		</Container>
	);
}
