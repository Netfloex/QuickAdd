import { gql } from "src/utils/gql"

import { torrentHttp } from "@server/http"

const query = gql`
	mutation AddTorrent($url: String!) {
		addTorrent(url: $url)
	}
`

export const downloadTorrent = async (url: string): Promise<boolean> => {
	const data: {
		data: null | unknown
	} = await torrentHttp
		.post({
			json: {
				query,
				variables: {
					url,
				},
			},
		})
		.json()

	return data.data != null
}
