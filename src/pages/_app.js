import { useState } from "react";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
// import { ResponseProvider } from "@/context/responseProvider";

import NextNProgress from "nextjs-progressbar";
import reactQueryClient from "@/config/react-query";

import "@/styles/globals.css";
import { RoomProvider } from "@/context/roomTypeProvider";
import { LightCalculatorProvider } from "@/context/responseProvider";

export default function App({ Component, pageProps: { ...pageProps } }) {
  const [queryClient] = useState(() => reactQueryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        <NextNProgress />

        <LightCalculatorProvider>
          <RoomProvider>
            <Component {...pageProps} />
          </RoomProvider>
        </LightCalculatorProvider>

        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </Hydrate>
    </QueryClientProvider>
  );
}
