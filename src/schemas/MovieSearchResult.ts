import camelcaseKeys from "camelcase-keys"
import { z } from "zod"

const movieRating = z
	.object({
		Count: z.number(),
		Value: z.number(),
		Type: z.string(),
	})
	.nullable()

const dateString = z
	.string()
	.datetime()
	.transform((a) => new Date(a).getTime())
	.nullable()

export const MovieSearchResult = z
	.object({
		ImdbId: z.string().nullable(),
		Overview: z.string(),
		Title: z.string(),
		OriginalTitle: z.string(),
		Runtime: z.number(),
		Year: z.number(),
		TmdbId: z.number(),
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
		Genres: z.array(z.string()),
		PhysicalRelease: dateString,
		DigitalRelease: dateString,
		InCinema: dateString,
	})
	.transform((data) => {
		return camelcaseKeys(data, { deep: true })
	})

export type MovieSearchResult = z.output<typeof MovieSearchResult>
