import { inspect } from "util"

import { gql } from "src/utils/gql"
import { z } from "zod"

import { torrentHttp } from "@server/http"

import { QbitTorrent } from "@schemas/QbitTorrent"

const query = gql`
	query ActiveTorrents {
		torrents(params: {}) {
			hash
			name
			progress
			downloaded
			size
		}
	}
`

export const activeTorrents = async (): Promise<QbitTorrent[]> => {
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
				torrents: QbitTorrent.array(),
			}),
		})
		.safeParse(data)

	if (result.success) {
		return result.data.data.torrents
	}

	console.log(data, inspect(result.error, true, 10, true))

	throw result.error
}
