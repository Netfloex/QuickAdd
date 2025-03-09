import { Fragment, JSX, useCallback, useMemo, useState } from "react"
import { FaMagnet } from "react-icons/fa"

import { Button } from "@heroui/button"
import { Chip } from "@heroui/chip"
import { Spinner } from "@heroui/spinner"
import {
	getKeyValue,
	SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/table"

import { useFilters } from "@hooks/useFilters"

import { fixQualityName } from "@utils/fixQualityName"
import { formatBytes } from "@utils/formatBytes"
import { trpc } from "@utils/trpc"

import { ErrorCard } from "@components/ErrorCard"
import { PeersChip } from "@components/PeersChip"

import { DownloadButton } from "./DownloadButton"
import { PropertyFilter } from "./PropertyFilter"
import { ProviderErrors } from "./ProviderErrors"

import { MovieSearchResult } from "@schemas/MovieSearchResult"
import { Torrent } from "@schemas/Torrent"

import type { FC } from "react"

type Key = string | number

export const TorrentTable: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	const {
		data: availableSearchFilters,
		error: searchFiltersError,
		isLoading: searchFiltersLoading,
	} = trpc.searchFilters.useQuery()

	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: "seeders",
		direction: "descending",
	})

	const sort = useCallback((desc: SortDescriptor) => {
		setSortDescriptor(desc)
	}, [])

	const renderCell = useCallback(
		(torrent: Torrent, key: Key): JSX.Element => {
			switch (key) {
				case "size":
					return <Chip>{formatBytes(torrent.size)}</Chip>
				case "seeders":
					return (
						<PeersChip
							seeders={torrent.seeders}
							leechers={torrent.leechers}
						/>
					)
				case "added":
					return <span>{torrent.added.toLocaleDateString()}</span>
				case "quality":
					return (
						<span>
							{fixQualityName(torrent.movieProperties.quality)}
						</span>
					)
				case "codec":
				case "source":
					return <span>{torrent.movieProperties[key]}</span>
				case "magnet":
					return (
						<a
							href={torrent.magnet}
							target="_blank"
							rel="noreferrer"
						>
							<Button
								isIconOnly
								color="primary"
								variant="bordered"
							>
								<FaMagnet />
							</Button>
						</a>
					)
				case "download":
					return <DownloadButton torrent={torrent} movie={movie} />
				case "provider":
					return (
						<div className="flex flex-col items-center gap-1">
							{torrent.provider.map((p) => (
								<Fragment key={p}>
									<Chip className="capitalize">
										{p.toLowerCase()}
									</Chip>
								</Fragment>
							))}
						</div>
					)
				default:
					return <span>{getKeyValue(torrent, key)}</span>
			}
		},
		[movie],
	)
	const [filters, filterMap] = useFilters()

	const filterProps: Record<
		string,
		{
			values: string[]
			display: string
			typeName: string
		}
	> = useMemo(() => {
		const obj: Record<
			string,
			{
				values: string[]
				display: string
				typeName: string
			}
		> = {}

		filterMap.forEach((v, k) => {
			if (v == "all") return

			const filter = availableSearchFilters?.find((f) => f.name == k)

			if (filter == null) return

			obj[k] = {
				values: Array.from(v).map((e) => e.toString()),
				display: filter.display,
				typeName: filter.typeName,
			}
		})

		return obj
	}, [availableSearchFilters, filterMap])

	const { data, isFetching, error, isError } = trpc.searchTorrents.useQuery(
		{
			imdb: movie.imdbId!,
			sortOptions: {
				order:
					sortDescriptor.direction == "ascending"
						? "ASCENDING"
						: "DESCENDING",
				sort: sortDescriptor.column
					?.toString()
					.toUpperCase() as "SEEDERS",
			},
			movieFilterProps: filterProps,
		},
		{ enabled: movie.imdbId != null },
	)

	if (movie.imdbId == null) {
		return <ErrorCard error={new Error("No IMDB ID found")} />
	}

	return (
		<>
			{data && data.errors.length !== 0 && (
				<ProviderErrors errors={data.errors} />
			)}

			<div className="mb-6">
				<span className="font-light text-xs">Filters:</span>
				<div className="flex gap-3 items-end">
					{searchFiltersLoading ? (
						<Button variant="bordered" isLoading>
							Loading filters
						</Button>
					) : searchFiltersError ? (
						<ErrorCard error={searchFiltersError} />
					) : (
						availableSearchFilters?.map((filter) => (
							<PropertyFilter
								key={filter.name}
								type={filter.display}
								items={filter.values.map((v) => ({
									label: v.display,
									key: v.name,
								}))}
								selectedKeys={filters(filter.name).get()}
								setSelectedKeys={filters(filter.name).set}
							/>
						))
					)}
				</div>
			</div>
			<Table
				removeWrapper
				sortDescriptor={sortDescriptor}
				onSortChange={sort}
				isStriped
			>
				<TableHeader>
					<TableColumn key="name">Title</TableColumn>
					<TableColumn key="magnet">Magnet</TableColumn>
					<TableColumn key="download">Download</TableColumn>
					<TableColumn key="quality">Quality</TableColumn>
					<TableColumn key="codec">Codec</TableColumn>
					<TableColumn key="source">Source</TableColumn>
					<TableColumn allowsSorting key="seeders">
						Peers
					</TableColumn>
					<TableColumn allowsSorting key="size">
						Size
					</TableColumn>
					<TableColumn key="provider">Provider</TableColumn>
					<TableColumn allowsSorting key="added">
						Added
					</TableColumn>
				</TableHeader>
				<TableBody
					items={data?.torrents ?? []}
					isLoading={isFetching}
					loadingState={isFetching ? "loading" : "idle"}
					loadingContent={<Spinner label="Loading..." />}
					emptyContent={
						data && data.torrents.length == 0 ? (
							"No torrents found"
						) : isError ? (
							<ErrorCard error={error} />
						) : (
							" "
						)
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
