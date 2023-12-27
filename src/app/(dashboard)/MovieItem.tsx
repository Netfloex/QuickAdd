import styles from "./MovieItem.module.scss"

import { Card, CardBody } from "@nextui-org/card"
import { Image } from "@nextui-org/image"
import { useDisclosure } from "@nextui-org/use-disclosure"
import NextImage from "next/image"
import { useCallback } from "react"

import { humanizeDuration } from "@utils/humanizeDuration"

import { Genres } from "./Genres"
import { MovieRatings } from "./MovieRatings"
import { ReleaseDate } from "./ReleaseDate"
import { TorrentModal } from "./TorrentModal"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

export const MovieItem: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const openModal = useCallback(() => {
		onOpen()
	}, [onOpen])

	const posterUrl = movie.images.find((i) => i.coverType === "Poster")?.url

	return (
		<>
			<TorrentModal isOpen={isOpen} onClose={onClose} movie={movie} />
			<Card className={styles.movieItem} isPressable onPress={openModal}>
				<CardBody className={styles.body}>
					{posterUrl !== undefined ? (
						<Image
							alt=""
							as={NextImage}
							width="240"
							height="360"
							unoptimized
							src={posterUrl}
							classNames={{
								wrapper: styles.posterWrapper,
								img: styles.poster,
							}}
						/>
					) : (
						<div
							className={
								styles.posterWrapper +
								" bg-neutral-950 rounded-large"
							}
						/>
					)}
					<div className={styles.information + " mx-3"}>
						<h1 className={styles.title}>
							{movie.title} ({movie.year})
						</h1>
						{movie.title !== movie.originalTitle && (
							<p className="text-default-500 -mt-1 mb-2">
								{movie.originalTitle}
							</p>
						)}
						<ReleaseDate movie={movie} />
						<Genres movie={movie} />
						<p className="text-sm text-default-500">
							{humanizeDuration(movie.runtime * 60)}
						</p>
						<MovieRatings movie={movie} />
						<p>{movie.overview}</p>
					</div>
				</CardBody>
			</Card>
		</>
	)
}
