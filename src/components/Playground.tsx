/* eslint-disable no-console */

import useBaseUrl from "@docusaurus/useBaseUrl";
import Editor, { OnMount, loader } from "@monaco-editor/react";
import useThemeContext from "@theme/hooks/useThemeContext";
import type { editor } from "monaco-editor";
import path from "path";
import prettier from "prettier";
import parserTypeScript from "prettier/parser-typescript";
import React from "react";
import styles from "../pages/playground/styles.module.css";
import { getCodeFromHash, getHashFromCode } from "../util/hash";
import { Lazy } from "../util/Lazy";

const SHARED_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
	minimap: { enabled: false },
	scrollbar: { useShadows: false },
	scrollBeyondLastLine: false,
	insertSpaces: false,
	tabSize: 4,
};

const TS_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = { ...SHARED_EDITOR_OPTIONS };

const LUA_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = { ...SHARED_EDITOR_OPTIONS, readOnly: true };

const EXAMPLES = ["Lava", "t", "Roact"];

const CORE_PACKAGES = ["types", "compiler-types"];

const COMPILE_DELAY_MS = 300;

const PRETTIER_OPTIONS: prettier.Options = {
	parser: "typescript",
	plugins: [parserTypeScript],

	semi: true,
	trailingComma: "all",
	singleQuote: false,
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	arrowParens: "avoid",
};

async function getExampleCode(examplesDir: string, exampleName: string): Promise<string> {
	return fetch(`${examplesDir}/${exampleName}.tsx`).then(response => response.text());
}

const worker = new Lazy(() => new Worker("../rbxts-worker.js"));
const packages = new Set<string>();

const INPUT_IMPORT_REGEX = /["']@rbxts\/([^"']+)["']/g;
const REFERENCE_PATH_REGEX = /\/\/\/\s*<reference path=["']([^"']+)["']\s*\/>/g;
const REFERENCE_TYPES_REGEX = /\/\/\/\s*<reference types=["']@rbxts\/([^"']+)["']\s*\/>/g;
const IMPORT_EXPORT_REGEX = /(?:import|export)\s+.+\s+from\s+['"]([^'"]+)['"]/g;

function getMatches(regex: RegExp, str: string) {
	const result = new Array<string>();
	for (const match of str.matchAll(regex)) {
		result.push(match[1]);
	}
	return result;
}

const SCOPE = "@rbxts";
const JS_DELIVR = "https://cdn.jsdelivr.net/npm";

interface PackageJson {
	version: string;
	main?: string;
	typings?: string;
	types?: string;
	dependencies: { [index: string]: string };
}

async function downloadFile(filePath: string) {
	const parts = filePath.split("/");
	if (!parts[1].includes("@")) {
		parts[1] += "@latest";
	}
	filePath = parts.join("/");
	return fetch(`${JS_DELIVR}/${filePath}`);
}

async function writeFile(filePath: string, content: string) {
	worker.get().postMessage({ type: "writeFile", filePath: `/node_modules/${filePath}`, content });
	(await loader.init()).languages.typescript.typescriptDefaults.addExtraLib(content, filePath);
}

const loaded = new Set<string>();
async function downloadDefinition(pkgName: string, filePath: string, isPkgTypingsPath = false) {
	if (loaded.has(filePath)) return Promise.resolve();
	loaded.add(filePath);

	const content = await downloadFile(filePath)
		.then(response => {
			if (response.status === 404) {
				filePath = filePath.slice(0, -".d.ts".length) + "/index.d.ts";
				return downloadFile(filePath);
			}
			return response;
		})
		.then(response => response.text());

	const jobs = new Array<Promise<unknown>>();

	for (const ref of getMatches(REFERENCE_PATH_REGEX, content)) {
		const refPath = path.resolve(path.dirname(filePath), ref).substr(1);
		jobs.push(downloadDefinition(pkgName, refPath));
	}

	for (let ref of getMatches(IMPORT_EXPORT_REGEX, content)) {
		// assume paths ending with `.` or `..` are pointing to folders, and need a /index.d.ts suffix
		if (ref.endsWith(".") || ref.endsWith("..")) {
			ref += "/index";
		}
		const refPath = path.resolve(path.dirname(filePath), ref).substr(1) + ".d.ts";
		jobs.push(downloadDefinition(pkgName, refPath));
	}

	for (const ref of getMatches(REFERENCE_TYPES_REGEX, content)) {
		jobs.push(downloadPackage(ref));
	}

	await writeFile(filePath, content);

	if (isPkgTypingsPath) {
		(await loader.init()).languages.typescript.typescriptDefaults.addExtraLib(
			content,
			path.join(pkgName, "index.d.ts"),
		);
	}

	return Promise.allSettled(jobs);
}

async function downloadPackage(name: string) {
	if (!packages.has(name)) {
		packages.add(name);
		const pkgName = `${SCOPE}/${name}`;
		const pkgJsonPath = `${pkgName}/package.json`;
		const pkgJsonResponse = await downloadFile(pkgJsonPath);
		if (pkgJsonResponse.status === 200) {
			const pkgJson = (await pkgJsonResponse.json()) as PackageJson;
			await writeFile(pkgJsonPath, JSON.stringify(pkgJson));
			console.log(`${pkgName}@${pkgJson.version}`);
			// remove leading / after resolve
			const mainPath = path.resolve(`/${pkgName}`, pkgJson.main ?? "").substr(1);
			const typingsPath = path.resolve(`/${pkgName}`, pkgJson.types ?? pkgJson.typings ?? "index.d.ts").substr(1);
			worker.get().postMessage({
				type: "setMapping",
				typingsPath: `/node_modules/${typingsPath}`,
				mainPath: `/node_modules/${mainPath}`,
			});
			await downloadDefinition(pkgName, typingsPath, true);
		} else {
			console.warn(`failed to download ${pkgName}`);
		}
	}
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
	worker.get();

	const [input, setInput] = React.useState("");
	const [output, setOutput] = React.useState("");
	const [timerHandle, setTimerHandle] = React.useState<number>();
	const [corePackagesLoaded, setCorePackagesLoaded] = React.useState(false);
	const [inputModel, setInputModel] = React.useState<editor.ITextModel>();

	const examplesDir = useBaseUrl("playground-examples/src");
	function setInputModelValue(value: string) {
		inputModel?.setValue(value);
	}

	async function setInputToExample(name: string) {
		return getExampleCode(examplesDir, name).then(code => {
			setInputModelValue(code);
			setInput(code);
		});
	}

	// update input from url hash on start
	React.useEffect(() => {
		if (inputModel) {
			if (location.hash !== "") {
				void getCodeFromHash(location.hash).then(code => {
					if (code) {
						setInputModelValue(code);
						setInput(code);
					}
				});
			} else if (inputModel && inputModel.getValue() === "") {
				void setInputToExample(EXAMPLES[0]);
			}
		}
	}, [inputModel]);

	// update input when editor text changes
	const tsEditorOnMount: OnMount = editor => {
		void loader.init().then(monaco => {
			monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
				allowNonTsExtensions: true,
				allowSyntheticDefaultImports: true,
				downlevelIteration: true,
				module: monaco.languages.typescript.ModuleKind.CommonJS,
				moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
				noLib: true,
				strict: true,
				target: monaco.languages.typescript.ScriptTarget.ESNext,
				typeRoots: [`node_modules/${SCOPE}`],
				noEmit: true,

				baseUrl: ".",
				rootDir: ".",

				jsx: monaco.languages.typescript.JsxEmit.React,
				jsxFactory: "Roact.createElement",
				jsxFragmentFactory: "Roact.Fragment",
			});

			const uri = monaco.Uri.file("input.tsx");
			const model = monaco.editor.getModel(uri) || monaco.editor.createModel(input, "typescript", uri);
			editor.setModel(model);
			const modelContentChangedConn = editor.onDidChangeModelContent(() => setInput(editor.getValue()));

			// shift+alt+f to format
			editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.KEY_F, () => {
				const cursorOffset = model.getOffsetAt(editor.getPosition() || new monaco.Position(0, 0));
				const formatResult = prettier.formatWithCursor(model.getValue(), {
					...PRETTIER_OPTIONS,
					cursorOffset,
					rangeStart: undefined,
					rangeEnd: undefined,
				});

				model.setValue(formatResult.formatted);
				editor.setPosition(model.getPositionAt(formatResult.cursorOffset));
			});

			setInputModel(model);
			setInput(model.getValue());
			return () => modelContentChangedConn.dispose();
		});
	};

	// update hash when input changes
	React.useEffect(() => {
		if (inputModel) {
			location.hash = getHashFromCode(input);
		}
	}, [input, inputModel]);

	// kick off compile when input changes
	React.useEffect(() => {
		if (!corePackagesLoaded) return;
		if (timerHandle !== undefined) {
			window.clearTimeout(timerHandle);
		}
		setTimerHandle(
			window.setTimeout(() => {
				void Promise.allSettled(getMatches(INPUT_IMPORT_REGEX, input).map(downloadPackage)).then(() => {
					worker.get().postMessage({ type: "compile", source: input });
				});
			}, COMPILE_DELAY_MS),
		);
	}, [input, corePackagesLoaded]);

	// listen for rbxts-worker compile results
	React.useEffect(() => {
		worker.get().addEventListener("message", e => {
			const source = e.data.source;
			if (typeof source === "string") {
				setOutput(source);
			}
		});
	}, []);

	// load core packages
	React.useEffect(() => {
		void Promise.allSettled(CORE_PACKAGES.map(v => downloadPackage(v))).then(() => setCorePackagesLoaded(true));
	}, []);

	// ctrl+s to save
	React.useEffect(() => {
		window.addEventListener("keydown", event => {
			if ((event.ctrlKey || event.metaKey) && event.code === "KeyS") {
				event.preventDefault();
				void navigator.clipboard.writeText(location.href);
			}
		});
	}, []);

	const { isDarkTheme } = useThemeContext();
	const editorTheme = isDarkTheme ? "vs-dark" : "light";

	return (
		<>
			<nav className={`${styles.subNavBar} navbar`}>
				<div className="navbar__inner">
					<div className="navbar__items">
						<div className={`navbar__item dropdown dropdown--hoverable ${styles.pointer}`}>
							<a className={`navbar__link ${styles.pointer}`}>Examples</a>
							<ul className="dropdown__menu">
								{EXAMPLES.map((name, idx) => (
									<Example key={idx} name={name} onClick={() => setInputToExample(name)} />
								))}
							</ul>
						</div>
					</div>
				</div>
			</nav>
			<div className={styles.playground}>
				<div className={styles.editorWrapper}>
					<Editor
						language="typescript"
						options={TS_EDITOR_OPTIONS}
						theme={editorTheme}
						onMount={tsEditorOnMount}
					/>
				</div>
				<div className={styles.editorWrapper}>
					<Editor language="lua" options={LUA_EDITOR_OPTIONS} theme={editorTheme} value={output} />
				</div>
			</div>
		</>
	);
};
