import { z } from "zod"

import { handleApi } from "@server/api/handleApi"
import { gql } from "@utils/gql"

const query = gql`
	mutation DeleteTorrents($hashes: [String!]!, $deleteFiles: Boolean!) {
		deleteTorrents(hashes: $hashes, deleteFiles: $deleteFiles)
	}
`

export const deleteTorrents = async (
	hashes: string[],
	deleteFiles: boolean,
): Promise<true> => {
	await handleApi(
		query,
		{
			hashes,
			deleteFiles,
		},
		z.object({
			deleteTorrents: z.literal("Ok"),
		}),
	)

	return true
}
