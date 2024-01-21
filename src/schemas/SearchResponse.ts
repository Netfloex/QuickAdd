import { z } from "zod"

import { ProviderError } from "@schemas/ProviderError"
import { Torrent } from "@schemas/Torrent"

export const SearchResponse = z.object({
	torrents: z.array(Torrent),
	errors: z.array(ProviderError),
})

export type SearchResponse = z.output<typeof SearchResponse>
