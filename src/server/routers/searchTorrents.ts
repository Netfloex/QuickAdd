import { z } from "zod"

import { getImdbId } from "@server/api/getImdbId"
import { procedure } from "@server/trpc"

export const searchTorrentsRoute = procedure
	.input(z.object({ id: z.number() }))
	.query(async ({ input: { id } }) => {
		return await getImdbId(id)
	})
