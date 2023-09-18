import { Dashboard } from "./Dashboard"

import type { Metadata } from "next"
import type { FC } from "react"

export const metadata: Metadata = {
	title: "Quickadd",
	description: "Quickly download movies",
}

const Page: FC = () => {
	return <Dashboard />
}

export default Page
