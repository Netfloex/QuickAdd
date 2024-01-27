import { z } from "zod"

export const TorrentMovieInfo = z.object({
	title: z.string(),
	year: z.number(),
	forTorrents: z.array(z.string()),
})

export type TorrentMovieInfo = z.output<typeof TorrentMovieInfo>
