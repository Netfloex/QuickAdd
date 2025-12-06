export const activeQueryOptions = (seconds: number) =>
	({
		staleTime: seconds,
		refetchOnWindowFocus: true,
		refetchInterval: seconds * 1000,
	}) as const
