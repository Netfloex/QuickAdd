import { FlatCompat } from "@eslint/eslintrc"
import stylistic from "@stylistic/eslint-plugin"

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
})

const eslintConfig = [
	...compat.config({
		extends: [
			"next/core-web-vitals",
			"next/typescript",
			"plugin:prettier/recommended",
			"plugin:css-modules/recommended",
			"plugin:@tanstack/eslint-plugin-query/recommended",
		],
		plugins: ["css-modules"],
		rules: {
			"@typescript-eslint/no-non-null-assertion": 0,
			"@typescript-eslint/no-unused-vars": "error",
			"@typescript-eslint/explicit-function-return-type": "error",
		},
		ignorePatterns: [".next"],
	}),
	{
		plugins: { "@stylistic": stylistic },
		rules: {
			"padding-line-between-statements": [
				"error",

				// Between blocks

				{ blankLine: "always", prev: "*", next: "block" },
				{ blankLine: "always", prev: "block", next: "*" },
				{ blankLine: "always", prev: "*", next: "block-like" },
				{ blankLine: "always", prev: "block-like", next: "*" },

				// Before and after every sequence of variable declarations
				{
					blankLine: "always",
					prev: "*",
					next: ["const", "let", "var"],
				},
				{
					blankLine: "always",
					prev: ["const", "let", "var"],
					next: "*",
				},
				{
					blankLine: "any",
					prev: ["const", "let", "var"],
					next: ["const", "let", "var"],
				},

				// Before and after class declaration, if, while, switch, try
				{
					blankLine: "always",
					prev: "*",
					next: ["class", "if", "while", "switch", "try"],
				},
				{
					blankLine: "always",
					prev: ["class", "if", "while", "switch", "try"],
					next: "*",
				},

				// Before return statements
				{ blankLine: "always", prev: "*", next: "return" },
			],
		},
	},
]

export default eslintConfig
