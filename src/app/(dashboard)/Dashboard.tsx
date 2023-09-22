"use client"

import { Card } from "@nextui-org/card"
import { Spacer } from "@nextui-org/spacer"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Results } from "src/app/(dashboard)/Results"
import { SearchField } from "src/app/(dashboard)/SearchField"

import type { FC } from "react"

export const Dashboard: FC = () => {
	const params = useSearchParams()

	const queryParam = params?.get("query") || ""

	const [query, setQuery] = useState(queryParam)

	return (
		<div className="container">
			<Card className="p-3">
				<SearchField onValueChange={setQuery} query={query} />
				<Spacer y={3} />
				<Results query={query} />
			</Card>
		</div>
	)
}
