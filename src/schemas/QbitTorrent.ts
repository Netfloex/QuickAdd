import { z } from "zod"

export const QbitTorrent = z.object({
	dlspeed: z.number(),
	downloaded: z.string().transform((n) => parseInt(n)),
	eta: z.string().transform((n) => parseInt(n)),
	hash: z.string(),
	name: z.string(),
	numLeechs: z.number(),
	numSeeds: z.number(),
	progress: z.number(),
	size: z.string().transform((n) => parseInt(n)),
})

export type QbitTorrent = z.output<typeof QbitTorrent>
