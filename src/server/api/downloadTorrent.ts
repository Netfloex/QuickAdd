import { torrentHttp } from "@server/http"
import { gql } from "@utils/gql"

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
