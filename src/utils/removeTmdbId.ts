const tmdbIdRegex = /\(\d{1,8}\)$/g

export const removeTmdbId = (name: string): string =>
	name.replace(tmdbIdRegex, "").trim()
