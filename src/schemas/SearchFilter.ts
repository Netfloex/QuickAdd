import { z } from "zod"

export const SearchFilter = z.object({
	display: z.string(),
	name: z.string(),
	values: z.array(
		z.object({
			display: z.string(),
			name: z.string(),
		}),
	),
})

export type SearchFilter = z.output<typeof SearchFilter>
