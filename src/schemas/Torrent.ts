import { z } from "zod"

export const MovieProperties = z.object({
	codec: z.union([
		z.literal("X264"),
		z.literal("X265"),
		z.literal("UNKNOWN"),
	]),
	imdb: z.string().nullable(),
	quality: z.string(),
	source: z.string(),
})

export const Torrent = z.object({
	added: z.string().transform((str) => new Date(str)),
	infoHash: z.string(),
	leechers: z.number(),
	seeders: z.number(),
	magnet: z.string(),
	size: z.string(),
	name: z.string(),
	provider: z.string(),
	movieProperties: MovieProperties,
})

export type Torrent = z.output<typeof Torrent>
export type MovieProperties = z.output<typeof MovieProperties>
