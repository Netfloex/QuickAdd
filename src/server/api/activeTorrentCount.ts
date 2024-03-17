import { z } from "zod"

import { handleApi } from "@server/api/handleApi"
import { config } from "@server/config"
import { gql } from "@utils/gql"

const query = gql`
	query ActiveTorrents($category: String) {
		activeTorrents(params: { category: $category }) {
			torrents {
				hash
			}
		}
	}
`

export const activeTorrentCount = async (): Promise<number> => {
	const data = await handleApi(
		query,
		{
			category: config.qbittorrentCategory,
		},
		z.object({
			activeTorrents: z.object({
				torrents: z.array(
					z.object({
						hash: z.string(),
					}),
				),
			}),
		}),
	)

	if (data.isError) {
		throw new Error("Error getting active torrents")
	}

	return data.activeTorrents.torrents.length
}
