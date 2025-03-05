// @ts-check
const { join } = require("path")

const config = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	sassOptions: {
		includePaths: [join(__dirname, "src", "styles")],
	},

	output: "standalone",

	experimental: {
		instrumentationHook: true,
	},
}

module.exports = config
