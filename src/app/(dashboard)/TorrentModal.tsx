import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal"

import { formatMovie } from "@utils/formatMovie"

import { TorrentTable } from "./TorrentTable"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

export const TorrentModal: FC<{
	isOpen: boolean
	onClose: () => void
	movie: MovieSearchResult
}> = ({ isOpen, onClose, movie }) => {
	return (
		<>
			<Modal
				size="full"
				isOpen={isOpen}
				onClose={onClose}
				scrollBehavior="inside"
				placement="center"
			>
				<ModalContent>
					{(): JSX.Element => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								{formatMovie(movie)}
							</ModalHeader>
							<ModalBody>
								{isOpen && <TorrentTable movie={movie} />}
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
