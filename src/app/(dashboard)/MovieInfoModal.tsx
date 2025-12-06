import { MovieInformation } from "src/app/(dashboard)/MovieInformation"

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal"
import { Tab, Tabs } from "@heroui/tabs"

import { formatMovie } from "@utils/formatMovie"

import { TorrentTable } from "./TorrentTable"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

export const MovieInfoModal: FC<{
	isOpen: boolean
	onClose: () => void
	movie: MovieSearchResult
}> = ({ isOpen, onClose, movie }) => (
		<Modal
				isOpen={isOpen}
				onClose={onClose}
				placement="center"
				scrollBehavior="inside"
				size="full"
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
	)
