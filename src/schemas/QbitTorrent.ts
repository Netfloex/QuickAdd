import { z } from "zod"

export const QbitTorrent = z.object({
	dlspeed: z.number(),
	downloaded: z.number(),
	eta: z.number(),
	hash: z.string(),
	name: z.string(),
	numLeechs: z.number(),
	numSeeds: z.number(),
	progress: z.number(),
	size: z.number(),
})

export type QbitTorrent = z.output<typeof QbitTorrent>
