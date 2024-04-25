import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Web3
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";

// MUI
import { Stack } from "@mui/material";

// Assets
import logo from "../assets/universal_logo.png";
import palmbackgound from "../assets/palm_bg.webp";
import happy from "../assets/happy.png";
import ButtonStandart from "../components/ButtonStandart";
import "../styles.css";

import "../App.css";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { config } from "../config";

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
  clientId: config.WEB3AUTH_CLIENT_ID,
  web3AuthNetwork: "testnet",
  useCoreKitKey: false,
  chainConfig: chainConfig,
  privateKeyProvider: privateKeyProvider,
};

const web3auth = new Web3Auth(defaultWeb3AuthConfig);

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // IMP START - SDK Initialization
        await web3auth.initModal();

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    // IMP START - Login
    try {
      await web3auth.connect();
      if (web3auth.connected) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("login error", error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <Stack
      sx={{
        background: `url(${palmbackgound})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        height: "100vh",
        width: "100vpw",
        color: "var(--primary-dark)",
        px: 2,
      }}
    >
      <img src={logo} className="logo" />
      <h1>No account yet?</h1>
      <ButtonStandart
        text="Create an Account"
        onClick={() => navigate("/rewards")}
      />
      <a href="#" style={{ paddingTop: "10px" }} onClick={login}>
        Login
      </a>
      <Stack
        sx={{
          position: "absolute",
          bottom: "-40vh",
          overflow: "hidden",
          height: "600px",
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={happy} className="mascot" alt="mascot" />
      </Stack>
    </Stack>
  );
};

export default LoginPage;
