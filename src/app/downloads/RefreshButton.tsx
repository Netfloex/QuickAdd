import { Button } from "@nextui-org/button"
import { useCallback } from "react"
import { MdRefresh } from "react-icons/md"

import { trpc } from "@utils/trpc"

import type { FC } from "react"

export const RefreshButton: FC = () => {
	const { isFetching, refetch } = trpc.activeTorrents.useQuery()

	const refresh = useCallback(() => {
		refetch()
	}, [refetch])

	return (
		<>
			<Button
				isLoading={isFetching}
				onClick={refresh}
				startContent={!isFetching && <MdRefresh size={20} />}
			>
				Refresh
			</Button>
		</>
	)
}
