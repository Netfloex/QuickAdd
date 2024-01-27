import { z } from "zod"

import { handleApi } from "@server/api/handleApi"
import { gql } from "@utils/gql"

const query = gql`
	mutation TrackMovie($url: String!, $tmdb: Int!) {
		trackMovie(url: $url, tmdb: $tmdb)
	}
`

export const trackMovie = async (
	url: string,
	tmdb: number,
): Promise<boolean> => {
	const data = await handleApi(
		query,
		{
			url,
			tmdb,
		},
		z.object({
			trackMovie: z.literal("Ok"),
		}),
	)

	return !data.isError
}
