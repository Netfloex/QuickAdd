import { z } from "zod"

import { handleApi } from "@server/api/handleApi"
import { gql } from "@utils/gql"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

const query = gql`
	query TrendingMovies {
		popularMovies {
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
			credits {
				cast {
					name
					character
					creditId
					tmdbId
					headshotUrl
				}
				crew {
					name
					job
					creditId
					tmdbId
					headshotUrl
				}
			}
			studio
			youtubeTrailerId
			certifications {
				country
				certification
			}
		}
	}
`

export const trendingMovies = async (): Promise<MovieSearchResult[]> => {
	const data = await handleApi(
		query,
		{},
		z.object({
			popularMovies: z.array(MovieSearchResult),
		}),
	)

	if (data.isError) {
		throw new Error("Error searching movies")
	}

	return data.popularMovies
}
