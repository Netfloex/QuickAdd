import { CODECS, QUALITIES, SOURCES } from "src/data/static_torrent_data"
import { z } from "zod"

import { fixQualityName } from "@utils/fixQualityName"
import { uppercaseArray } from "@utils/uppercaseArray"

export const MovieProperties = z.object({
	codec: z.enum(uppercaseArray(CODECS)),
	imdb: z.string().nullable(),
	quality: z.enum(uppercaseArray(QUALITIES)).transform(fixQualityName),
	source: z.enum(uppercaseArray(SOURCES)),
})

export const Torrent = z.object({
	added: z.string().transform((str) => new Date(str)),
	infoHash: z.string(),
	leechers: z.number(),
	seeders: z.number(),
	magnet: z.string(),
	size: z.string().transform((n) => parseInt(n)),
	name: z.string(),
	provider: z.string(),
	movieProperties: MovieProperties,
})

export type Torrent = z.output<typeof Torrent>
export type MovieProperties = z.output<typeof MovieProperties>
