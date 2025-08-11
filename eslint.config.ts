import eslint from '@eslint/js';
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier/flat";

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	prettierConfig,
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parserOptions: {
				jsx: true,
				useJSXTextNode: true,
				ecmaVersion: 2018,
				sourceType: "module",
				project: "tsconfig.json",
			},
		},
		plugins: {
			prettier,
		},
		rules: {
			"prettier/prettier": "warn",
			"@typescript-eslint/array-type": [
				"warn",
				{
					default: "generic",
					readonly: "generic",
				},
			],
			"@typescript-eslint/no-floating-promises": ["error", { ignoreVoid: true }],
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/interface-name-prefix": "off",
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-empty-interface": "off",
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-use-before-define": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-require-imports": "error",
			"@typescript-eslint/no-unused-expressions": "warn",
			"prefer-const": "warn",
			"no-undef-init": "error",
			"no-console": "error",
		},
	},
	{
		ignores: ["*.js", "docs/components/**"],
	},
);
