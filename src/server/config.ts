import { checkConfig } from "@server/checkConfig"

import { Config } from "@schemas/ConfigSchema"

const checkedConfig = checkConfig()

if (!checkedConfig.success) {
	throw new Error("Invalid config")
}

export const config: Config = checkedConfig.data
