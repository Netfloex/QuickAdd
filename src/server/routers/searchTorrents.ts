import { z } from "zod"

import { getImdbId } from "@server/api/getImdbId"
import { getTorrents } from "@server/api/getTorrents"
import { procedure } from "@server/trpc"

export const searchTorrentsRoute = procedure
	.input(z.object({ id: z.number() }))
	.query(async ({ input: { id } }) => {
		const info = await getImdbId(id)

		return await getTorrents(info.imdb_id, info.original_title)
	})
