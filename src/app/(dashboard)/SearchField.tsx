import { Input } from "@nextui-org/input"
import { FaSearch } from "react-icons/fa"

import type { Dispatch, FC, SetStateAction } from "react"

export const SearchField: FC<{
	query: string
	onValueChange: Dispatch<SetStateAction<string>>
}> = ({ onValueChange, query }) => {
	return (
		<>
			<Input
				placeholder="Enter a movie to search..."
				isClearable
				value={query}
				onValueChange={onValueChange}
				startContent={
					<FaSearch className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
				}
			/>
		</>
	)
}
