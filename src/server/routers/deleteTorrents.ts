import { z } from "zod"

import { deleteTorrents } from "@server/api/deleteTorrents"
import { procedure } from "@server/trpc"

export const deleteTorrentsRoute = procedure
	.input(
		z.object({
			hashes: z.array(z.string()),
			deleteFiles: z.boolean(),
		}),
	)
	.mutation(async ({ input }) => {
		const success = await deleteTorrents(input.hashes, input.deleteFiles)

		return success
	})
