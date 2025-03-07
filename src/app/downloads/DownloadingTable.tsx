import { JSX, useCallback, useMemo } from "react"

import { Progress } from "@heroui/progress"
import { Spinner } from "@heroui/spinner"
import {
	getKeyValue,
	Selection,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/table"

import { activeQueryOptions } from "@utils/activeQueryOptions"
import { formatBytes } from "@utils/formatBytes"
import { formatMovie } from "@utils/formatMovie"
import { humanizeDuration } from "@utils/humanizeDuration"
import { removeTmdbId } from "@utils/removeTmdbId"
import { trpc } from "@utils/trpc"

import { ErrorCard } from "@components/ErrorCard"
import { PeersChip } from "@components/PeersChip"

import { QbitTorrent } from "@schemas/QbitTorrent"
import { TorrentMovieInfo } from "@schemas/TorrentMovieInfo"

import type { FC } from "react"

type Key = string | number

type QbitTorrentWithMovieInfo = QbitTorrent & {
	movieInfo: TorrentMovieInfo | undefined
}

export const DownloadingTable: FC<{
	selectedKeys: Selection
	setSelectedKeys: (selectedKeys: Selection) => void
}> = ({ selectedKeys, setSelectedKeys }) => {
	const { data, error, isLoading } = trpc.activeTorrents.useQuery(
		undefined,
		activeQueryOptions(10),
	)

	const torrents: QbitTorrentWithMovieInfo[] | undefined = useMemo(() => {
		return data?.torrents.map((torrent) => {
			const movieInfo = data?.movieInfo.find((info) =>
				info.forTorrents.includes(torrent.hash),
			)

			return {
				...torrent,
				movieInfo,
			}
		})
	}, [data?.movieInfo, data?.torrents])

	const renderCell = useCallback(
		(torrent: QbitTorrentWithMovieInfo, key: Key): JSX.Element => {
			switch (key) {
				case "name":
					return (
						<>
							{torrent.movieInfo && (
								<p className="text-lg font-bold">
									{formatMovie(torrent.movieInfo)}
								</p>
							)}
							<p className="text-sm text-gray-300">
								{removeTmdbId(torrent.name)}
							</p>
						</>
					)
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
			<div className="overflow-scroll">
				<Table
					removeWrapper
					selectionMode="multiple"
					selectedKeys={selectedKeys}
					onSelectionChange={setSelectedKeys}
				>
					<TableHeader>
						<TableColumn key="name">Name</TableColumn>
						<TableColumn key="progress">Progress</TableColumn>
						<TableColumn key="dlspeed">DL Speed</TableColumn>
						<TableColumn key="size">Size</TableColumn>
						<TableColumn key="peers">Peers</TableColumn>
						<TableColumn key="eta">ETA</TableColumn>
					</TableHeader>
					<TableBody
						items={torrents ?? []}
						isLoading={isLoading}
						loadingState={isLoading ? "loading" : "idle"}
						loadingContent={<Spinner label="Loading..." />}
						emptyContent={
							data && data.torrents.length == 0
								? "No active torrents"
								: " "
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
			</div>
		</>
	)
}
