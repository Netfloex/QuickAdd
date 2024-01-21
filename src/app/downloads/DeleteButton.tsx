import { Button } from "@nextui-org/button"
import { Checkbox } from "@nextui-org/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover"
import { Selection } from "@nextui-org/table"
import { useCallback } from "react"
import { MdDelete } from "react-icons/md"

import { trpc } from "@utils/trpc"

import type { FC } from "react"

export const DeleteButton: FC<{
	selectedKeys: Selection
}> = ({ selectedKeys }) => {
	const { isFetching, refetch } = trpc.activeTorrents.useQuery()

	const refresh = useCallback(() => {
		refetch()
	}, [refetch])

	return (
		<>
			<Popover placement="bottom">
				<PopoverTrigger>
					<Button
						color="danger"
						startContent={<MdDelete size={20} />}
						isDisabled={
							selectedKeys !== "all" && selectedKeys.size === 0
						}
					>
						Delete
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					{(titleProps) => (
						<div className="p-4">
							<h3
								className="text-lg font-bold mb-3"
								{...titleProps}
							>
								Are you sure you want to delete{" "}
								{selectedKeys === "all"
									? "all"
									: selectedKeys.size}{" "}
								torrents?
							</h3>
							<div>
								<Checkbox color="default">
									Also permanently delete the files
								</Checkbox>
								<div className="flex justify-end space-x-2 mt-4">
									<Button
										onClick={refresh}
										isLoading={isFetching}
										color="danger"
									>
										Delete
									</Button>
								</div>
							</div>
						</div>
					)}
				</PopoverContent>
			</Popover>
		</>
	)
}
