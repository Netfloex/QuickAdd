"use client"

import { Card } from "@nextui-org/card"
import { Spacer } from "@nextui-org/spacer"
import { useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

import { Results } from "./Results"
import { SearchField } from "./SearchField"

import type { FC } from "react"

export const Dashboard: FC = () => {
	const params = useSearchParams()

	const queryParam = params?.get("query") || ""

	const [query, setQuery] = useState(queryParam)

	const setQueryDebounced = useDebouncedCallback(setQuery, 400)
	const onSearchChange = useCallback(
		(value: string) => {
			const newUrl = !value
				? location.href.split("?")[0]
				: `?query=${value}`
			history.pushState(
				{ ...history.state, as: newUrl, newUrl },
				"",
				newUrl,
			)
			setQueryDebounced(value)
		},
		[setQueryDebounced],
	)

	return (
		<div className="container">
			<Card className="p-3">
				<SearchField
					onValueChange={onSearchChange}
					defaultQuery={queryParam}
				/>
				<Spacer y={3} />
				<Results query={query} />
			</Card>
		</div>
	)
}
