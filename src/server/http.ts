import got, { RequestError } from "got"

import { config } from "@server/config"

export const torrentHttp = got.extend({
	prefixUrl: config.torrentApiUrl,
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
