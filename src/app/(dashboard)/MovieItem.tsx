import styles from "./MovieItem.module.scss"

import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Image } from "@nextui-org/image"
import NextImage from "next/image"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

export const MovieItem: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	return (
		<>
			<Card key={movie.id} className={styles.movieItem}>
				<CardBody className={styles.body}>
					{movie.poster_path && (
						<Image
							alt=""
							as={NextImage}
							width="240"
							height="360"
							unoptimized
							src={
								"https://www.themoviedb.org/t/p/w300_and_h450_bestv2/" +
								movie.poster_path
							}
							classNames={{
								wrapper: styles.posterWrapper,
								img: styles.poster,
							}}
						/>
					)}
					<div>
						<CardHeader>
							<h1 className={styles.title}>{movie.title}</h1>
						</CardHeader>
						<p>{movie.overview}</p>
					</div>
				</CardBody>
			</Card>
		</>
	)
}
