import { Suspense } from "react"

import { Card } from "@heroui/card"

import { QueryWrapper } from "./QueryWrapper"
import { SearchField } from "./SearchField"

import type { FC } from "react"

export const Dashboard: FC = () => {
	return (
		<div className="container">
			<Card className="p-3">
				<Suspense
					fallback={
						<>
							<SearchField defaultQuery="" />
						</>
					}
				>
					<QueryWrapper />
				</Suspense>
			</Card>
		</div>
	)
}
