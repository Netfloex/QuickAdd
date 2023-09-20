import { Card, CardBody } from "@nextui-org/card"
import { CircularProgress } from "@nextui-org/progress"
import { MovieItem } from "src/app/(dashboard)/MovieItem"
import { trpc } from "src/utils/trpc"

import type { FC } from "react"

export const Results: FC<{ query: string }> = ({ query }) => {
	const { data, error, isInitialLoading, isLoading } =
		trpc.searchMovies.useQuery({ query }, { enabled: query.length !== 0 })

	// Error
	if (error)
		return (
			<Card className="bg-red-600">
				<CardBody>{error.message}</CardBody>
			</Card>
		)

	// Loading
	if (isInitialLoading)
		return (
			<div>
				<CircularProgress />
			</div>
		)

	// Not started
	if (isLoading) return null

	// No data
	if (!data.length) return <>No Items</>

	return <>{data?.map((m) => <MovieItem key={m.id} movie={m} />)}</>
}
