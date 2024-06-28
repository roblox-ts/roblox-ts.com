import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
	docs: [
		"introduction",
		"quick-start",
		"usage",
		"setup-guide",
		"faq/index",
		{
			type: "category",
			label: "API",
			items: ["api/roblox-api", "api/constructors", "api/functions", "api/utility-types"],
		},
		{
			type: "category",
			label: "Guides",
			items: [
				"guides/syncing-with-rojo",
				"guides/callbacks-vs-methods",
				"guides/datatype-math",
				"guides/indexing-children",
				"guides/lua-tuple",
				"guides/roact-jsx",
				"guides/using-existing-luau",
				"guides/luau-packages",
				"guides/typescript-packages",
				"guides/typescript-transformers",
			],
		},
	],
};

export default sidebars;
