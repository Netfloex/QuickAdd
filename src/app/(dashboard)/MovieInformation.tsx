import { Divider } from "@nextui-org/divider"
import { Image } from "@nextui-org/image"
import NextImage from "next/image"
import { MovieLinks } from "src/app/(dashboard)/MovieLinks"
import { MovieRatings } from "src/app/(dashboard)/MovieRatings"

import { humanizeDuration } from "@utils/humanizeDuration"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

export const MovieInformation: FC<{ movie: MovieSearchResult }> = ({
	movie,
}) => {
	return (
		<div className="flex gap-4">
			<div className="min-w-[240px] min-h-[360px]">
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
					<div className="bg-neutral-950 rounded-large" />
				)}
			</div>
			<div className="flex flex-col gap-4">
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
				</div>

				{/* Ratings */}
				<MovieRatings movie={movie} />

				{/* Overview */}
				<span>{movie.overview}</span>
			</div>
		</div>
	)
}
