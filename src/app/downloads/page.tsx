import { Card } from "@nextui-org/card"
import { Metadata } from "next"
import { DownloadingTable } from "src/app/downloads/DownloadingTable"

import type { FC } from "react"

const Downloads: FC = () => {
	return (
		<div className="container mt-4">
			<Card className="p-3">
				<h1 className="text-lg font-semibold mb-4">Downloads</h1>
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
