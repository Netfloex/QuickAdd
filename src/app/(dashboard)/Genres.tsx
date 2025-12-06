import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

export const Genres: FC<{ movie: MovieSearchResult }> = ({ movie }) => (
		<div className="flex gap-1">
			{movie.genres.map((genre, i) => (
				<div className="text-default-500" key={genre}>
					{genre}
					{i === movie.genres.length - 1 ? "" : ","}
				</div>
			))}
		</div>
	)
