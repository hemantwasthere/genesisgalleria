import "@/styles/globals.css";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const cssOverrides = `
    .dynamic-widget-inline-controls {
      justify-content: end;
      background: transparent;
    }
`;

  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_ENVIRONMENT_ID!,
        walletConnectors: [EthereumWalletConnectors],
        cssOverrides: cssOverrides,
      }}
    >
      <Component {...pageProps} />
    </DynamicContextProvider>
  );
}
