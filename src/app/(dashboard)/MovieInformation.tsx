import { Chip } from "@nextui-org/chip"
import { Divider } from "@nextui-org/divider"
import { Image } from "@nextui-org/image"
import NextImage from "next/image"
import { Fragment, useMemo } from "react"
import { Credit } from "src/app/(dashboard)/Credit"
import { MovieLinks } from "src/app/(dashboard)/MovieLinks"
import { MovieRatings } from "src/app/(dashboard)/MovieRatings"

import { humanizeDuration } from "@utils/humanizeDuration"

import { Genres } from "./Genres"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

export const MovieInformation: FC<{ movie: MovieSearchResult }> = ({
	movie,
}) => {
	const movieInformationChips = useMemo(() => {
		const chips = [
			movie.year,
			humanizeDuration(movie.runtime * 60),
			movie.studio,
		]

		const chipsArray = chips.filter(Boolean).map((chip) => (
			<Chip key={chip} variant="bordered">
				{chip}
			</Chip>
		))

		movie.certifications.forEach((certification) => {
			chipsArray.push(
				<Chip
					variant="bordered"
					key={certification.country}
					startContent={
						<NextImage
							alt={certification.country}
							width="16"
							height="16"
							className="w-full h-full rounded-full"
							unoptimized
							src={`https://flagsapi.com/${certification.country}/flat/16.png`}
						/>
					}
				>
					{certification.certification}
				</Chip>,
			)
		})

		return chipsArray.map((chip, index) => (
			<Fragment key={index}>
				{chip}
				{index < chipsArray.length - 1 && (
					<div className="h-5">
						<Divider orientation="vertical" />
					</div>
				)}
			</Fragment>
		))
	}, [movie])

	return (
		<div className="flex gap-4 flex-col">
			<div className="flex gap-4 flex-col sm:flex-row">
				<div className="sm:max-w-[240px] sm:max-h-[360px]">
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
						<div className="w-[240px] h-[360px] bg-neutral-950 rounded-large" />
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

					{/* Year, Duration, Studio and Certifications */}
					<div className="overflow-x-scroll">
						<div className="flex items-center space-x-4 text-small">
							{movieInformationChips}
						</div>
					</div>

					<Genres movie={movie} />

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
