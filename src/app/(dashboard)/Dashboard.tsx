"use client"

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
			<SearchField onValueChange={setQuery} query={query} />
			<Results query={query} />
		</div>
	)
}
