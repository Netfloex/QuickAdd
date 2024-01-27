import { z } from "zod"

import { handleApi } from "@server/api/handleApi"
import { gql } from "@utils/gql"

import { MovieFilterProperties } from "@schemas/MovieFilterProperties"
import { SearchResponse } from "@schemas/SearchResponse"
import { SortOptions } from "@schemas/SortOptions"

const query = gql`
	query GetTorrents(
		$imdb: String
		$sort: SortColumn
		$order: Order
		$quality: [Quality!]
		$codec: [VideoCodec!]
		$source: [Source!]
	) {
		search(
			params: {
				imdb: $imdb
				sort: $sort
				order: $order
				quality: $quality
				codec: $codec
				source: $source
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

export const getTorrents = async (
	imdb: string,
	sortOptions: SortOptions,
	movieProperties: MovieFilterProperties,
): Promise<SearchResponse> => {
	const data = await handleApi(
		query,
		{
			imdb,
			sort: sortOptions.sort,
			order: sortOptions.order,
			source: movieProperties.sources,
			quality: movieProperties.qualities,
			codec: movieProperties.codecs,
		},
		z.object({
			search: SearchResponse,
		}),
	)

	if (data.isError) throw new Error("Graphql error")

	return data.search
}
