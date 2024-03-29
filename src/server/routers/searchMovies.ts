import { z } from "zod"

import { searchMovies } from "@server/api/searchMovies"
import { procedure } from "@server/trpc"

export const searchMoviesRoute = procedure
	.input(
		z.object({
			query: z.string().min(1),
		}),
	)
	.query(async ({ input: { query } }) => {
		return await searchMovies(query)
	})
