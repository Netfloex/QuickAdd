import { z } from "zod"

export const ConfigSchema = z.object({
	theMovieDbApiKey: z.string({ required_error: "API_KEY is required" }),
	torrentApiUrl: z
		.string({ required_error: "TORRENT_API is required" })
		.url({ message: "TORRENT_API must be a valid URL" }),
})

export type Config = z.infer<typeof ConfigSchema>
