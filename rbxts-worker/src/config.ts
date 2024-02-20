import path from "path";
import { Configuration, ProvidePlugin } from "webpack";

const config: Configuration = {
	mode: "production",
	entry: path.resolve(__dirname, "../out/worker.js"),
	output: {
		path: path.resolve(__dirname, "../../static"),
		filename: "rbxts-worker.js",
	},
	optimization: {
		minimize: true,
	},
	stats: {
		errorDetails: true,
	},
	plugins: [
		new ProvidePlugin({
			process: require.resolve("process/browser"),
		}),
	],
	resolve: {
		fallback: {
			path: require.resolve("path-browserify"),
			os: require.resolve("os-browserify/browser"),
		},
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
		child_process: "{}",
		util: "{}",
	},
	performance: { hints: false },
};

export default config;
