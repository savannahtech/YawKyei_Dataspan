import React from "react";
import AppProvider from "@/lib/context";
import { ReactQueryClientProvider } from "./react-query-client-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryClientProvider>
      <AppProvider>{children}</AppProvider>
    </ReactQueryClientProvider>
  );
};

export default Providers;
