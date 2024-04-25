import { Web3AuthOptions } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES } from "@web3auth/base";

// MUI

export const WEB3AUTH_CLIENT_ID =
  process.env.WEB3AUTH_CLIENT_ID ||
  "BMbSVBV2JZ3iCPnDtrt2YMspbNCkbo7J_R1ppo-f1DwU1Byf-ibWaq86S-Xb5CYC_e94RnJ-oPBGsQxObWoqMdM";
export const WEB3AUTH_NETWORK = process.env.WEB3AUTH_NETWORK || "testnet";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1f5",
  rpcTarget: "https://columbus.camino.network/ext/bc/C/rpc",
  blockExplorerUrl: "https://explorer.camino.foundation/",
  displayName: "Columbus",
  tickerName: "Camino",
  ticker: "CAM",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig },
});

const defaultWeb3AuthConfig: Web3AuthOptions = {
  clientId: WEB3AUTH_CLIENT_ID,
  web3AuthNetwork: "testnet",
  useCoreKitKey: false,
  chainConfig: chainConfig,
  privateKeyProvider: privateKeyProvider,
};

export const config = {
  WEB3AUTH_CLIENT_ID: WEB3AUTH_CLIENT_ID,
  WEB3AUTH_NETWORK: WEB3AUTH_NETWORK,
  defaultWeb3AuthConfig: defaultWeb3AuthConfig,
  chainConfig: chainConfig,
};
