import { MovieSearchResult } from "@schemas/MovieSearchResult"

import { MovieStatusType } from "@typings/MovieStatusType"

export const calculateMovieStatus = (
	movie: Omit<MovieSearchResult, "status">,
): MovieStatusType => {
	let status = MovieStatusType.Announced
	const now = Date.now()

	if (movie.inCinema !== null && now > movie.inCinema) {
		status = MovieStatusType.InCinemas

		if (
			!movie.physicalRelease !== null &&
			!movie.digitalRelease !== null &&
			now > movie.inCinema + 90 * 24 * 60 * 60 * 1000
		) {
			status = MovieStatusType.Released
		}
	}

	if (movie.physicalRelease !== null && now >= movie.physicalRelease) {
		status = MovieStatusType.Released
	}

	if (movie.digitalRelease !== null && now >= movie.digitalRelease) {
		status = MovieStatusType.Released
	}

	return status
}
