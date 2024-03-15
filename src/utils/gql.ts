export const gql = (
	strings: TemplateStringsArray,
	...values: unknown[]
): string => {
	const string = strings.reduce((acc, curr, index) => {
		let value = curr

		if (index < values.length) {
			value += values[index]
		}

		return acc + value
	}, "")

	return string
}
