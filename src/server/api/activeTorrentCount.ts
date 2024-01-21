import { z } from "zod"

import { handleApi } from "@server/api/handleApi"
import { config } from "@server/config"
import { gql } from "@utils/gql"

const query = gql`
	query ActiveTorrents($category: String) {
		torrents(params: { category: $category }) {
			hash
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
			torrents: z.array(z.object({ hash: z.string() })),
		}),
	)

	return data.torrents.length
}
