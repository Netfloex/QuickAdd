import { z } from "zod"

export const ConfigSchema = z.object({
	torrentApiUrl: z
		.string({ required_error: "TORRENT_API is required" })
		.url({ message: "TORRENT_API must be a valid URL" }),
	qbittorrentCategory: z.string().default("torrent-api"),
	language: z.string().min(2).max(2).toUpperCase().default("US"),
})

export type Config = z.infer<typeof ConfigSchema>
