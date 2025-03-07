import { dirname } from "path"
import { fileURLToPath } from "url"

import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.config({
		plugins: ["css-modules"],
		rules: {
			"@typescript-eslint/no-non-null-assertion": 0,
			"@typescript-eslint/no-unused-vars": "error",
			"@typescript-eslint/explicit-function-return-type": "error",
			"padding-line-between-statements": [
				"error",
				{ blankLine: "always", prev: "*", next: "block" },
				{ blankLine: "always", prev: "block", next: "*" },
				{ blankLine: "always", prev: "*", next: "block-like" },
				{ blankLine: "always", prev: "block-like", next: "*" },
			],
		},
		ignorePatterns: ["/.next"],
	}),
	...compat.extends(
		"next/core-web-vitals",
		"next/typescript",
		"plugin:prettier/recommended",
		"plugin:css-modules/recommended",
		"plugin:@tanstack/eslint-plugin-query/recommended",
	),
]

export default eslintConfig
