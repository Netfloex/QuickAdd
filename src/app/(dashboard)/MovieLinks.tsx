import Image from "next/image"
import { FaImdb, FaYoutube } from "react-icons/fa"
import { MdMoreVert } from "react-icons/md"
import { SiRottentomatoes } from "react-icons/si"

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

export const MovieLinks: FC<{ movie: MovieSearchResult }> = ({ movie }) => (
	<Dropdown placement="right">
		<DropdownTrigger>
			<span className="p-2">
				<MdMoreVert size={24} />
			</span>
		</DropdownTrigger>
		<DropdownMenu>
			<DropdownSection aria-label="Links" title="Links">
				<DropdownItem
					href={`https://imdb.com/title/${movie.imdbId}`}
					key="imdb"
					startContent={<FaImdb color="#f1c117" />}
					target="_blank"
				>
					<Link as="span" isExternal showAnchorIcon>
						IMDB
					</Link>
				</DropdownItem>
				<DropdownItem
					href={`https://themoviedb.org/movie/${movie.tmdbId}`}
					key="tmdb"
					startContent={
						<Image
							alt="M"
							height="16"
							src="https://www.themoviedb.org/favicon.ico"
							unoptimized
							width="16"
						/>
					}
					target="_blank"
				>
					<Link as="span" isExternal showAnchorIcon>
						TMDB
					</Link>
				</DropdownItem>
				<DropdownItem
					href={`https://www.youtube.com/watch?v=${movie.youtubeTrailerId}`}
					key="youtube"
					startContent={<FaYoutube color="#ff0000" />}
					target="_blank"
				>
					<Link as="span" isExternal showAnchorIcon>
						YouTube
					</Link>
				</DropdownItem>
				<DropdownItem
					href={`https://duckduckgo.com/?q=\\site:www.rottentomatoes.com+${movie.title}+${movie.year}`}
					key="rottentomatoes"
					rel="noopener noreferrer"
					startContent={<SiRottentomatoes color="#f93109" />}
					target="_blank"
				>
					<Link as="span" isExternal showAnchorIcon>
						Rotten Tomatoes
					</Link>
				</DropdownItem>
			</DropdownSection>
		</DropdownMenu>
	</Dropdown>
)
