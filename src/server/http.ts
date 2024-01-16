import got, { RequestError } from "got"

import { config } from "@server/config"

const baseHttp = got.extend({
	hooks: {
		beforeError: [
			(err): RequestError => {
				console.log("error in request to " + err.options.url)
				console.log(err.response?.statusCode, err.response?.body)
				console.log(err.cause, err.code, err.message)

				return err
			},
		],
	},
})

export const http = baseHttp.extend({
	prefixUrl: `https://api.themoviedb.org/3`,
	headers: {
		Authorization: `Bearer ${config.theMovieDbApiKey}`,
	},
})

export const torrentHttp = baseHttp.extend({
	prefixUrl: config.torrentApiUrl,
})

export const radarrHttp = baseHttp.extend({
	prefixUrl: "https://api.radarr.video/v1",
})
