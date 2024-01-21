import { Spacer } from "@nextui-org/spacer"
import { Fragment } from "react"

import { trpc } from "@utils/trpc"

import { ErrorCard } from "@components/ErrorCard"

import { LoadingSkeleton } from "./LoadingSkeleton"
import { MovieItem } from "./MovieItem"

import type { FC } from "react"

export const Results: FC<{ query: string }> = ({ query }) => {
	const { data, error, isLoading, isPending } = trpc.searchMovies.useQuery(
		{ query },
		{ enabled: query.length !== 0 },
	)

	// Error
	if (error) return <ErrorCard error={error} />

	// Loading
	if (isLoading)
		return (
			<>
				<LoadingSkeleton />
				<Spacer y={3} />
				<LoadingSkeleton />
			</>
		)

	// Not started
	if (isPending) return null

	// No data
	if (!data.length) return <>No Items</>

	return (
		<>
			{data?.map((m, i) => (
				<Fragment key={m.tmdbId}>
					<MovieItem movie={m} />
					{i != data.length && <Spacer y={3} />}
				</Fragment>
			))}
		</>
	)
}
