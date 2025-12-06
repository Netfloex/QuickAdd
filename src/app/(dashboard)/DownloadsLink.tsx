"use client"

import Link from "next/link"
import { MdDownload } from "react-icons/md"

import { Badge } from "@heroui/badge"
import { Button } from "@heroui/button"
import { Spinner } from "@heroui/spinner"

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
			classNames={{ badge: "aspect-square", base: "aspect-square" }}
			color={color}
			content={
				isLoading ? (
					<Spinner size="sm" />
				) : (
					<div className="w-5 h-5 text-center" title={error?.message}>
						{isError ? "!" : data}
					</div>
				)
			}
			placement="top-right"
			showOutline={false}
		>
			<Link className="w-full" href="/downloads">
				<Button className="w-full h-full" isIconOnly>
					<MdDownload size="25" />
				</Button>
			</Link>
		</Badge>
	)
}
