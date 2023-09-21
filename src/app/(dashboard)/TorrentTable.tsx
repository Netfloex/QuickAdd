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
import { useAsyncList } from "@react-stately/data"
import { useCallback, useMemo, useState } from "react"
import { trpc } from "src/utils/trpc"

import { MovieSearchResult } from "@schemas/MovieSearchResult"
import { Torrent } from "@schemas/Torrent"

import type { FC } from "react"

export const TorrentTable: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: "seeders",
		direction: "descending",
	})

	const { data, refetch, isFetching } = trpc.searchTorrents.useQuery(
		{
			id: movie.id,
			sortOptions: {
				order:
					sortDescriptor.direction == "ascending"
						? "ASCENDING"
						: "DESCENDING",
				sort: sortDescriptor.column
					?.toString()
					.toUpperCase() as "SEEDERS",
			},
		},
		{},
	)

	const columns = useMemo(
		() => [
			{
				key: "name",
				label: "NAME",
			},
			{
				key: "seeders",
				label: "Seeders",
			},
			{
				key: "leechers",
				label: "Leechers",
			},
			{
				key: "size",
				label: "Size",
			},
			{
				key: "provider",
				label: "Provider",
			},
		],
		[],
	)

	const torrents = useAsyncList<Torrent, string>({
		initialSortDescriptor: sortDescriptor,
		async load() {
			const torrents = await refetch()
			console.log(torrents)

			return {
				items:
					torrents.data?.map(
						(torrent) =>
							({
								...torrent,
								added: new Date(torrent.added),
							}) satisfies Torrent,
					) ?? [],
			}
		},
	})

	const sort = useCallback(
		(desc: SortDescriptor) => {
			setSortDescriptor(desc)
			torrents.sort(desc)
		},
		[torrents],
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
					items={isFetching ? [] : torrents.items}
					isLoading={isFetching}
					loadingContent={<Spinner label="Loading..." />}
					emptyContent={
						data && data.length == 0 ? "No torrents found" : " "
					}
				>
					{(item): JSX.Element => (
						<TableRow key={item.name + item.infoHash}>
							{(columnKey): JSX.Element => (
								<TableCell>
									{getKeyValue(item, columnKey)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	)
}
