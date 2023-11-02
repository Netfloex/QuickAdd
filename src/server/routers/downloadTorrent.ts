import { z } from "zod"

import { downloadTorrent } from "@server/api/downloadTorrent"
import { procedure } from "@server/trpc"

export const downloadTorrentsRoute = procedure
	.input(z.string().url())
	.mutation(async ({ input }) => {
		const success = await downloadTorrent(input)

		return success
	})
