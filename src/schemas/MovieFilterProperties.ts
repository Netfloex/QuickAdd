import { CODECS, QUALITIES, SOURCES } from "src/data/static_torrent_data"
import { z } from "zod"

type UppercaseArray<T extends readonly string[]> = {
	[K in keyof T]: Uppercase<T[K]>
}

const upper = <T extends readonly string[]>(strings: T): UppercaseArray<T> =>
	strings.map((s) => s.toLocaleUpperCase()) as UppercaseArray<T>

export const Sources = z.enum(upper(SOURCES))
export const Qualities = z.enum(upper(QUALITIES))
export const Codecs = z.enum(upper(CODECS))

export const MovieFilterProperties = z.object({
	sources: Sources.array(),
	qualities: Qualities.array(),
	codecs: Codecs.array(),
})

export type MovieFilterProperties = z.output<typeof MovieFilterProperties>
export type Sources = z.output<typeof Sources>
export type Qualities = z.output<typeof Qualities>
export type Codecs = z.output<typeof Codecs>
