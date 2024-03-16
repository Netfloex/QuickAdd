import { Spacer } from "@nextui-org/spacer"
import { Fragment } from "react"

import { ErrorCard, ErrorCardError } from "@components/ErrorCard"

import { LoadingSkeleton } from "./LoadingSkeleton"
import { MovieItem } from "./MovieItem"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

export const Results: FC<{
	movies: MovieSearchResult[]
	error: ErrorCardError | null
	isLoading: boolean
	loadingSkeletonCount: number
}> = ({ movies, error, isLoading, loadingSkeletonCount }) => {
	// Error
	if (error) return <ErrorCard error={error} />

	// Loading
	if (isLoading)
		return (
			<>
				{Array.from({ length: loadingSkeletonCount }).map((_, i) => (
					<Fragment key={i}>
						<LoadingSkeleton />
						{i != loadingSkeletonCount && <Spacer y={3} />}
					</Fragment>
				))}
			</>
		)

	// No data
	if (!movies.length) return <>No Items</>

	return (
		<>
			{movies?.map((m, i) => (
				<Fragment key={m.tmdbId}>
					<MovieItem movie={m} />
					{i != movies.length && <Spacer y={3} />}
				</Fragment>
			))}
		</>
	)
}
