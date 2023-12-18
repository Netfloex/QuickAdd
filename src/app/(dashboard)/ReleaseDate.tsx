import { calculateMovieStatus } from "src/utils/calculateMovieStatus"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

import { MovieStatusType } from "@typings/MovieStatusType"

export const ReleaseDate: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	const status = calculateMovieStatus(movie)

	if (status === MovieStatusType.Released) {
		return null
	}

	const order = [
		{
			date: movie.physicalRelease,
			text: "Physical release",
		},
		{
			date: movie.digitalRelease,
			text: "Digital release",
		},
		{
			date: movie.inCinema,
			text: "In cinema's",
		},
	]

	const best = order.find((o) => o.date !== null)

	if (best === undefined) {
		return null
	}

	return (
		<>
			{best?.text}{" "}
			{new Date(best?.date ?? 0).toLocaleDateString(undefined, {})}
		</>
	)
}
