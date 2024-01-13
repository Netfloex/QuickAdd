import { Button } from "@nextui-org/button"
import { CircularProgress } from "@nextui-org/progress"
import { FaCheck, FaDownload } from "react-icons/fa"
import { MdErrorOutline } from "react-icons/md"

import { useActiveTorrent } from "@hooks/useActiveTorrent"

import { formatBytes } from "@utils/formatBytes"
import { trpc } from "@utils/trpc"

import { Torrent } from "@schemas/Torrent"

import type { FC } from "react"

export const DownloadButton: FC<{ torrent: Torrent }> = ({ torrent }) => {
	const { mutateAsync, isLoading, data } = trpc.downloadTorrent.useMutation()

	const activeTorrent = useActiveTorrent(torrent.infoHash)
	const trpcUtils = trpc.useUtils()

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
				color={data === false ? "danger" : "default"}
				variant="bordered"
				onPress={(): void => {
					mutateAsync(torrent.magnet).then(() => {
						trpcUtils.activeTorrentsCount.invalidate()
						trpcUtils.activeTorrents.invalidate()
					})
				}}
				isLoading={isLoading}
			>
				{!isLoading &&
					(data === false ? (
						<MdErrorOutline size={25} />
					) : (
						<FaDownload />
					))}
			</Button>
		</>
	)
}
