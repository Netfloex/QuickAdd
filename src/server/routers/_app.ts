import { activeTorrentCountRoute } from "@server/routers/activeTorrentCount"
import { activeTorrentsRoute } from "@server/routers/activeTorrents"
import { searchMoviesRoute } from "@server/routers/searchMovies"
import { searchTorrentsRoute } from "@server/routers/searchTorrents"
import { trackMovieRoute } from "@server/routers/trackMovie"
import { router } from "@server/trpc"

export const appRouter = router({
	searchMovies: searchMoviesRoute,
	searchTorrents: searchTorrentsRoute,
	trackMovie: trackMovieRoute,
	activeTorrents: activeTorrentsRoute,
	activeTorrentsCount: activeTorrentCountRoute,
})

export type AppRouter = typeof appRouter
