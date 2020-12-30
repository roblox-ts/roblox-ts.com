import Editor, { EditorDidMount } from "@monaco-editor/react";
import useThemeContext from "@theme/hooks/useThemeContext";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import React from "react";
import { getCodeFromHash, getHashFromCode } from "../../utils/hash";
import styles from "./styles.module.css";

const SHARED_EDITOR_OPTIONS: editor.IEditorConstructionOptions = {
	minimap: { enabled: false },
	scrollbar: { useShadows: false },
};

const TS_EDITOR_OPTIONS: editor.IEditorConstructionOptions = { ...SHARED_EDITOR_OPTIONS };

const LUA_EDITOR_OPTIONS: editor.IEditorConstructionOptions = { ...SHARED_EDITOR_OPTIONS, readOnly: true };

export default () => {
	const [input, setInput] = React.useState("");
	const [output, setOutput] = React.useState("");

	// set input from url hash on start
	React.useEffect(() => {
		const code = getCodeFromHash(window.location.hash);
		if (code) {
			setInput(code);
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
	React.useEffect(() => {
		setOutput(input);
	}, [input]);

	const editorTheme = useThemeContext().isDarkTheme ? "dark" : "light";

	return (
		<div>
			<div className={styles.editorWrapper}>
				<Editor
					language="typescript"
					options={TS_EDITOR_OPTIONS}
					theme={editorTheme}
					editorDidMount={tsEditorDidMount}
					value={input}
				/>
			</div>
			<div className={styles.editorWrapper}>
				<Editor language="lua" options={LUA_EDITOR_OPTIONS} theme={editorTheme} value={output} />
			</div>
		</div>
	);
};
