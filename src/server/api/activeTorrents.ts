import { z } from "zod"

import { handleApi } from "@server/api/handleApi"
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
	const data = await handleApi(
		query,
		{},
		z.object({
			torrents: QbitTorrent.array(),
		}),
	)

	return data.torrents
}
