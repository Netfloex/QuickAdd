// eslint-disable-next-line css-modules/no-unused-class
import styles from "./MovieItem.module.scss"

import { Card, CardBody } from "@heroui/card"
import { Skeleton } from "@heroui/skeleton"

import type { FC } from "react"

export const LoadingSkeleton: FC = () => {
	return (
		<>
			<Card className={styles.movieItem}>
				<CardBody className={styles.body}>
					<Skeleton
						className={styles.posterWrapper + " rounded-large"}
					/>
					<div className={styles.information + " w-full mx-3"}>
						<Skeleton className="w-full h-10 mb-3 rounded-lg"></Skeleton>
						<Skeleton className="w-full h-32 rounded-lg" />
					</div>
				</CardBody>
			</Card>
		</>
	)
}
