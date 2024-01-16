import { z } from "zod"

import { Config, ConfigSchema } from "@schemas/ConfigSchema"

export const checkConfig = (): z.SafeParseReturnType<Config, Config> => {
	const parsed = ConfigSchema.safeParse({
		theMovieDbApiKey: process.env.API_KEY,
		torrentApiUrl: process.env.TORRENT_API,
	})

	return parsed
}
