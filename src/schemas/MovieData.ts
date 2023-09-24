import { z } from "zod"

export const MovieData = z
	.object({
		imdb_id: z.string().nullable(),
		original_title: z.string(),
		release_date: z.string(),
	})
	.transform((data) => {
		const year = data.release_date.substring(0, 4)
		return {
			...data,
			year,
			title: `${data.original_title} (${year})`,
		}
	})

export type MovieData = z.output<typeof MovieData>
