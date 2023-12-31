import { activeTorrentCountRoute } from "@server/routers/activeTorrentCount"
import { activeTorrentsRoute } from "@server/routers/activeTorrents"
import { downloadTorrentsRoute } from "@server/routers/downloadTorrent"
import { searchMoviesRoute } from "@server/routers/searchMovies"
import { searchTorrentsRoute } from "@server/routers/searchTorrents"
import { router } from "@server/trpc"

export const appRouter = router({
	searchMovies: searchMoviesRoute,
	searchTorrents: searchTorrentsRoute,
	downloadTorrent: downloadTorrentsRoute,
	activeTorrents: activeTorrentsRoute,
	activeTorrentsCount: activeTorrentCountRoute,
})

export type AppRouter = typeof appRouter
