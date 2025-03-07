import { NextConfig } from "next"

const config: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},

	output: "standalone",
}

export default config
