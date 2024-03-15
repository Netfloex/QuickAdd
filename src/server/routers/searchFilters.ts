import { searchFilters } from "@server/api/searchFilters"
import { procedure } from "@server/trpc"

export const searchFiltersRoute = procedure.query(async () => {
	return await searchFilters()
})
