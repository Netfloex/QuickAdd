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
import { PropertyFilter } from "src/app/(dashboard)/PropertyFilter"
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

	const qualityItems = useMemo(
		() => [
			{ key: "P480", label: "480p" },
			{ key: "P540", label: "540p" },
			{ key: "P576", label: "576p" },
			{ key: "P720", label: "720p" },
			{ key: "P1080", label: "1080p" },
			{ key: "P2160", label: "2160p" },
		],
		[],
	)
	const codecItems = useMemo(
		() => [
			{ key: "X264", label: "X264" },
			{ key: "X265", label: "X265" },
		],
		[],
	)
	const sourceItems = useMemo(
		() => [
			{ label: "Cam", key: "Cam" },
			{ label: "Telesync", key: "Telesync" },
			{ label: "Telecine", key: "Telecine" },
			{ label: "Dvd", key: "Dvd" },
			{ label: "Hdtv", key: "Hdtv" },
			{ label: "Hdrip", key: "Hdrip" },
			{ label: "WebRip", key: "WebRip" },
			{ label: "BluRay", key: "BluRay" },
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

	const [qualityFilters, setQualityFilters] = useState<Set<Key>>(
		new Set(qualityItems.map((q) => q.key)),
	)
	const [codecFilters, setCodecFilters] = useState<Set<Key>>(
		new Set(codecItems.map((q) => q.key)),
	)
	const [sourceFilters, setSourceFilters] = useState<Set<Key>>(
		new Set(sourceItems.map((q) => q.key)),
	)

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

	return (
		<>
			<div className="flex gap-3 items-end">
				<PropertyFilter
					type="Quality"
					items={qualityItems}
					selectedKeys={qualityFilters}
					setSelectedKeys={setQualityFilters}
				/>
				<PropertyFilter
					type="Codec"
					items={codecItems}
					selectedKeys={codecFilters}
					setSelectedKeys={setCodecFilters}
				/>
				<PropertyFilter
					type="Source"
					items={sourceItems}
					selectedKeys={sourceFilters}
					setSelectedKeys={setSourceFilters}
				/>
			</div>
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
