import { Card, CardBody, CardHeader } from "@heroui/card"

import type { FC } from "react"

export interface ErrorCardError {
	name?: string
	message: string
}

export const ErrorCard: FC<{ error: ErrorCardError }> = ({ error }) => {
	console.log(error.message, Object.fromEntries(Object.entries(error)))

	return (
		<Card className="bg-red-600">
			<CardHeader>
				<h1 className="text-lg">An error occurred:</h1>
			</CardHeader>
			<CardBody>
				{error.name ? `${error.name}: ` : ""} <pre>{error.message}</pre>
			</CardBody>
		</Card>
	)
}
