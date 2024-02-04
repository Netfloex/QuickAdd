import { z } from "zod"

import { handleApi } from "@server/api/handleApi"
import { gql } from "@utils/gql"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

const query = gql`
	query SearchMovies($query: String!) {
		searchMovies(query: $query) {
			imdbId
			overview
			title
			originalTitle
			runtime
			year
			tmdbId
			movieRatings {
				tmdb {
					value
					count
				}
				imdb {
					value
					count
				}
				metacritic {
					value
					count
				}
				rottenTomatoes {
					value
					count
				}
			}
			genres
			posterUrl
			physicalRelease
			digitalRelease
			inCinema
			youtubeTrailerId
		}
	}
`

export const searchMovies = async (q: string): Promise<MovieSearchResult[]> => {
	const data = await handleApi(
		query,
		{
			query: q,
		},
		z.object({
			searchMovies: z.array(MovieSearchResult),
		}),
	)

	if (data.isError) {
		throw new Error("Error searching movies")
	}

	return data.searchMovies
}
