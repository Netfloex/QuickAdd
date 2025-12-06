import Image from "next/image"
import { Fragment, useMemo } from "react"
import { FaImdb } from "react-icons/fa"
import { SiRottentomatoes } from "react-icons/si"

import { Divider } from "@heroui/divider"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

export const MovieRatings: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	const data = useMemo(
		() =>
			[
				{
					icon: <FaImdb color="#f1c117" />,
					data: movie.movieRatings.imdb,
					percentage: false,
					name: "IMDB",
				},
				{
					icon: <SiRottentomatoes color="#f93109" />,
					data: movie.movieRatings.rottenTomatoes,
					percentage: true,
					name: "Rotten Tomatoes",
				},
				{
					icon: (
						<Image
							alt="M"
							height="16"
							src="https://www.metacritic.com/favicon.ico"
							unoptimized
							width="16"
						/>
					),
					data: movie.movieRatings.metacritic,
					percentage: true,
					name: "Metacritic",
				},
				{
					icon: (
						<Image
							alt="M"
							height="16"
							src="https://www.themoviedb.org/favicon.ico"
							unoptimized
							width="16"
						/>
					),
					data: movie.movieRatings.tmdb,
					percentage: false,
					name: "TMDB",
				},
			].filter(
				(d) =>
					d.data !== null &&
					!(d.name == "TMDB" && d.data.value === 0),
			),
		[movie.movieRatings],
	)

	return (
		<div className="flex space-x-4 h-6 overflow-x-scroll">
			{data.map((d, i) => (
					<Fragment key={d.name}>
						<div className="flex gap-1 items-center" title={d.name}>
							{d.icon}{" "}
							{d.percentage
								? `${d.data!.value}%`
								: d.data!.value.toFixed(1)}
						</div>
						{i != data.length - 1 && (
							<Divider orientation="vertical" />
						)}
					</Fragment>
				))}
		</div>
	)
}
