// @ts-check
const { join } = require("path")
const nextPwa = require("@ducanh2912/next-pwa")

/**
 * @type {import('next').NextConfig}
 **/

const config = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	sassOptions: {
		includePaths: [join(__dirname, "src", "styles")],
	},

	output: "standalone",
}

const withPwa = nextPwa.default({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
})

module.exports = withPwa(config)
