import { inspect } from "util"

import { radarrHttp } from "@server/http"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

export const searchMovies = async (
	query: string,
): Promise<MovieSearchResult[]> => {
	const data = await radarrHttp
		.get("search", { searchParams: { q: query } })
		.json()

	const result = MovieSearchResult.array().safeParse(data)

	if (result.success) {
		return result.data
	}

	console.log(inspect(result.error, true, 10, true))

	throw result.error
}
