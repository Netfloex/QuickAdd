import { z } from "zod"

import { trackMovie } from "@server/api/trackMovie"
import { procedure } from "@server/trpc"

export const trackMovieRoute = procedure
	.input(
		z.object({
			url: z.string(),
			tmdb: z.number(),
		}),
	)
	.mutation(async ({ input }) => {
		const success = await trackMovie(input.url, input.tmdb)

		return success
	})
