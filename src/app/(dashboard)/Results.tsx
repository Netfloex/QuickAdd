import { Card, CardBody } from "@nextui-org/card"
import { Spacer } from "@nextui-org/react"
import { Fragment } from "react"
import { LoadingSkeleton } from "src/app/(dashboard)/LoadingSkeleton"
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
			<>
				<LoadingSkeleton />
				<Spacer y={3} />
				<LoadingSkeleton />
			</>
		)

	// Not started
	if (isLoading) return null

	// No data
	if (!data.length) return <>No Items</>

	return (
		<>
			{data?.map((m, i) => (
				<Fragment key={m.id}>
					<MovieItem movie={m} />
					{i != data.length && <Spacer y={3} />}
				</Fragment>
			))}
		</>
	)
}
