import { Button } from "@nextui-org/button"
import { CircularProgress } from "@nextui-org/progress"
import { useCallback } from "react"
import { FaCheck, FaDownload } from "react-icons/fa"
import { MdErrorOutline } from "react-icons/md"

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
	const { mutateAsync, isLoading, isError, data } =
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
				<Button isIconOnly color="success" variant="bordered" disabled>
					<FaCheck />
				</Button>
			)
		}

		return (
			<CircularProgress
				value={activeTorrent.progress * 100}
				showValueLabel
				title={`Downloading ${formatBytes(
					activeTorrent.downloaded,
				)} / ${formatBytes(activeTorrent.size)}`}
			/>
		)
	}

	if (data === true) {
		return (
			<CircularProgress
				value={0}
				showValueLabel
				title={`Downloading ${formatBytes(0)} / ${formatBytes(
					torrent.size,
				)}`}
			/>
		)
	}

	return (
		<>
			<Button
				isIconOnly
				color={isError ? "danger" : "default"}
				variant="bordered"
				onPress={downloadMovie}
				isLoading={isLoading}
			>
				{!isLoading &&
					(isError ? <MdErrorOutline size={25} /> : <FaDownload />)}
			</Button>
		</>
	)
}
