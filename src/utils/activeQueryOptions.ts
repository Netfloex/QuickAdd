// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const activeQueryOptions = (seconds: number) => {
	return {
		staleTime: seconds,
		refetchOnWindowFocus: true,
		refetchInterval: seconds * 1000,
	} as const
}
