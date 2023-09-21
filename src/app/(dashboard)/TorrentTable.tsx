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
import { trpc } from "src/utils/trpc"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

export const TorrentTable: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	const { data, isLoading } = trpc.searchTorrents.useQuery({
		id: movie.id,
	})

	const columns = [
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
	]
	return (
		<>
			<Table>
				<TableHeader columns={columns}>
					{(column): JSX.Element => (
						<TableColumn key={column.key}>
							{column.label}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody
					items={data ?? []}
					isLoading={isLoading}
					loadingContent={<Spinner label="Loading..." />}
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
