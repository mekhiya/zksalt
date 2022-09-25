import Header from "./header";
import Footer from "./footer";
import Head from "next/head";
//import Script from "next/script";
import { WagmiConfig, createClient } from "wagmi";
import { providers } from "ethers";

import networks from "../utils/networks.json";

// Provider that will be used when no wallet is connected (aka no signer)
const provider = providers.getDefaultProvider(
  networks[networks.selectedChain].rpcUrls[0]
);

const client = createClient({
  autoConnect: true,
  provider,
});

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <title>zkSalt</title>
        <meta name="title" content="zkSalt" />
        <meta name="description" content="Zero Knowledge Salt" />
        <meta name="theme-color" content="#ea580c" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://github.com/mekhiya/zkSalt" />
        <meta property="twitter:title" content="zkSalt" />
        <meta
          property="twitter:description"
          content="Zero Knowledge Salt"
        />

        <meta property="twitter:image" content="https://avatars.githubusercontent.com/u/8952786" />

      </Head>
      <WagmiConfig client={client}>
        <div className="flex flex-col min-h-screen px-2 bg-slate-900 text-slate-300">
          <Header />
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
      </WagmiConfig>
    </>
  );
}
