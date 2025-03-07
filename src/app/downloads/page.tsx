import { Metadata } from "next"
import { CardContent } from "src/app/downloads/CardContent"

import { Card } from "@heroui/card"

import type { FC } from "react"

const Downloads: FC = () => {
	return (
		<div className="container mt-4">
			<Card className="p-3">
				<h1 className="text-lg font-semibold mb-4 flex">Downloads</h1>
				<CardContent />
			</Card>
		</div>
	)
}

export const metadata: Metadata = {
	title: "Downloads",
	description: "Manage your downloads",
}

export default Downloads
