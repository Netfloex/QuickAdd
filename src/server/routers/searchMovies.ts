import { inspect } from "util"

import { z } from "zod"

import { http } from "@server/http"
import { procedure } from "@server/trpc"

import { MovieSearchResult } from "@schemas/MovieSearchResult"
import { wrappedResults } from "@schemas/wrappedResults"

const searchMovies = async (query: string): Promise<MovieSearchResult[]> => {
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

export const searchMoviesRoute = procedure
	.input(z.object({ query: z.string().nonempty() }))
	.query(async ({ input: { query } }) => {
		return await searchMovies(query)
	})
