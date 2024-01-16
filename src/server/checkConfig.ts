import { z } from "zod"

import { Config, ConfigSchema } from "@schemas/ConfigSchema"

export const checkConfig = (): z.SafeParseReturnType<Config, Config> => {
	const parsed = ConfigSchema.safeParse({
		torrentApiUrl: process.env.TORRENT_API,
	})

	return parsed
}
