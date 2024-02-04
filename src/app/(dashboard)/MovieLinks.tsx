import { Button } from "@nextui-org/button"
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
} from "@nextui-org/dropdown"
import { Link } from "@nextui-org/link"
import Image from "next/image"
import { FaImdb, FaYoutube } from "react-icons/fa"
import { MdMoreVert } from "react-icons/md"

import { MovieSearchResult } from "@schemas/MovieSearchResult"

import type { FC } from "react"

export const MovieLinks: FC<{ movie: MovieSearchResult }> = ({ movie }) => {
	return (
		<Dropdown placement="right">
			<DropdownTrigger>
				<Button isIconOnly variant="flat" className="bg-inherit">
					<MdMoreVert size={24} />
				</Button>
			</DropdownTrigger>
			<DropdownMenu>
				<DropdownSection title="Links" aria-label="Links">
					<DropdownItem startContent={<FaImdb color="#f1c117" />}>
						<Link
							href={`https://imdb.com/title/${movie.imdbId}`}
							isExternal
							showAnchorIcon
						>
							IMDB
						</Link>
					</DropdownItem>
					<DropdownItem
						startContent={
							<Image
								src="https://www.themoviedb.org/favicon.ico"
								width="16"
								height="16"
								unoptimized
								alt="M"
							/>
						}
					>
						<Link
							href={`https://themoviedb.org/movie/${movie.tmdbId}`}
							isExternal
							showAnchorIcon
						>
							TMDB
						</Link>
					</DropdownItem>
					<DropdownItem startContent={<FaYoutube color="#ff0000" />}>
						<Link
							href={`https://www.youtube.com/watch?v=${movie.youtubeTrailerId}`}
							isExternal
							showAnchorIcon
						>
							YouTube
						</Link>
					</DropdownItem>
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	)
}
