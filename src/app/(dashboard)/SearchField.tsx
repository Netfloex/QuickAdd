import { Input } from "@nextui-org/input"
import { FaSearch } from "react-icons/fa"

import type { FC } from "react"

export const SearchField: FC<{
	defaultQuery: string
	onValueChange?: (val: string) => void
}> = ({ onValueChange, defaultQuery }) => {
	return (
		<>
			<Input
				placeholder="Enter a movie to search..."
				isClearable
				defaultValue={defaultQuery}
				onValueChange={onValueChange}
				startContent={
					<FaSearch className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
				}
			/>
		</>
	)
}
