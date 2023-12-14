import { FaImdb } from "react-icons/fa"
import { SiRottentomatoes } from "react-icons/si"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

export const MovieRatings: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	return (
		<div className="flex gap-4">
			{movie.movieRatings.imdb !== null && (
				<div className="flex gap-1 items-center">
					<FaImdb color="#f1c117" />
					{movie.movieRatings.imdb.value.toFixed(1)}
				</div>
			)}
			{movie.movieRatings.rottenTomatoes !== null && (
				<div className="flex gap-1 items-center">
					<SiRottentomatoes color="#f93109" />
					{movie.movieRatings.rottenTomatoes.value}%
				</div>
			)}
			{movie.movieRatings.metacritic !== null && (
				<div className="flex gap-1 items-center">
					M{movie.movieRatings.metacritic.value}%
				</div>
			)}
			{movie.movieRatings.tmdb !== null && (
				<div className="flex gap-1 items-center">
					TMDB {movie.movieRatings.tmdb.value.toFixed(1)}
				</div>
			)}
		</div>
	)
}
