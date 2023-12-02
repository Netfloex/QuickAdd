// import styles from "./DownloadButton.module.scss"

import { Button } from "@nextui-org/button"
import { FaCheck, FaDownload } from "react-icons/fa"
import { MdErrorOutline } from "react-icons/md"
import { trpc } from "src/utils/trpc"

import { Torrent } from "@schemas/Torrent"

import type { FC } from "react"

export const DownloadButton: FC<{ torrent: Torrent }> = ({ torrent }) => {
	const { mutate, isLoading, data } = trpc.downloadTorrent.useMutation({})

	console.log(data)
	const success = data === true
	return (
		<>
			<Button
				isIconOnly
				color={
					isLoading
						? "default"
						: data !== false
						  ? "success"
						  : "danger"
				}
				variant="bordered"
				onPress={(): void => {
					mutate(torrent.magnet)
				}}
				disabled={data}
				isLoading={isLoading}
			>
				{!isLoading &&
					(success ? (
						<FaCheck />
					) : data === undefined ? (
						<FaDownload />
					) : (
						<MdErrorOutline size={25} />
					))}
			</Button>
		</>
	)
}
