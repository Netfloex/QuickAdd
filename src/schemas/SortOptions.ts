import { z } from "zod"

export const SortOptions = z.object({
	sort: z.enum(["SEEDERS", "LEECHERS", "SIZE", "ADDED"]),
	order: z.enum(["ASCENDING", "DESCENDING"]),
})

export type SortOptions = z.output<typeof SortOptions>
