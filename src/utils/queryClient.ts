import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

export { queryClient, QueryClientProvider, ReactQueryDevtools };
