import { z } from "zod"

import { handleApi } from "@server/api/handleApi"
import { gql } from "@utils/gql"

import { MovieFilterProperties } from "@schemas/MovieFilterProperties"
import { SearchResponse } from "@schemas/SearchResponse"
import { SortOptions } from "@schemas/SortOptions"

export const searchTorrents = async (
	imdb: string,
	sortOptions: SortOptions,
	filters: MovieFilterProperties,
): Promise<SearchResponse> => {
	const paramsWithType = Object.entries(filters)
		.map(([key, val]) => `$${key}: [${val.typeName}!]`)
		.join("\n")
	const params = Object.keys(filters)
		.map((key) => `${key}: $${key}`)
		.join("\n")

	const query = gql`
		query SearchTorrents(
			$imdb: String
			$sort: SortColumn
			$order: Order	
			${paramsWithType}
		) {
			searchTorrents(
				params: {
					imdb: $imdb
					sort: $sort
					order: $order
					${params}
				}
			) {
				errors {
					provider
					error
				}
				torrents {
					added
					infoHash
					leechers
					name
					provider
					seeders
					magnet
					size
					movieProperties {
						codec
						imdb
						quality
						source
					}
				}
			}
		}
	`

	const variables = Object.entries(filters).reduce(
		(prev, [key, val]): Record<string, string[]> => ({
			...prev,
			[key]: val.values.map((v) => v.toUpperCase()),
		}),
		{},
	)

	const data = await handleApi(
		query,
		{
			...variables,
			imdb,
			sort: sortOptions.sort,
			order: sortOptions.order,
		},
		z.object({
			searchTorrents: SearchResponse,
		}),
	)

	if (data.isError) throw new Error("Graphql error")

	return data.searchTorrents
}
