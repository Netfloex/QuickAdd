import { z } from "zod"

import { Config, ConfigSchema } from "@schemas/ConfigSchema"

export const checkConfig = (): z.SafeParseReturnType<Config, Config> => {
	const parsed = ConfigSchema.safeParse({
		torrentApiUrl: process.env.TORRENT_API,
		qbittorrentCategory: process.env.QBITTORRENT_CATEGORY,
		language: process.env.LANGUAGE,
	} satisfies Partial<Config>)

	return parsed
}
