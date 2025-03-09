export const formatBytes = (bytes: number, decimals: number = 2): string => {
	if (bytes === 0) return "0 B"

	const k: number = 1024
	const sizes: string[] = [
		"B",
		"KiB",
		"MiB",
		"GiB",
		"TiB",
		"PiB",
		"EiB",
		"ZiB",
		"YiB",
	]

	const i: number = Math.floor(Math.log(bytes) / Math.log(k))

	const digit = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))

	return `${digit} ${sizes[i]}`
}
