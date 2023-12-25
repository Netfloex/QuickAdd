import { Chip } from "@nextui-org/chip"

import type { FC } from "react"

export const PeersChip: FC<{ seeders: number; leechers: number }> = ({
	seeders,
	leechers,
}) => {
	let color:
		| "default"
		| "danger"
		| "primary"
		| "warning"
		| "secondary"
		| "success" = "danger"

	if (seeders > 200) {
		color = "success"
	} else if (seeders > 50) {
		color = "primary"
	} else if (seeders > 10) {
		color = "secondary"
	} else if (seeders > 0) {
		color = "warning"
	}

	return (
		<Chip color={color} variant="flat">
			{seeders}/{leechers}
		</Chip>
	)
}
