import styles from "./MovieItem.module.scss"

import { Button } from "@nextui-org/button"
import { Card, CardBody } from "@nextui-org/card"
import { Image } from "@nextui-org/image"
import NextImage from "next/image"
import { useCallback } from "react"
import { trpc } from "src/utils/trpc"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

export const MovieItem: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	const { data, isInitialLoading, refetch } = trpc.searchTorrents.useQuery(
		{ id: movie.id },
		{ enabled: false },
	)

	const fetch = useCallback(() => refetch(), [refetch])

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
					<div className={styles.information + " mx-3"}>
						<h1 className={styles.title}>
							{movie.title} ({movie.year})
						</h1>
						<p>{movie.overview}</p>
						<Button isLoading={isInitialLoading} onClick={fetch}>
							Search
						</Button>
						{data && <pre>{JSON.stringify(data, null, "\t")}</pre>}
					</div>
				</CardBody>
			</Card>
		</>
	)
}
