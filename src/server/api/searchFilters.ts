import { z } from "zod"

import { handleApi } from "@server/api/handleApi"
import { gql } from "@utils/gql"

import { SearchFilter } from "@schemas/SearchFilter"

const query = gql`
	query SearchFilters {
		searchFilters {
			display
			name
			typeName
			values {
				display
				name
			}
		}
	}
`

export const searchFilters = async (): Promise<SearchFilter[]> => {
	const data = await handleApi(
		query,
		{},
		z.object({
			searchFilters: z.array(SearchFilter),
		}),
	)

	if (data.isError) {
		throw new Error("Error getting searchFilters")
	}

	return data.searchFilters
}
