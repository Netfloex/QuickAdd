import { CODECS, QUALITIES, SOURCES } from "src/data/static_torrent_data"
import { uppercaseArray } from "src/utils/uppercaseArray"
import { z } from "zod"

export const Sources = z.enum(uppercaseArray(SOURCES))
export const Qualities = z.enum(uppercaseArray(QUALITIES))
export const Codecs = z.enum(uppercaseArray(CODECS))

export const MovieFilterProperties = z.object({
	sources: Sources.array(),
	qualities: Qualities.array(),
	codecs: Codecs.array(),
})

export type MovieFilterProperties = z.output<typeof MovieFilterProperties>
export type Sources = z.output<typeof Sources>
export type Qualities = z.output<typeof Qualities>
export type Codecs = z.output<typeof Codecs>
