import { inspect } from "util"

import got, { RequestError } from "got"
import { z } from "zod"

import { SortOptions } from "@schemas/SortOptions"
import { Torrent } from "@schemas/Torrent"

const torrentHttp = got.extend({
	prefixUrl: process.env.TORRENT_API,
	hooks: {
		beforeError: [
			(err): RequestError => {
				console.log("error in request to " + err.options.url)
				console.log(err.response?.body)

				return err
			},
		],
	},
})

const gql = (arg: TemplateStringsArray): string => arg.join("")

const query = gql`
	query GetTorrents(
		$imdb: String
		$title: String
		$sort: SortColumn
		$order: Order
	) {
		search(
			params: { imdb: $imdb, title: $title, sort: $sort, order: $order }
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
): Promise<Torrent[]> => {
	const data = await torrentHttp
		.post({
			json: {
				query,
				variables: {
					imdb,
					title,
					sort: sortOptions.sort,
					order: sortOptions.order,
				},
			},
		})
		.json()

	const result = z
		.object({
			data: z.object({
				search: Torrent.array(),
			}),
		})
		.safeParse(data)

	if (result.success) {
		return result.data.data.search
	}

	console.log(data, inspect(result.error, true, 10, true))

	throw result.error
}
