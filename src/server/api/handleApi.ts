import { inspect } from "util"

import { z, ZodType } from "zod"

import { torrentHttp } from "@server/http"

import { GraphqlError } from "@schemas/GraphqlError"

type HandleApiResponse<T extends ZodType> =
	| ({
			isError: false
	  } & z.output<T>)
	| (GraphqlError & {
			isError: true
	  })

export const handleApi = async <T extends ZodType>(
	query: string,
	variables: Record<string, unknown>,
	schema: T,
): Promise<HandleApiResponse<T>> => {
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
			data: schema.nullable(),
			errors: z.array(GraphqlError).optional(),
		})
		.safeParse(data)

	if (result.success) {
		if (result.data.data)
			return {
				...result.data.data,
				isError: false,
			} as HandleApiResponse<T>
		else {
			console.error("Graphql server error")
			console.error("Data: ", inspect(data, true, 10, true))

			return {
				...result.data.errors,
				isError: true,
			} as HandleApiResponse<T>
		}
	}

	console.error("Zod parse error")
	console.error("Data: ", inspect(data, true, 10, true))
	console.error("Error: ", inspect(result.error, false, 10, true))

	throw new Error("Zod parse error")
}
