import { inspect } from "util"

import { z, ZodType } from "zod"

import { torrentHttp } from "@server/http"

export const handleApi = async <T extends ZodType>(
	query: string,
	variables: Record<string, unknown>,
	schema: T,
): Promise<z.output<T>> => {
	const data = await torrentHttp
		.post({
			json: {
				query,
				variables,
			},
		})
		.json()

	const result = z
		.object({
			data: schema,
		})
		.safeParse(data)

	if (result.success) {
		return result.data.data
	}

	console.error("Zod parse error")
	console.error("Data: ", inspect(data, true, 10, true))
	console.error("Error: ", inspect(result.error, false, 10, true))
}
