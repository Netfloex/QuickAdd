import got, { RequestError } from "got"

const API_KEY = process.env.API_KEY

export const http = got.extend({
	prefixUrl: `https://api.themoviedb.org/3`,
	headers: {
		Authorization: `Bearer ${API_KEY}`,
	},
	hooks: {
		beforeError: [
			(err): RequestError => {
				console.log("error in request to " + err.options.url)
				console.log(err.response?.body)

				return err
			},
		],
	},
})
