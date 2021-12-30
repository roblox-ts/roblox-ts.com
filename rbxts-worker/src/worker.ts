/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { VirtualProject, COMPILER_VERSION } from "roblox-ts";

const project = new VirtualProject();

interface CompileEvent {
	type: "compile";
	source: string;
}

interface WriteFileEvent {
	type: "writeFile";
	filePath: string;
	content: string;
}

interface SetMappingEvent {
	type: "setMapping";
	typingsPath: string;
	mainPath: string;
}

type PlaygroundEvent = CompileEvent | WriteFileEvent | SetMappingEvent;

addEventListener("message", (event: MessageEvent<PlaygroundEvent>) => {
	if (event.data.type === "compile") {
		let luaSource;
		try {
			luaSource = project.compileSource(event.data.source + "\n;export {};");
		} catch (e) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			luaSource = ((e as any).toString() as string)
				.replace(/(\x9B|\x1B\[)[0-?]*[ -\/]*[@-~]/g, "")
				.split("\n")
				.filter(v => v.length > 0)
				.map((v: string) => `-- ${v}`)
				.join("\n");
		}
		postMessage({ source: luaSource });
	} else if (event.data.type === "writeFile") {
		project.vfs.writeFile(event.data.filePath, event.data.content);
	} else if (event.data.type === "setMapping") {
		project.setMapping(event.data.typingsPath, event.data.mainPath);
	}
});

console.log(`roblox-ts@${COMPILER_VERSION}`);
