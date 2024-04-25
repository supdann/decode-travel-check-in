// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Box } from "@mui/material";
import palmbackgound from "./assets/palm_bg.webp";
import "./App.css";
import ButtonStandart from "./components/ButtonStandart";
import happylegs from "./assets/happy_legs.png";
import happyhead from "./assets/happy_head.png";
import ProgressBar from "./components/ProgressBar";
import { useEffect, useState } from "react";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { config } from "./config";
import { bookingContractABI, bookingContractAddress } from "./utils/constants";
// IMP END - Quick Start
import Web3 from "web3";
// import { SenderContext } from "./context/SenderContext";

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

function App() {
  // const { getAllBookings } = useContext(SenderContext);

  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // IMP START - SDK Initialization
        await web3auth.initModal();
        // IMP END - SDK Initialization
        setProvider(web3auth.provider);

        await getUserInfo();
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    console.log("logged in", loggedIn);
  }, [loggedIn]);

  const logout = async () => {
    // IMP START - Logout
    await web3auth.logout();
    // IMP END - Logout
    setProvider(null);
    navigate("/login");
    setLoggedIn(false);
    console.log("logged out");
  };

  const navigate = useNavigate();

  const getAllBookings = async () => {
    try {
      if (!provider) {
        console.log("Please install wallet software");
        return;
      }

      console.log("Es gibt einen Provider");

      const web3 = new Web3(provider);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];

      // Get user's balance in ether
      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(address), // Balance is in wei
        "ether"
      );

      console.log(`Balance: ${balance} CAM`);

      // const signer = provider.getSigner();

      const contract = bookingContractAddress;
      const abi = bookingContractABI;

      // Creating the contract by passing :
      // - address of the deployed contract
      // - abi of the contract (imported from constants) (In order to retrieve the abi within)

      const senderContract = new web3.eth.Contract(abi, contract);

      // calling the getAllBookings() in our smart contract
      const availableBookings = await senderContract.methods
        .getAllBookings()
        .call();

      console.log(availableBookings);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

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
        width: "100%",
        padding: "100px",
        color: "var(--primary-dark)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "0",
          right: "0",
          backgroundColor: "green",
          width: "30px",
          height: "30px",
        }}
        onClick={logout}
      ></Box>
      <ButtonStandart
        onClick={() => navigate("/login")}
        text="Donate"
        style={{
          width: "300px",
          height: "90px",
          borderRadius: "50px",
          backgroundColor: "var(--primary-color)",
          fontSize: "24px",
        }}
      ></ButtonStandart>
      <Button onClick={getAllBookings}>GET ALL BOOKINGS</Button>
      <Stack
        sx={{
          position: "relative",
        }}
      >
        <img
          src={happyhead}
          className="mascot"
          style={{ position: "relative", zIndex: "2" }}
        />
        <img src={happylegs} style={{ position: "absolute", zIndex: "1" }} />
      </Stack>

      <ProgressBar />
    </Stack>
  );
}

export default App;
