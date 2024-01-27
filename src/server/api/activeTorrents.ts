import { z } from "zod"

import { handleApi } from "@server/api/handleApi"
import { config } from "@server/config"
import { gql } from "@utils/gql"

import { TorrentMovieInfo } from "./../../schemas/TorrentMovieInfo"

import { QbitTorrent } from "@schemas/QbitTorrent"

const query = gql`
	query ActiveTorrents($category: String) {
		torrents(params: { category: $category }) {
			torrents {
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
			movieInfo {
				title
				year
				forTorrents
			}
		}
	}
`

export const activeTorrents = async (): Promise<{
	torrents: QbitTorrent[]
	movieInfo: TorrentMovieInfo[]
}> => {
	const data = await handleApi(
		query,
		{
			category: config.qbittorrentCategory,
		},
		z.object({
			torrents: z.object({
				torrents: z.array(QbitTorrent),
				movieInfo: z.array(TorrentMovieInfo),
			}),
		}),
	)

	if (data.isError) {
		throw new Error("Error getting active torrents")
	}

	return data.torrents
}
