import { z } from "zod"

export const MovieProperties = z.object({
	codec: z.enum(["UNKNOWN", "AVC", "HEVC", "XVID"]),
	imdb: z.string().nullable(),
	quality: z.enum([
		"UNKNOWN",
		"P480",
		"P540",
		"P576",
		"P720",
		"P1080",
		"P2160",
	]),
	source: z.enum([
		"UNKNOWN",
		"CAM",
		"TELESYNC",
		"TELECINE",
		"DVD",
		"HDTV",
		"HDRIP",
		"WEBRIP",
		"WEBDL",
		"BLURAY",
	]),
})

export const Torrent = z.object({
	added: z.string().transform((str) => new Date(str)),
	infoHash: z.string(),
	leechers: z.number(),
	seeders: z.number(),
	magnet: z.string(),
	size: z.number(),
	name: z.string(),
	provider: z.array(z.string()),
	movieProperties: MovieProperties,
})

export type Torrent = z.output<typeof Torrent>
export type MovieProperties = z.output<typeof MovieProperties>
