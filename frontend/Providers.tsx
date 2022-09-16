import AsyncStorage from "@react-native-async-storage/async-storage";
import Moralis from "moralis/react-native";
import React from "react";
import { MoralisProvider } from "react-moralis";
import { enableViaWalletConnect } from "./Moralis/enableViaWalletConnect";
import Qrcode from "./Qrcode";
import WalletConnectProvider, {
  WalletConnectProviderProps,
} from "./WalletConnect";
//import { expo } from "../app.json";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

import { moralis } from "./configs/configs";
import { AppStateProvider } from "./providers/AppStateProvider";
import { CustomMoralisProvider } from "./providers/CustomMoralisProvider";
import { MoralisDappProvider } from "./providers/MoralisDappProvider";

interface ProvidersProps {
  readonly children: JSX.Element;
}

/**
 * Initialization of Moralis
 */
const appId = moralis.MORALIS_APP_ID;
const serverUrl = moralis.MORALIS_SERVER_URL;
const environment = "native";
// Initialize Moralis with AsyncStorage to support react-native storage
Moralis.setAsyncStorage(AsyncStorage);
// Replace the enable function to use the react-native WalletConnect
// @ts-ignore
Moralis.enable = enableViaWalletConnect;
// console.log(AsyncStorage.getAllKeys(), 'KEYS');

const walletConnectOptions: WalletConnectProviderProps = {
  storageOptions: {
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
  qrcodeModalOptions: {
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ],
  },
  // Uncomment to show a QR-code to connect a wallet
  renderQrcodeModal: Qrcode,
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <WalletConnectProvider {...walletConnectOptions}>
      <MoralisProvider
        appId={appId}
        serverUrl={serverUrl}
        environment={environment}>
        <MoralisDappProvider>
          <ApplicationProvider {...eva} theme={eva.light}>
            <AppStateProvider>
              <CustomMoralisProvider>{children}</CustomMoralisProvider>
            </AppStateProvider>
          </ApplicationProvider>
        </MoralisDappProvider>
      </MoralisProvider>
    </WalletConnectProvider>
  );
};
