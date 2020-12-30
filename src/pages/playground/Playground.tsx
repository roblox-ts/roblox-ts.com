import Editor, { EditorDidMount } from "@monaco-editor/react";
import useThemeContext from "@theme/hooks/useThemeContext";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import React from "react";
import { getCodeFromHash, getHashFromCode } from "../../utils/hash";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

const SHARED_EDITOR_OPTIONS: editor.IEditorConstructionOptions = {
	minimap: { enabled: false },
	scrollbar: { useShadows: false },
	scrollBeyondLastLine: false,
};

const TS_EDITOR_OPTIONS: editor.IEditorConstructionOptions = { ...SHARED_EDITOR_OPTIONS };

const LUA_EDITOR_OPTIONS: editor.IEditorConstructionOptions = { ...SHARED_EDITOR_OPTIONS, readOnly: true };

const EXAMPLES = ["Lava"];

async function getExampleCode(examplesDir: string, exampleName: string): Promise<string> {
	return fetch(`${examplesDir}${exampleName}.ts`).then(response => response.text());
}

interface ExampleProps {
	name: string;
	onClick: () => void;
}

const Example: React.FunctionComponent<ExampleProps> = props => {
	return (
		<li>
			<a className={`${styles.pointer} dropdown__link`} onClick={props.onClick}>
				{props.name}
			</a>
		</li>
	);
};

export default () => {
	const [input, setInput] = React.useState("");
	const [output, setOutput] = React.useState("");

	const examplesDir = useBaseUrl("playground-examples/src/");

	async function setInputToExample(name: string) {
		return getExampleCode(examplesDir, EXAMPLES[0]).then(exampleCode => setInput(exampleCode));
	}

	// set input from url hash on start
	React.useEffect(() => {
		const code = getCodeFromHash(window.location.hash);
		if (code) {
			setInput(code);
		} else {
			void setInputToExample(EXAMPLES[0]);
		}
	}, []);

	// set input when editor text changes
	const tsEditorDidMount: EditorDidMount = (getEditorValue, editor) => {
		editor.onDidChangeModelContent(() => {
			const editorValue = getEditorValue();
			window.location.hash = getHashFromCode(editorValue);
			setInput(editorValue);
		});
	};

	// set output when input changes
	React.useEffect(() => setOutput(input), [input]);

	const editorTheme = useThemeContext().isDarkTheme ? "dark" : "light";

	return (
		<>
			<nav className={`${styles.subNavBar} navbar`}>
				<div className="navbar__inner">
					<div className="navbar__items">
						<div className={`navbar__item dropdown dropdown--hoverable  ${styles.pointer}`}>
							<a className={`navbar__link ${styles.pointer}`}>Examples</a>
							<ul className="dropdown__menu">
								{EXAMPLES.map(name => (
									<Example name={name} onClick={() => setInputToExample(name)} />
								))}
							</ul>
						</div>
					</div>
				</div>
			</nav>
			<div>
				<div className={styles.editorWrapper}>
					<Editor
						language="typescript"
						options={TS_EDITOR_OPTIONS}
						theme={editorTheme}
						value={input}
						editorDidMount={tsEditorDidMount}
					/>
				</div>
				<div className={styles.editorWrapper}>
					<Editor language="lua" options={LUA_EDITOR_OPTIONS} theme={editorTheme} value={output} />
				</div>
			</div>
		</>
	);
};
