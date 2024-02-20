import { z } from "zod"

const movieRating = z
	.object({
		count: z.number(),
		value: z.number(),
	})
	.nullable()

const dateString = z
	.string()
	.transform((a) => new Date(a).getTime())
	.nullable()

export const MovieSearchResult = z.object({
	imdbId: z.string().nullable(),
	overview: z.string(),
	title: z.string(),
	originalTitle: z.string(),
	runtime: z.number(),
	year: z.number(),
	tmdbId: z.number(),
	movieRatings: z.object({
		tmdb: movieRating,
		imdb: movieRating,
		rottenTomatoes: movieRating,
		metacritic: movieRating,
	}),
	genres: z.array(z.string()),
	posterUrl: z.string().nullable(),
	physicalRelease: dateString,
	digitalRelease: dateString,
	inCinema: dateString,
	youtubeTrailerId: z.string().nullable(),
	studio: z.string(),
	credits: z.object({
		cast: z.array(
			z.object({
				name: z.string(),
				character: z.string(),
				creditId: z.string(),
				tmdbId: z.number(),
				headshotUrl: z.string().nullable(),
			}),
		),
		crew: z.array(
			z.object({
				name: z.string(),
				job: z.string(),
				creditId: z.string(),
				tmdbId: z.number(),
				headshotUrl: z.string().nullable(),
			}),
		),
	}),
})

export type MovieSearchResult = z.output<typeof MovieSearchResult>
