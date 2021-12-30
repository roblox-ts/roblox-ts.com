import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";

const config: Configuration = {
	mode: "production",
	entry: path.resolve(__dirname, "../out/worker.js"),
	output: {
		path: path.resolve(__dirname, "../../static"),
		filename: "rbxts-worker.js",
	},
	plugins: [new NodePolyfillPlugin()],
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
