import { activeTorrentCount } from "@server/api/activeTorrentCount"
import { procedure } from "@server/trpc"

export const activeTorrentCountRoute = procedure.query(
	async () => await activeTorrentCount(),
)
