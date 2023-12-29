// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const activeQueryOptions = () => {
	return {
		staleTime: 10,
		refetchOnWindowFocus: true,
		refetchInterval: 10_000,
	} as const
}
