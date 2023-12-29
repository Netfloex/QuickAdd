"use client"

import { Progress } from "@nextui-org/progress"
import { Spinner } from "@nextui-org/spinner"
import {
	getKeyValue,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/table"
import { useCallback } from "react"

import { activeQueryOptions } from "@utils/activeQueryOptions"
import { formatBytes } from "@utils/formatBytes"
import { humanizeDuration } from "@utils/humanizeDuration"
import { trpc } from "@utils/trpc"

import { ErrorCard } from "@components/ErrorCard"
import { PeersChip } from "@components/PeersChip"

import { QbitTorrent } from "@schemas/QbitTorrent"

import type { FC, Key } from "react"

export const DownloadingTable: FC = () => {
	const { data, error, isLoading } = trpc.activeTorrents.useQuery(
		undefined,
		activeQueryOptions(10),
	)

	const renderCell = useCallback(
		(torrent: QbitTorrent, key: Key): JSX.Element => {
			switch (key) {
				case "progress":
					return (
						<Progress
							value={torrent.progress * 100}
							showValueLabel
							title={`Downloading ${formatBytes(
								torrent.downloaded,
							)} / ${formatBytes(torrent.size)}`}
						/>
					)
				case "dlspeed":
					return <>{formatBytes(torrent.dlspeed)}/s</>

				case "size":
					return <>{formatBytes(torrent.size)}</>

				case "peers":
					return (
						<PeersChip
							seeders={torrent.numSeeds}
							leechers={torrent.numLeechs}
						/>
					)
				case "eta":
					if (torrent.eta === 8640000) {
						return <>∞</>
					}

					return <>{humanizeDuration(torrent.eta / 60)}</>
				default:
					return getKeyValue(torrent, key)
			}
		},
		[],
	)

	if (error) {
		return <ErrorCard error={error} />
	}

	return (
		<>
			<Table removeWrapper>
				<TableHeader>
					<TableColumn key="name">Name</TableColumn>
					<TableColumn key="progress">Progress</TableColumn>
					<TableColumn key="dlspeed">DL Speed</TableColumn>
					<TableColumn key="size">Size</TableColumn>
					<TableColumn key="peers">Peers</TableColumn>
					<TableColumn key="eta">ETA</TableColumn>
				</TableHeader>
				<TableBody
					items={data ?? []}
					isLoading={isLoading}
					loadingState={isLoading ? "loading" : "idle"}
					loadingContent={<Spinner label="Loading..." />}
					emptyContent={
						data && data.length == 0 ? "No active torrents" : " "
					}
				>
					{(item): JSX.Element => (
						<TableRow key={item.hash}>
							{(columnKey): JSX.Element => (
								<TableCell>
									{renderCell(item, columnKey)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	)
}
