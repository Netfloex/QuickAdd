import { checkConfig } from "@server/checkConfig"

export const register = (): void => {
	const parsed = checkConfig()

	if (!parsed.success) {
		console.error("Invalid config:")

		console.error(
			parsed.error.issues.map((issue) => issue.message).join("\n"),
		)
		process.exit(1)
	}
}
