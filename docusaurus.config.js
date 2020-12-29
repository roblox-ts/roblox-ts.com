module.exports = {
	title: "roblox-ts",
	tagline: "A TypeScript-to-Luau Compiler for Roblox",
	url: "https://roblox-ts.com",
	baseUrl: "/",
	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",
	favicon: "img/favicon.ico",
	organizationName: "roblox-ts",
	projectName: "roblox-ts",
	themeConfig: {
		colorMode: {
			defaultMode: "dark",
		},
		navbar: {
			title: "roblox-ts",
			logo: {
				alt: "roblox-ts",
				src: "img/roblox-ts-128.png",
			},
			items: [
				{
					label: "Docs",
					to: "docs/",
					position: "left",
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
					label: "Discussions",
					href: "https://github.com/roblox-ts/roblox-ts/discussions",
					position: "left",
				},
				{
					href: "https://discord.gg/f6Rn6RY",
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
			theme: require("prism-react-renderer/themes/github"),
			darkTheme: require("prism-react-renderer/themes/vsDark"),
		},
		footer: {
			style: undefined,
			links: undefined,
			copyright: undefined,
		},
	},
	presets: [
		[
			"@docusaurus/preset-classic",
			{
				docs: {
					sidebarPath: require.resolve("./sidebars.json"),
					editUrl:
						"https://github.com/roblox-ts/roblox-ts.github.io/blob/master/",
				},
				theme: {
					customCss: require.resolve("./src/css/custom.css"),
				},
			},
		],
	],
};
