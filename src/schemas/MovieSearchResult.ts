import { z } from "zod"

export const MovieSearchResult = z
	.object({
		adult: z.boolean(),
		backdrop_path: z.string().nullable(),
		genre_ids: z.number().array(),
		id: z.number(),
		original_language: z.string(),
		original_title: z.string(),
		overview: z.string(),
		popularity: z.number(),
		poster_path: z.string().nullable(),
		release_date: z.string(),
		title: z.string(),
		video: z.boolean(),
		vote_average: z.number(),
		vote_count: z.number(),
	})
	.transform((data) => ({
		...data,
		year: data.release_date.split("-")[0],
	}))

export type MovieSearchResult = z.output<typeof MovieSearchResult>
