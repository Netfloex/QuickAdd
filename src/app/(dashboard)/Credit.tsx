import { User } from "@nextui-org/user"
import Link from "next/link"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

type CastOrCrew =
	| MovieSearchResult["credits"]["cast"]
	| MovieSearchResult["credits"]["crew"]

export const Credit: FC<{ credit: CastOrCrew; title: string }> = ({
	credit,
	title,
}) => {
	return (
		<>
			<h3 className="font-semibold text-lg">{title}</h3>
			<div className="flex overflow-scroll">
				<div className="flex gap-3 min-w-max">
					{credit.map((e) => (
						<Link
							key={e.creditId}
							href={`https://www.themoviedb.org/person/${e.tmdbId}`}
							target="_blank"
						>
							<User
								name={e.name}
								description={
									"character" in e ? e.character : e.job
								}
								avatarProps={{
									src: e.headshotUrl ?? undefined,
									name: "",
									className: "w-20 h-20 text-large",
								}}
							/>
						</Link>
					))}
				</div>
			</div>
		</>
	)
}
