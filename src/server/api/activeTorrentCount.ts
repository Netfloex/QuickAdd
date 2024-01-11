import { z } from "zod"

import { handleApi } from "@server/api/handleApi"
import { gql } from "@utils/gql"

const query = gql`
	query ActiveTorrents {
		torrents(params: {}) {
			hash
		}
	}
`

export const activeTorrentCount = async (): Promise<number> => {
	const data = await handleApi(
		query,
		{},
		z.object({
			torrents: z.array(z.object({ hash: z.string() })),
		}),
	)

	return data.torrents.length
}
