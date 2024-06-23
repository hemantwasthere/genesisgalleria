import "@/styles/globals.css";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import type { AppProps } from "next/app";
import {
  StarknetConfig,
  alchemyProvider,
  argent,
  braavos,
  infuraProvider,
  publicProvider,
  useInjectedConnectors,
  useProvider,
} from '@starknet-react/core'
import { sepolia } from "@starknet-react/chains";
export default function App({ Component, pageProps }: AppProps) {
  const cssOverrides = `
    .dynamic-widget-inline-controls {
      justify-content: end;
      background: transparent;
    }
`;
  const provider=publicProvider();
  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [argent(), braavos()],
    // Hide recommended connectors if the user has any connector installed.
    includeRecommended: 'onlyIfNoConnectors',
    // Randomize the order of the connectors.
    order: 'random',
  }) 
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_ENVIRONMENT_ID!,
        walletConnectors: [StarknetWalletConnectors],
        cssOverrides: cssOverrides,
        enableConnectOnlyFallback: true,
      }}
    >
      <StarknetConfig
        chains={[sepolia]}
        provider={provider}
        connectors={connectors}
      >
        <Component {...pageProps} />
      </StarknetConfig>
    </DynamicContextProvider>
  );
}
