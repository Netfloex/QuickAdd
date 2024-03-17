"use client"

import { NextUIProvider } from "@nextui-org/system"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink, loggerLink, TRPCClientError } from "@trpc/client"
import superjson from "superjson"

import { useConstant } from "@hooks/useConstant"

import { trpc } from "@utils/trpc"

import { FCC } from "@typings/FCC"

export const Providers: FCC = ({ children }) => {
	const queryClient = useConstant(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						staleTime: Infinity,
						retry(failureCount, error): boolean {
							if (failureCount > 2) return false
							return !(
								error instanceof TRPCClientError && error.data
							)
						},
					},
				},
			}),
	)

	const trpcClient = useConstant(() =>
		trpc.createClient({
			links: [
				loggerLink({
					enabled: () => process.env.NODE_ENV === "development",
				}),
				httpBatchLink({
					url: "/api/trpc",
					transformer: superjson,
				}),
			],
		}),
	)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<NextUIProvider>{children}</NextUIProvider>
			</QueryClientProvider>
		</trpc.Provider>
	)
}
