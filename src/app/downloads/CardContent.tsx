"use client"

import { useState } from "react"
import { DeleteButton } from "src/app/downloads/DeleteButton"

import { Divider } from "@heroui/divider"
import { Selection } from "@heroui/table"

import { DownloadingTable } from "./DownloadingTable"
import { RefreshButton } from "./RefreshButton"

import type { FC } from "react"

export const CardContent: FC = () => {
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

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
