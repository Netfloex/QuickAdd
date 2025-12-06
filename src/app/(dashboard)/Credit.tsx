import Link from "next/link"

import { User } from "@heroui/user"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

type CastOrCrew =
	| MovieSearchResult["credits"]["cast"]
	| MovieSearchResult["credits"]["crew"]

export const Credit: FC<{ credit: CastOrCrew; title: string }> = ({
	credit,
	title,
}) => (
		<>
			<h3 className="font-semibold text-lg">{title}</h3>
			<div className="flex overflow-scroll">
				<div className="flex gap-3 min-w-max">
					{credit.map((e) => (
						<Link
							href={`https://www.themoviedb.org/person/${e.tmdbId}`}
							key={e.creditId}
							target="_blank"
						>
							<User
								avatarProps={{
									src: e.headshotUrl ?? undefined,
									name: "",
									className: "w-20 h-20 text-large",
								}}
								description={
									"character" in e ? e.character : e.job
								}
								name={e.name}
							/>
						</Link>
					))}
				</div>
			</div>
		</>
	)
