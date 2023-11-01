import { Card } from "@nextui-org/card"
import { Suspense } from "react"
import { QueryWrapper } from "src/app/(dashboard)/QueryWrapper"
import { SearchField } from "src/app/(dashboard)/SearchField"

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
