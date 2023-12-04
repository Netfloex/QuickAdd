import { Button } from "@nextui-org/button"
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/modal"
import { TorrentTable } from "src/app/(dashboard)/TorrentTable"

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
					{(onClose): JSX.Element => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								{movie.title} ({movie.year})
							</ModalHeader>
							<ModalBody>
								{isOpen && <TorrentTable movie={movie} />}
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={onClose}
								>
									Close
								</Button>
								<Button color="primary" onPress={onClose}>
									Action
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
