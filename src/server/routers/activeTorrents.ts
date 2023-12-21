import { activeTorrents } from "@server/api/activeTorrents"
import { procedure } from "@server/trpc"

export const activeTorrentsRoute = procedure.query(async () => {
	return await activeTorrents()
})
