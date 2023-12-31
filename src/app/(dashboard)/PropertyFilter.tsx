import { Button } from "@nextui-org/button"
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/dropdown"
import { useMemo } from "react"

interface Item {
	label: string
	key: string
}

export const PropertyFilter = <T extends string>({
	items,
	type,
	selectedKeys,
	setSelectedKeys,
}: {
	items: Item[]
	type: string
	selectedKeys: Set<T>
	setSelectedKeys: (set: Set<T>) => void
}): JSX.Element => {
	const selectedValue = useMemo(() => {
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
					onSelectionChange={(keys): void =>
						setSelectedKeys(
							(typeof keys == "string"
								? new Set()
								: keys) as Set<T>,
						)
					}
					items={items}
				>
					{(item): JSX.Element => (
						<DropdownItem>{(item as Item).label}</DropdownItem>
					)}
				</DropdownMenu>
			</Dropdown>
		</>
	)
}
