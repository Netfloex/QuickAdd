"use client"

import { useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

import { Spacer } from "@heroui/spacer"

import { trpc } from "@utils/trpc"

import { Results } from "./Results"
import { SearchField } from "./SearchField"

import type { FC } from "react"

export const QueryWrapper: FC = () => {
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

	const {
		data: searchedMovies,
		isLoading: searchLoading,
		error: searchError,
	} = trpc.searchMovies.useQuery({ query }, { enabled: query.length !== 0 })
	const {
		data: trendingMovies,
		isLoading: trendingLoading,
		error: trendingError,
	} = trpc.trendingMovies.useQuery()

	return (
		<>
			<SearchField
				onValueChange={onSearchChange}
				defaultQuery={queryParam}
			/>
			<Spacer y={3} />
			{query.length === 0 ? (
				<>
					<h1 className="text-3xl font-bold">Trending</h1>
					<Spacer y={3} />
					<Results
						movies={trendingMovies || []}
						isLoading={trendingLoading}
						error={trendingError}
						loadingSkeletonCount={15}
					/>
				</>
			) : (
				<Results
					movies={searchedMovies || []}
					isLoading={searchLoading}
					error={searchError}
					loadingSkeletonCount={3}
				/>
			)}
		</>
	)
}
