import { z } from "zod"

import { handleApi } from "@server/api/handleApi"
import { config } from "@server/config"
import { gql } from "@utils/gql"

import { QbitTorrent } from "@schemas/QbitTorrent"

const query = gql`
	query ActiveTorrents($category: String) {
		torrents(params: { category: $category }) {
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
		{
			category: config.qbittorrentCategory,
		},
		z.object({
			torrents: QbitTorrent.array(),
		}),
	)

	return data.torrents
}
