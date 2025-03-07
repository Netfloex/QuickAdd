import Image from "next/image"
import { FaImdb, FaYoutube } from "react-icons/fa"
import { MdMoreVert } from "react-icons/md"
import { SiRottentomatoes } from "react-icons/si"

import { Button } from "@heroui/button"
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
} from "@heroui/dropdown"
import { Link } from "@heroui/link"

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
					<DropdownItem
						key="imdb"
						startContent={<FaImdb color="#f1c117" />}
						href={`https://imdb.com/title/${movie.imdbId}`}
						target="_blank"
					>
						<Link isExternal showAnchorIcon>
							IMDB
						</Link>
					</DropdownItem>
					<DropdownItem
						key="tmdb"
						startContent={
							<Image
								src="https://www.themoviedb.org/favicon.ico"
								width="16"
								height="16"
								unoptimized
								alt="M"
							/>
						}
						href={`https://themoviedb.org/movie/${movie.tmdbId}`}
						target="_blank"
					>
						<Link isExternal showAnchorIcon>
							TMDB
						</Link>
					</DropdownItem>
					<DropdownItem
						key="youtube"
						startContent={<FaYoutube color="#ff0000" />}
						href={`https://www.youtube.com/watch?v=${movie.youtubeTrailerId}`}
						target="_blank"
					>
						<Link isExternal showAnchorIcon>
							YouTube
						</Link>
					</DropdownItem>
					<DropdownItem
						key="rottentomatoes"
						startContent={<SiRottentomatoes color="#f93109" />}
						href={`https://duckduckgo.com/?q=\\site:www.rottentomatoes.com+${movie.title}+${movie.year}`}
						rel="noopener noreferrer"
						target="_blank"
					>
						<Link isExternal showAnchorIcon>
							Rotten Tomatoes
						</Link>
					</DropdownItem>
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	)
}
