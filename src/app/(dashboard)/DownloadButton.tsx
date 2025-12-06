import { useCallback } from "react"
import { FaCheck, FaDownload } from "react-icons/fa"
import { MdErrorOutline } from "react-icons/md"

import { Button } from "@heroui/button"
import { CircularProgress } from "@heroui/progress"

import { useActiveTorrent } from "@hooks/useActiveTorrent"

import { formatBytes } from "@utils/formatBytes"
import { trpc } from "@utils/trpc"

import { MovieSearchResult } from "@schemas/MovieSearchResult"
import { Torrent } from "@schemas/Torrent"

import type { FC } from "react"

export const DownloadButton: FC<{
	torrent: Torrent
	movie: MovieSearchResult
}> = ({ torrent, movie }) => {
	const { mutateAsync, isPending, isError, data } =
		trpc.trackMovie.useMutation()

	const activeTorrent = useActiveTorrent(torrent.infoHash)
	const trpcUtils = trpc.useUtils()

	const downloadMovie = useCallback(() => {
		mutateAsync({
			url: torrent.magnet,
			tmdb: movie.tmdbId,
		}).then(() => {
			trpcUtils.activeTorrentsCount.invalidate()
			trpcUtils.activeTorrents.invalidate()
		})
	}, [
		movie.tmdbId,
		mutateAsync,
		torrent.magnet,
		trpcUtils.activeTorrents,
		trpcUtils.activeTorrentsCount,
	])

	if (activeTorrent !== undefined) {
		if (activeTorrent.progress === 1) {
			return (
				<Button color="success" disabled isIconOnly variant="bordered">
					<FaCheck />
				</Button>
			)
		}

		return (
			<CircularProgress
				showValueLabel
				title={`Downloading ${formatBytes(
					activeTorrent.downloaded,
				)} / ${formatBytes(activeTorrent.size)}`}
				value={activeTorrent.progress * 100}
			/>
		)
	}

	if (data === true) {
		return (
			<CircularProgress
				showValueLabel
				title={`Downloading ${formatBytes(0)} / ${formatBytes(
					torrent.size,
				)}`}
				value={0}
			/>
		)
	}

	const isRealError = isError || data === false

	return (
		<Button
				color={isRealError || data === false ? "danger" : "default"}
				isIconOnly
				isLoading={isPending}
				onPress={downloadMovie}
				variant="bordered"
			>
				{!isPending &&
					(isRealError ? (
						<MdErrorOutline size={25} />
					) : (
						<FaDownload />
					))}
			</Button>
	)
}
