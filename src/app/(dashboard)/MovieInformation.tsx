import { Divider } from "@nextui-org/divider"
import { Image } from "@nextui-org/image"
import NextImage from "next/image"
import { Credit } from "src/app/(dashboard)/Credit"
import { MovieLinks } from "src/app/(dashboard)/MovieLinks"
import { MovieRatings } from "src/app/(dashboard)/MovieRatings"

import { humanizeDuration } from "@utils/humanizeDuration"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

export const MovieInformation: FC<{ movie: MovieSearchResult }> = ({
	movie,
}) => {
	return (
		<div className="flex gap-4 flex-col">
			<div className="flex gap-4">
				<div className="max-w-[240px] max-h-[360px]">
					{movie.posterUrl !== null ? (
						<Image
							alt=""
							as={NextImage}
							width="240"
							height="360"
							unoptimized
							className="w-full h-full"
							src={movie.posterUrl}
						/>
					) : (
						<div className="w-full h-full bg-neutral-950 rounded-large" />
					)}
				</div>
				<div className="flex flex-col gap-4 overflow-hidden">
					<div className="relative">
						{/* Title */}
						<h1 className="font-bold text-5xl">{movie.title}</h1>

						{/* Original Title */}
						{movie.originalTitle !== movie.title && (
							<p className="text-default-500">
								{movie.originalTitle}
							</p>
						)}

						<div className="absolute top-0 right-0">
							<MovieLinks movie={movie} />
						</div>
					</div>

					{/* Year and Duration */}
					<div className="flex h-5 items-center space-x-4 text-small">
						<p>{movie.year}</p>
						<Divider orientation="vertical" />
						<p>{humanizeDuration(movie.runtime * 60)}</p>
						<Divider orientation="vertical" />
						<p>{movie.studio}</p>
					</div>

					{/* Ratings */}
					<MovieRatings movie={movie} />

					{/* Overview */}
					<span>{movie.overview}</span>
				</div>
			</div>
			{/* Cast */}
			<Credit credit={movie.credits.cast} title="Cast" />

			{/* Crew */}
			<Credit credit={movie.credits.crew} title="Crew" />
		</div>
	)
}
