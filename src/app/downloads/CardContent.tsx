"use client"

import { Divider } from "@nextui-org/divider"
import { Selection } from "@nextui-org/table"
import { useState } from "react"
import { DeleteButton } from "src/app/downloads/DeleteButton"

import { DownloadingTable } from "./DownloadingTable"
import { RefreshButton } from "./RefreshButton"

import type { FC } from "react"

export const CardContent: FC = () => {
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
	console.log("selectedKeys", selectedKeys)

	return (
		<>
			<div className="mb-4 h-10 flex items-center space-x-4">
				<RefreshButton />
				<Divider orientation="vertical" />
				<DeleteButton
					selectedKeys={selectedKeys}
					setSelectedKeys={setSelectedKeys}
				/>
			</div>
			<DownloadingTable
				selectedKeys={selectedKeys}
				setSelectedKeys={setSelectedKeys}
			/>
		</>
	)
}
