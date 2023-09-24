export const fixQualityName = (quality: string): string => {
	if (quality.match(/^P/)) {
		return quality.replace(/^P/, "") + "p"
	}

	return quality
}
