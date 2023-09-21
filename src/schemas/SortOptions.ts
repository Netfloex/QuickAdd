import { z } from "zod"

export const SortOptions = z.object({
	sort: z.union([
		z.literal("SEEDERS"),
		z.literal("LEECHERS"),
		z.literal("SIZE"),
		z.literal("ADDED"),
	]),
	order: z.union([z.literal("ASCENDING"), z.literal("DESCENDING")]),
})

export type SortOptions = z.output<typeof SortOptions>
