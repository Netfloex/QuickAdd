import { inspect } from "util"

import { http } from "@server/http"

import { MovieData } from "@schemas/MovieData"

export const getImdbId = async (id: number): Promise<MovieData> => {
	const data = await http.get(`movie/${id}`).json()

	const result = MovieData.safeParse(data)

	if (result.success) {
		return result.data
	}

	console.log(data, inspect(result.error, true, 10, true))

	throw result.error
}
