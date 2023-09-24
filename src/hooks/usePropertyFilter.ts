import { useCallback, useMemo } from "react"
import useLocalStorageState from "use-local-storage-state"

export const usePropertyFilter = <T>(
	name: string,
	defaultValue: T[],
): [Set<T>, (set: Set<T>) => void] => {
	const [filtersArr, setFiltersArr] = useLocalStorageState<Array<T>>(name, {
		defaultValue,
	})

	const filters = useMemo(() => new Set(filtersArr), [filtersArr])

	const setFilters = useCallback(
		(set: Set<T>) => setFiltersArr(Array.from(set)),
		[setFiltersArr],
	)

	return [filters, setFilters]
}
