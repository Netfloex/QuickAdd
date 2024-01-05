import { Card } from "@nextui-org/card"
import { Metadata } from "next"
import { RefreshButton } from "src/app/downloads/RefreshButton"

import { DownloadingTable } from "./DownloadingTable"

import type { FC } from "react"

const Downloads: FC = () => {
	return (
		<div className="container mt-4">
			<Card className="p-3">
				<div className="mb-4">
					<h1 className="text-lg font-semibold mb-4 flex">
						Downloads
					</h1>
					<RefreshButton />
				</div>
				<DownloadingTable />
			</Card>
		</div>
	)
}

export const metadata: Metadata = {
	title: "Downloads",
	description: "Manage your downloads",
}

export default Downloads
