import { z } from "zod"

export const MovieData = z.object({
	imdb_id: z.string(),
	original_title: z.string(),
})

export type MovieData = z.output<typeof MovieData>
