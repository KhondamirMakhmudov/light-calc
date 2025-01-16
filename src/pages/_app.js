import { useState } from "react";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
// import { ResponseProvider } from "@/context/responseProvider";

import NextNProgress from "nextjs-progressbar";
import reactQueryClient from "@/config/react-query";

import "@/styles/globals.css";

export default function App({ Component, pageProps: { ...pageProps } }) {
  const [queryClient] = useState(() => reactQueryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        <NextNProgress />

        <Component {...pageProps} />

        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </Hydrate>
    </QueryClientProvider>
  );
}
