import { trendingMovies } from "@server/api/trendingMovies"
import { procedure } from "@server/trpc"

export const trendingMoviesRoute = procedure.query(
	async () => await trendingMovies(),
)
