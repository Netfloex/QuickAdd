import { z } from "zod"

import { getImdbAndTitle } from "@server/api/getImdbAndTitle"
import { getTorrents } from "@server/api/getTorrents"
import { procedure } from "@server/trpc"

import { MovieFilterProperties } from "@schemas/MovieFilterProperties"
import { SortOptions } from "@schemas/SortOptions"

export const searchTorrentsRoute = procedure
	.input(
		z.object({
			id: z.number(),
			sortOptions: SortOptions,
			movieFilterProps: MovieFilterProperties,
		}),
	)
	.query(async ({ input: { id, sortOptions, movieFilterProps } }) => {
		const info = await getImdbAndTitle(id)

		if (!info.imdbId) {
			return []
		}

		return await getTorrents(
			info.imdbId,
			`${info.title} (${info.year})`,
			sortOptions,
			movieFilterProps,
		)
	})
