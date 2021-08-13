import { Configuration } from "webpack";
import path from "path";

const config: Configuration = {
	mode: "production",
	entry: path.resolve(__dirname, "../out/worker.js"),
	output: {
		path: path.resolve(__dirname, "../../static"),
		filename: "rbxts-worker.js",
	},
	externals: {
		fs: "{}",
		module: "{}",
		worker_threads: "{}",
		"cross-spawn": "{}",
		"fs-extra": "{}",
		chokidar: "{}",
		klaw: "{}",
		net: "{}",
		tls: "{}",
		yargs: "{}",
		"@microsoft/typescript-etw": "new Proxy({}, { get: () => () => {} })",
		"universal-analytics": "{}",
		uuid: "{}",
		perf_hooks: "{}",
		inspector: "{}",
	},
	performance: { hints: false },
};

export default config;
