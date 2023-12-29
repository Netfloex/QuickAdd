"use client"

import { Badge } from "@nextui-org/badge"
import { Button } from "@nextui-org/button"
import { Spinner } from "@nextui-org/spinner"
import Link from "next/link"
import { MdDownload } from "react-icons/md"

import { activeQueryOptions } from "@utils/activeQueryOptions"
import { trpc } from "@utils/trpc"

import type { FC } from "react"

export const DownloadsLink: FC = () => {
	const { data, isLoading, isError, error } =
		trpc.activeTorrentsCount.useQuery(undefined, activeQueryOptions(60))

	const color: "primary" | "default" | "danger" = isError
		? "danger"
		: isLoading
		  ? "default"
		  : "primary"

	return (
		<Badge
			content={
				isLoading ? (
					<Spinner size="sm" />
				) : (
					<div className="w-5 h-5 text-center" title={error?.message}>
						{isError ? "!" : data}
					</div>
				)
			}
			showOutline={false}
			placement="top-right"
			color={color}
			classNames={{ badge: "aspect-square", base: "aspect-square" }}
		>
			<Link href="/downloads" className="w-full">
				<Button isIconOnly className="w-full h-full">
					<MdDownload size="25" />
				</Button>
			</Link>
		</Badge>
	)
}
