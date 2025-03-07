import { MdWarning } from "react-icons/md"

import { Card, CardBody, CardHeader } from "@heroui/card"

import { ProviderError } from "@schemas/ProviderError"

import type { FC } from "react"

export const ProviderErrors: FC<{ errors: ProviderError[] }> = ({ errors }) => (
	<div>
		<Card className="bg-yellow-700 flex row flex-row">
			<div className="flex items-center">
				<div className="flex items-center aspect-square">
					<MdWarning className="text-6xl text-white mx-6" />
				</div>
			</div>
			<div>
				<CardHeader>
					<h1 className="text-xl font-bold">
						Some providers had an error:
					</h1>
				</CardHeader>
				<CardBody>
					<ul>
						{errors.map((error) => (
							<li key={error.provider}>
								<span className="capitalize font-bold">
									{error.provider.toLowerCase()}:
								</span>{" "}
								{error.error}
							</li>
						))}
					</ul>
				</CardBody>
			</div>
		</Card>
	</div>
)
