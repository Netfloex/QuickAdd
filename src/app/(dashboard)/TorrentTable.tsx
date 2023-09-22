import { Chip } from "@nextui-org/chip"
import { SortDescriptor } from "@nextui-org/react"
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
import { useCallback, useMemo, useState } from "react"
import { formatBytes } from "src/utils/formatBytes"
import { trpc } from "src/utils/trpc"

import { MovieSearchResult } from "@schemas/MovieSearchResult"
import { Torrent } from "@schemas/Torrent"

import type { FC, Key } from "react"

export const TorrentTable: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: "seeders",
		direction: "descending",
	})

	const { data, isFetching } = trpc.searchTorrents.useQuery({
		id: movie.id,
		sortOptions: {
			order:
				sortDescriptor.direction == "ascending"
					? "ASCENDING"
					: "DESCENDING",
			sort: sortDescriptor.column?.toString().toUpperCase() as "SEEDERS",
		},
	})

	const columns = useMemo(
		() => [
			{
				key: "name",
				label: "Title",
			},
			{
				key: "quality",
				label: "Quality",
			},
			{
				key: "codec",
				label: "Codec",
			},
			{
				key: "source",
				label: "Source",
			},
			{
				key: "seeders",
				label: "Peers",
			},
			{
				key: "size",
				label: "Size",
			},
			{
				key: "provider",
				label: "Provider",
			},
			{
				key: "added",
				label: "Added",
			},
		],
		[],
	)

	const sort = useCallback((desc: SortDescriptor) => {
		setSortDescriptor(desc)
	}, [])

	const renderCell = useCallback(
		(torrent: Torrent, key: Key): JSX.Element => {
			switch (key) {
				case "size":
					return <Chip>{formatBytes(parseInt(torrent.size))}</Chip>
				case "seeders":
					let color:
						| "default"
						| "danger"
						| "primary"
						| "warning"
						| "secondary"
						| "success" = "danger"

					if (torrent.seeders > 200) {
						color = "success"
					} else if (torrent.seeders > 50) {
						color = "primary"
					} else if (torrent.seeders > 10) {
						color = "secondary"
					} else if (torrent.seeders > 0) {
						color = "warning"
					}

					return (
						<Chip color={color} variant="flat">
							{torrent.seeders}/{torrent.leechers}
						</Chip>
					)
				case "added":
					return <>{torrent.added.toLocaleDateString()}</>
				case "quality":
				case "codec":
				case "source":
					return <>{torrent.movieProperties[key]}</>
				default:
					return <>{getKeyValue(torrent, key)}</>
			}
		},
		[],
	)

	return (
		<>
			<Table
				removeWrapper
				sortDescriptor={sortDescriptor}
				onSortChange={sort}
			>
				<TableHeader columns={columns}>
					{(column): JSX.Element => (
						<TableColumn
							allowsSorting={[
								"seeders",
								"leechers",
								"size",
								"added",
							].includes(column.key)}
							key={column.key}
						>
							{column.label}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody
					items={data ?? []}
					isLoading={isFetching}
					loadingState={isFetching ? "loading" : "idle"}
					loadingContent={<Spinner label="Loading..." />}
					emptyContent={
						data && data.length == 0 ? "No torrents found" : " "
					}
				>
					{(item): JSX.Element => (
						<TableRow key={item.name + item.infoHash}>
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
