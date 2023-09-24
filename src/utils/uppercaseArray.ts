type UppercaseArray<T extends readonly string[]> = {
	[K in keyof T]: Uppercase<T[K]>
}

export const uppercaseArray = <T extends readonly string[]>(
	strings: T,
): UppercaseArray<T> =>
	strings.map((s) => s.toLocaleUpperCase()) as UppercaseArray<T>
