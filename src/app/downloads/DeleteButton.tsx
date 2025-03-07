import { useCallback, useState } from "react"
import { MdDelete } from "react-icons/md"

import { Button } from "@heroui/button"
import { Checkbox } from "@heroui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover"
import { Selection } from "@heroui/table"

import { trpc } from "@utils/trpc"

import { ErrorCard } from "@components/ErrorCard"

import type { FC } from "react"

export const DeleteButton: FC<{
	selectedKeys: Selection
	setSelectedKeys: (selectedKeys: Selection) => void
}> = ({ selectedKeys, setSelectedKeys }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [deleteFiles, setDeleteFiles] = useState(false)

	const { mutateAsync, isPending, isError, error } =
		trpc.deleteTorrents.useMutation()

	const trpcUtils = trpc.useUtils()

	const deleteTorrents = useCallback(() => {
		mutateAsync({
			deleteFiles,
			hashes:
				selectedKeys === "all"
					? []
					: (Array.from(selectedKeys) as string[]),
		}).then(() => {
			trpcUtils.activeTorrentsCount.invalidate()
			trpcUtils.activeTorrents.invalidate()
			setSelectedKeys(new Set())
			setIsOpen(false)
		})
	}, [
		deleteFiles,
		mutateAsync,
		selectedKeys,
		setSelectedKeys,
		trpcUtils.activeTorrents,
		trpcUtils.activeTorrentsCount,
	])

	const keysCount = selectedKeys === "all" ? "all" : selectedKeys.size

	return (
		<>
			<Popover
				placement="bottom"
				isOpen={isError || isOpen}
				onOpenChange={(open) => setIsOpen(open)}
			>
				<PopoverTrigger>
					<Button
						color="danger"
						startContent={<MdDelete size={20} />}
						isDisabled={keysCount === 0}
					>
						Delete
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					{(titleProps) => {
						if (isError) {
							return <ErrorCard error={error} />
						}

						return (
							<div className="p-4">
								<h3
									className="text-lg font-bold mb-3"
									{...titleProps}
								>
									Are you sure you want to delete {keysCount}{" "}
									torrent{keysCount !== 1 && "s"}?
								</h3>
								<div>
									<Checkbox
										color="default"
										isSelected={deleteFiles}
										onValueChange={setDeleteFiles}
									>
										Also permanently delete the files
									</Checkbox>
									<div className="flex justify-end space-x-2 mt-4">
										<Button
											onClick={deleteTorrents}
											isLoading={isPending}
											color="danger"
										>
											Delete
										</Button>
									</div>
								</div>
							</div>
						)
					}}
				</PopoverContent>
			</Popover>
		</>
	)
}
