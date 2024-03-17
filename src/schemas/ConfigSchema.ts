import { z } from "zod"

export const ConfigSchema = z.object({
	torrentApiUrl: z
		.string({ required_error: "TORRENT_API is required" })
		.url({ message: "TORRENT_API must be a valid URL" }),
	qbittorrentCategory: z.string().default("torrent-api"),
})

export type Config = z.infer<typeof ConfigSchema>
