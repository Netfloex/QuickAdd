interface Movie {
	title: string
	year: number
}

export const formatMovie = (movie: Movie): string =>
	`${movie.title} (${movie.year})`
