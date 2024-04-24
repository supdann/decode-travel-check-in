// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { Button, Stack } from "@mui/material";
// import { Web3Auth } from "@web3auth/modal";
// import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
// import { CHAIN_NAMESPACES } from "@web3auth/base";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// enum LoginProvider {
//   GOOGLE = "google",
//   FACEBOOK = "facebook",
//   METAMASK = "metamask",
//   JWT = "jwt",
// }

// const chainConfig = {
//   chainNamespace: CHAIN_NAMESPACES.EIP155,
//   chainId: "0x1f5",
//   rpcTarget: "https://columbus.camino.network/ext/bc/C/rpc",
//   blockExplorer: "https://explorer.camino.foundation/",
//   displayName: "Columbus",
//   tickerName: "Camino",
//   ticker: "CAM",
// };

// export const web3AuthConfig = {
//   clientId: import.meta.env.VITE_CLIENT_ID,
//   web3AuthNetwork: import.meta.env.VITE_AUTH_NETWORK ?? "testnet",
//   useCoreKitKey: false,
//   chainConfig,
// };

function App() {
  const navigate = useNavigate();
  // const [count, setCount] = useState(0);

  // const customNodeOptions = {
  //   rpcUrl: "https://columbus.camino.network/ext/bc/C/rpc",
  //   // chainId: 0,
  // };

  // const chainConfig = {
  //   chainNamespace: "eip155",
  //   chainId: "0x1f5",
  //   rpcTarget: "https://columbus.camino.network/ext/bc/C/rpc",
  //   // Avoid using public rpcTarget in production.
  //   // Use services like Infura, Quicknode etc
  //   displayName: "Columbus Test Network",
  //   blockExplorerUrl: "https://suite.camino.network/explorer/columbus/c-chain",
  //   ticker: "CAM",
  //   tickerName: "Camino",
  //   logo: "https://suite.camino.network/assets/LightModeLogo.svg",
  // };

  // This configuration will map addresses in line with Magic's 'mainnet' setup.

  const generateRandomWallet = async () => {
    const wallet = ethers.Wallet.createRandom();
    console.log(wallet);

    // const privateKeyProvider = new EthereumPrivateKeyProvider({
    //   config: { chainConfig: chainConfig }
    // });

    // const web3auth = new Web3Auth({
    //   clientId,
    //   web3AuthNetwork: WEB3AUTH_NETWORK.,
    //   privateKeyProvider: privateKeyProvider,
    // });

    // log in a user by their email, without showing an out-of-the box UI.
    // try {
    //   await magic.auth.loginWithMagicLink({
    //     email: "towhee.jesters0b@icloud.com",
    //     showUI: false,
    //   });
    // } catch (error) {
    //   console.error(error);
    //   // Handle errors if required!
    // }
  };

  return (
    <Stack
      sx={{
        background: "salmon",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Stack
        direction="row"
        sx={{
          height: "100px",
        }}
      >
        <Stack
          flex={1}
          sx={{
            background: "blue",
            height: "100px",
          }}
        ></Stack>

        <Stack
          flex={1}
          sx={{
            background: "yellow",
            height: "100px",
          }}
        ></Stack>
      </Stack>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Sign In</h1>
      <div className="card">
        <button
          onClick={() => {
            generateRandomWallet();
            // setCount((count) => count + 1);
          }}
        >
          Sign In
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Button onClick={() => navigate("/rewards")}>REWARDS</Button>
    </Stack>
  );
}

export default App;
