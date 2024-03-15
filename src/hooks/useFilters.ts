import { Key } from "react"
import SuperJSON from "superjson"
import useLocalStorageState from "use-local-storage-state"

type SelectedKeys = Set<Key> | "all"
interface ReturnType {
	get: () => SelectedKeys
	set: (set: SelectedKeys) => void
}

export const useFilters = (): [
	(filterKey: string) => ReturnType,
	Map<string, SelectedKeys>,
] => {
	const [filters, setFilters] = useLocalStorageState<
		Map<string, SelectedKeys>
	>("filters", {
		defaultValue: new Map(),
		serializer: SuperJSON,
	})

	return [
		(filterKey: string): ReturnType => ({
			get: (): SelectedKeys => {
				if (!filters.has(filterKey)) {
					filters.set(filterKey, "all")
				}

				return filters.get(filterKey)!
			},
			set: (set: SelectedKeys): void =>
				setFilters((f) => new Map(f).set(filterKey, set)),
		}),
		filters,
	]
}
