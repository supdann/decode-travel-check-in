import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
} from "react";
import { useNavigate } from "react-router-dom";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { config } from "./config";

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

// Creating the context
const AuthContext = createContext(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

// Context provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);
        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const login = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      if (web3auth.connected) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("login error", error);
    }
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  // Providing the login, logout, and loggedIn state to context consumers
  const value = { login, logout, loggedIn, provider };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
