"use client"

import { useEffect, useRef } from "react"
import { FaSearch } from "react-icons/fa"

import { Input } from "@heroui/input"

import { DownloadsLink } from "./DownloadsLink"

import type { FC } from "react"

export const SearchField: FC<{
	defaultQuery: string
	onValueChange?: (val: string) => void
}> = ({ onValueChange, defaultQuery }) => {
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const listener = (e: KeyboardEvent): void => {
			if (e.target instanceof HTMLInputElement) return

			if (e.key.match(/^(\w|Backspace)$/) && !e.ctrlKey && !e.metaKey) {
				e.preventDefault()
				inputRef.current?.focus()
				inputRef.current?.scrollTo({ top: 0, behavior: "smooth" })
			}
		}

		addEventListener("keydown", listener)

		return (): void => {
			removeEventListener("keydown", listener)
		}
	}, [])

	return (
		<div className="flex gap-2">
			<Input
				placeholder="Enter a movie to search..."
				isClearable
				autoFocus
				defaultValue={defaultQuery}
				onValueChange={onValueChange}
				ref={inputRef}
				startContent={
					<FaSearch className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
				}
			/>
			<DownloadsLink />
		</div>
	)
}
