import { downloadTorrentsRoute } from "@server/routers/downloadTorrent"
import { searchMoviesRoute } from "@server/routers/searchMovies"
import { searchTorrentsRoute } from "@server/routers/searchTorrents"
import { router } from "@server/trpc"

export const appRouter = router({
	searchMovies: searchMoviesRoute,
	searchTorrents: searchTorrentsRoute,
	downloadTorrent: downloadTorrentsRoute,
})

export type AppRouter = typeof appRouter
