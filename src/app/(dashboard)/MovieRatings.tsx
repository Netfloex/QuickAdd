import { Divider } from "@nextui-org/divider"
import Image from "next/image"
import { Fragment, useMemo } from "react"
import { FaImdb } from "react-icons/fa"
import { SiRottentomatoes } from "react-icons/si"

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
							src="https://www.metacritic.com/favicon.ico"
							width="16"
							height="16"
							unoptimized
							alt="M"
						/>
					),
					data: movie.movieRatings.metacritic,
					percentage: true,
					name: "Metacritic",
				},
				{
					icon: (
						<Image
							src="https://www.themoviedb.org/favicon.ico"
							width="16"
							height="16"
							unoptimized
							alt="M"
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
		<div className="flex space-x-4 h-6">
			{data.map((d, i) => {
				return (
					<Fragment key={d.name}>
						<div title={d.name} className="flex gap-1 items-center">
							{d.icon}{" "}
							{d.percentage
								? `${d.data!.value}%`
								: d.data!.value.toFixed(1)}
						</div>
						{i != data.length - 1 && (
							<Divider orientation="vertical" />
						)}
					</Fragment>
				)
			})}
		</div>
	)
}
