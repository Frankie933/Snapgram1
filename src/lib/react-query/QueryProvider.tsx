
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {ReactNode} from 'react'



const queryCient = new QueryClient();

export const QueryProvider = ({children}: {children: ReactNode}) => {
  return (

    <QueryClientProvider client={queryCient}>
        {children}
       {/* // <ReactQueryDevtools initialIsOpen={false} /> */}

    </QueryClientProvider>
  )
}

