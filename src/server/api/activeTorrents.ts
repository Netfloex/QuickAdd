import { inspect } from "util"

import { z } from "zod"

import { torrentHttp } from "@server/http"
import { gql } from "@utils/gql"

import { QbitTorrent } from "@schemas/QbitTorrent"

const query = gql`
	query ActiveTorrents {
		torrents(params: {}) {
			dlspeed
			downloaded
			numLeechs
			numSeeds
			eta
			hash
			name
			progress
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
