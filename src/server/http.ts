import got, { RequestError } from "got"

const API_KEY = process.env.API_KEY

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
		Authorization: `Bearer ${API_KEY}`,
	},
})

export const torrentHttp = baseHttp.extend({
	prefixUrl: process.env.TORRENT_API,
})

export const radarrHttp = baseHttp.extend({
	prefixUrl: "https://api.radarr.video/v1",
})
