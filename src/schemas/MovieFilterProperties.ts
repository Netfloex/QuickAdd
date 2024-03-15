import { z } from "zod"

export const MovieFilterProperties = z.record(
	z.object({
		display: z.string().max(10).regex(/^\w+$/),
		values: z.array(z.string().regex(/^\w+$/)),
	}),
)

export type MovieFilterProperties = z.output<typeof MovieFilterProperties>
