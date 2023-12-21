import { z } from "zod"

export const QbitTorrent = z.object({
	name: z.string(),
	hash: z.string(),
	progress: z.number(),
	downloaded: z.string().transform((n) => parseInt(n)),
	size: z.string().transform((n) => parseInt(n)),
})

export type QbitTorrent = z.output<typeof QbitTorrent>
