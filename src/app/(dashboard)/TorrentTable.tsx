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
import { CODECS, QUALITIES, SOURCES } from "src/data/static_torrent_data"
import { fixQualityName } from "src/utils/fixQualityName"
import { formatBytes } from "src/utils/formatBytes"
import { trpc } from "src/utils/trpc"

import { usePropertyFilter } from "@hooks/usePropertyFilter"

import { PropertyFilter } from "./PropertyFilter"

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
		() =>
			QUALITIES.map((s) => ({
				label: fixQualityName(s),
				key: s.toUpperCase() as Uppercase<typeof s>,
			})),
		[],
	)
	const codecItems = useMemo(
		() =>
			CODECS.map((s) => ({
				label: s,
				key: s.toUpperCase() as Uppercase<typeof s>,
			})),
		[],
	)
	const sourceItems = useMemo(
		() =>
			SOURCES.map((s) => ({
				label: s,
				key: s.toUpperCase() as Uppercase<typeof s>,
			})),
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

	const [qualityFilters, setQualityFilters] = usePropertyFilter(
		"qualities",
		qualityItems.map((q) => q.key),
	)
	const [codecFilters, setCodecFilters] = usePropertyFilter(
		"codecs",
		codecItems.map((q) => q.key),
	)

	const [sourceFilters, setSourceFilters] = usePropertyFilter(
		"sources",
		sourceItems.map((q) => q.key),
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
		movieFilterProps: {
			codecs: Array.from(codecFilters),
			qualities: Array.from(qualityFilters),
			sources: Array.from(sourceFilters),
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
