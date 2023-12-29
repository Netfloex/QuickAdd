import { inspect } from "util"

import { z } from "zod"

import { torrentHttp } from "@server/http"
import { gql } from "@utils/gql"

const query = gql`
	query ActiveTorrents {
		torrents(params: {}) {
			hash
		}
	}
`

export const activeTorrentCount = async (): Promise<number> => {
	const data = await torrentHttp
		.post({
			json: {
				query,
			},
		})
		.json()

	const result = z
		.object({
			data: z.object({
				torrents: z.array(z.object({ hash: z.string() })),
			}),
		})
		.safeParse(data)

	if (result.success) {
		return result.data.data.torrents.length
	}

	console.log(data, inspect(result.error, true, 10, true))

	throw result.error
}
