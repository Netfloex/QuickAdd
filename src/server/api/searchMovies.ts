import { inspect } from "util"

import { http } from "@server/http"

import { MovieSearchResult } from "@schemas/MovieSearchResult"
import { wrappedResults } from "@schemas/wrappedResults"

export const searchMovies = async (
	query: string,
): Promise<MovieSearchResult[]> => {
	const data = await http
		.get("search/movie", { searchParams: { query } })
		.json()

	const result = wrappedResults(MovieSearchResult).safeParse(data)

	if (result.success) {
		return result.data.results
	}

	console.log(inspect(result.error, true, 10, true))

	throw result.error
}
