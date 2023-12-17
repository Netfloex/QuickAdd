import camelcaseKeys from "camelcase-keys"
import { z } from "zod"

const movieRating = z
	.object({
		Count: z.number(),
		Value: z.number(),
		Type: z.string(),
	})
	.nullable()

export const MovieSearchResult = z
	.object({
		Title: z.string(),
		OriginalTitle: z.string(),
		ImdbId: z.string().nullable(),
		Runtime: z.number(),
		Year: z.number(),
		Overview: z.string(),
		MovieRatings: z.object({
			Tmdb: movieRating,
			Imdb: movieRating,
			RottenTomatoes: movieRating,
			Metacritic: movieRating,
		}),
		Images: z.array(
			z.object({
				CoverType: z.string(),
				Url: z.string(),
			}),
		),
		TmdbId: z.number(),
	})
	.transform((data) => {
		return camelcaseKeys(data, { deep: true })
	})

export type MovieSearchResult = z.output<typeof MovieSearchResult>
