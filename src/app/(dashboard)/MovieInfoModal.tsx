import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal"
import { Tab, Tabs } from "@nextui-org/tabs"
import { MovieInformation } from "src/app/(dashboard)/MovieInformation"

import { formatMovie } from "@utils/formatMovie"

import { TorrentTable } from "./TorrentTable"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

export const MovieInfoModal: FC<{
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
					<ModalHeader className="flex flex-col gap-1">
						{formatMovie(movie)}
					</ModalHeader>
					<ModalBody>
						{isOpen && (
							<Tabs>
								<Tab title="Information">
									<MovieInformation movie={movie} />
								</Tab>
								<Tab title="Torrents">
									<TorrentTable movie={movie} />
								</Tab>
							</Tabs>
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}
