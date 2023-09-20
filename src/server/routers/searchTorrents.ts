import { inspect } from "util"

import { z } from "zod"

import { http } from "@server/http"
import { procedure } from "@server/trpc"

import { MovieData } from "@schemas/MovieData"

const searchTorrents = async (id: number): Promise<MovieData> => {
	const data = await http.get(`movie/${id}`).json()

	const result = MovieData.safeParse(data)

	if (result.success) {
		return result.data
	}

	console.log(inspect(result.error, true, 10, true))

	throw result.error
}

export const searchTorrentsRoute = procedure
	.input(z.object({ id: z.number() }))
	.query(async ({ input: { id } }) => {
		return await searchTorrents(id)
	})
