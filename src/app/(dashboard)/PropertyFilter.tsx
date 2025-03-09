import { JSX, useMemo } from "react"

import { Button } from "@heroui/button"
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/dropdown"

interface Item {
	label: string
	key: string
}
type Key = string | number

type SelectedKeys = Set<Key> | "all"

export const PropertyFilter = ({
	items,
	type,
	selectedKeys,
	setSelectedKeys,
}: {
	items: Item[]
	type: string
	selectedKeys: SelectedKeys
	setSelectedKeys: (set: SelectedKeys) => void
}): JSX.Element => {
	const selectedValue = useMemo(() => {
		if (selectedKeys == "all") return "All"

		const arr = Array.from(selectedKeys)

		if (arr.length == items.length) return "All"

		return arr
			.map((key) => items.find((q) => q.key == key)?.label)
			.join(", ")
	}, [selectedKeys, items])

	return (
		<>
			<Dropdown>
				<DropdownTrigger>
					<Button variant="bordered">
						{type}: {selectedValue}
					</Button>
				</DropdownTrigger>
				<DropdownMenu
					aria-label={"Select " + type}
					variant="flat"
					closeOnSelect={false}
					disallowEmptySelection
					selectionMode="multiple"
					selectedKeys={selectedKeys}
					onSelectionChange={setSelectedKeys}
					items={items}
				>
					{(item): JSX.Element => (
						<DropdownItem key={item.key}>{item.label}</DropdownItem>
					)}
				</DropdownMenu>
			</Dropdown>
		</>
	)
}
