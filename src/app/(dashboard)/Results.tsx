// import styles from "./Results.module.scss"

import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Image } from "@nextui-org/image"
import { CircularProgress } from "@nextui-org/progress"
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

	return (
		<>
			{data?.map((m) => (
				<Card key={m.id}>
					<CardBody>
						{m.poster_path && (
							<Image
								alt=""
								src={
									"https://www.themoviedb.org/t/p/w300_and_h450_bestv2/" +
									m.poster_path
								}
							/>
						)}
						<div>
							<CardHeader>
								<h1>{m.title}</h1>
							</CardHeader>
							<p>{m.overview}</p>
						</div>
					</CardBody>
				</Card>
			))}
		</>
	)
}
