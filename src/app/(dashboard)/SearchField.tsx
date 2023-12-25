import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import Link from "next/link"
import { FaSearch } from "react-icons/fa"
import { MdDownload } from "react-icons/md"

import type { FC } from "react"

export const SearchField: FC<{
	defaultQuery: string
	onValueChange?: (val: string) => void
}> = ({ onValueChange, defaultQuery }) => {
	return (
		<div className="flex gap-2">
			<Input
				placeholder="Enter a movie to search..."
				isClearable
				defaultValue={defaultQuery}
				onValueChange={onValueChange}
				startContent={
					<FaSearch className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
				}
			/>
			<div className="aspect-square">
				<Link href="/downloads">
					<Button isIconOnly className="w-full h-full">
						<MdDownload size="25" />
					</Button>
				</Link>
			</div>
		</div>
	)
}
