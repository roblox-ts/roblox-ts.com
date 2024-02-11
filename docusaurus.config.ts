import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";
import { ProvidePlugin } from "webpack";

const config: Config = {
	title: "roblox-ts",
	tagline: "A TypeScript-to-Luau Compiler for Roblox",
	favicon: "img/roblox-ts.svg",

	// Set the production url of your site here
	url: "https://roblox-ts.com",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "roblox-ts", // Usually your GitHub org/user name.
	projectName: "roblox-ts", // Usually your repo name.

	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},

	plugins: [
		() => ({
			name: "Webpack Config",
			configureWebpack(config, isServer, utils, content) {
				return {
					resolve: {
						fallback: {
							path: require.resolve("path-browserify"),
						},
					},
					plugins: [
						new ProvidePlugin({
							process: "process/browser.js",
						}),
					],
				};
			},
		}),
	],

	presets: [
		[
			"classic",
			{
				docs: {
					sidebarPath: "./sidebars.ts",
					editUrl: "https://github.com/roblox-ts/roblox-ts.com/blob/master/",
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
				blog: false,
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		colorMode: {
			defaultMode: "dark",
			disableSwitch: true,
			respectPrefersColorScheme: false,
		},
		navbar: {
			title: "roblox-ts",
			logo: {
				alt: "roblox-ts",
				src: "img/roblox-ts.svg",
			},
			items: [
				{
					type: "docSidebar",
					sidebarId: "docs",
					position: "left",
					label: "Docs",
				},
				{
					label: "Playground",
					to: "playground/",
					position: "left",
				},
				{
					label: "Packages",
					href: "https://www.npmjs.com/org/rbxts",
					position: "left",
				},
				{
					href: "https://discord.roblox-ts.com",
					className: "header-discord-link",
					position: "right",
				},
				{
					href: "https://github.com/roblox-ts/roblox-ts",
					className: "header-github-link",
					position: "right",
				},
			],
		},
		prism: {
			theme: prismThemes.vsLight,
			darkTheme: prismThemes.vsDark,
			additionalLanguages: ["lua", "bash"],
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
