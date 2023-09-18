import { searchMoviesRoute } from "@server/routers/searchMovies"
import { router } from "@server/trpc"

export const appRouter = router({
	searchMovies: searchMoviesRoute,
})

export type AppRouter = typeof appRouter
