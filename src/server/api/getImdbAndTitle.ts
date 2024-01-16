import { z } from "zod"

import { handleApi } from "@server/api/handleApi"
import { gql } from "@utils/gql"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

const query = gql`
	query GetImdbAndTitle($tmdb: Int!) {
		movieInfo(tmdb: $tmdb) {
			imdbId
			title
			year
		}
	}
`

export const getImdbAndTitle = async (
	tmdb: number,
): Promise<Pick<MovieSearchResult, "imdbId" | "title" | "year">> => {
	const data = await handleApi(
		query,
		{
			tmdb,
		},
		z.object({
			movieInfo: MovieSearchResult.pick({
				year: true,
				title: true,
				imdbId: true,
			}),
		}),
	)

	return data.movieInfo
}
