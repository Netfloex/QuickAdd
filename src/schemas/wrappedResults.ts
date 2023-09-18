import { z, ZodTypeAny } from "zod"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const wrappedResults = <T extends ZodTypeAny>(type: T) =>
	z.object({
		// page: z.number()
		results: z.array(type),
	})
