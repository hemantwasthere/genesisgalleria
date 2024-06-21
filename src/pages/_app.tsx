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
        environmentId: "9f1b28fe-df65-4ea8-a7f9-990379c8bbb1",
        walletConnectors: [EthereumWalletConnectors],
        cssOverrides: cssOverrides,
      }}
    >
      <Component {...pageProps} />
    </DynamicContextProvider>
  );
}
