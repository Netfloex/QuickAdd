import { trpc } from "@utils/trpc"

import { QbitTorrent } from "@schemas/QbitTorrent"

export const useActiveTorrent = (hash: string): undefined | QbitTorrent => {
	const { data } = trpc.activeTorrents.useQuery(undefined, {
		staleTime: 10,
		refetchOnWindowFocus: true,
		refetchInterval: 10 * 1000,
	})

	const torrent = data?.find(
		(torrent) => torrent.hash.toLowerCase() === hash.toLowerCase(),
	)

	return torrent
}
