import { z } from "zod"

export const GraphqlError = z.object({
	message: z.string(),
	extensions: z
		.object({
			type: z.string(),
		})
		.optional(),
})

export type GraphqlError = z.output<typeof GraphqlError>
