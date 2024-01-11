import { z } from "zod"

import { handleApi } from "@server/api/handleApi"
import { gql } from "@utils/gql"

import { MovieFilterProperties } from "@schemas/MovieFilterProperties"
import { SortOptions } from "@schemas/SortOptions"
import { Torrent } from "@schemas/Torrent"

const query = gql`
	query GetTorrents(
		$imdb: String
		$title: String
		$sort: SortColumn
		$order: Order
		$quality: [Quality!]
		$codec: [VideoCodec!]
		$source: [Source!]
	) {
		search(
			params: {
				imdb: $imdb
				title: $title
				sort: $sort
				order: $order
				quality: $quality
				codec: $codec
				source: $source
			}
		) {
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
`

export const getTorrents = async (
	imdb: string,
	title: string,
	sortOptions: SortOptions,
	movieProperties: MovieFilterProperties,
): Promise<Torrent[]> => {
	const data = await handleApi(
		query,
		{
			imdb,
			title,
			sort: sortOptions.sort,
			order: sortOptions.order,
			source: movieProperties.sources,
			quality: movieProperties.qualities,
			codec: movieProperties.codecs,
		},
		z.object({
			search: Torrent.array(),
		}),
	)

	return data.search
}
