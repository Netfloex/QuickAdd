export const humanizeDuration = (seconds: number): string => {
	const minutes = seconds / 60
	const days = Math.floor(minutes / 60 / 24)
	const remainingHours = Math.floor((minutes / 60) % 24)
	const remainingMinutes = Math.floor(minutes % 60)

	return ` ${days}d ${remainingHours}h ${remainingMinutes}m`
		.replace(/\s0[dhm]/g, "")
		.trim()
}
