import { activeQueryOptions } from "@utils/activeQueryOptions"
import { trpc } from "@utils/trpc"

import { QbitTorrent } from "@schemas/QbitTorrent"

export const useActiveTorrent = (hash: string): undefined | QbitTorrent => {
	const { data } = trpc.activeTorrents.useQuery(
		undefined,
		activeQueryOptions(10),
	)

	const torrent = data?.torrents.find(
		(torrent) => torrent.hash.toLowerCase() === hash.toLowerCase(),
	)

	return torrent
}
