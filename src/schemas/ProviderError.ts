import { z } from "zod"

export const ProviderError = z.object({
	provider: z.string(),
	error: z.string(),
})

export type ProviderError = z.output<typeof ProviderError>
