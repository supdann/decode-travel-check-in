import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Web3
import Web3 from "web3";
import { Web3Auth } from "@web3auth/modal";
import { IProvider } from "@web3auth/base";

// MUI
import { Stack, Button, Box } from "@mui/material";

// Assets & Styles
import "./App.css";
import ButtonStandart from "./components/ButtonStandart";
import palmbackgound from "./assets/palm_bg.webp";
import happylegs from "./assets/happy_legs.png";
import happyhead from "./assets/happy_head.png";
import ProgressBar from "./components/ProgressBar";
import test_signatures from "./test/test_signatures.json";

// Custom
import { config } from "./config";
import {
  bookingContractABI,
  bookingContractAddress,
  donationContractABI,
  donationContractAddress,
} from "./utils/constants";

const web3auth = new Web3Auth(config.defaultWeb3AuthConfig);

type Donation = {
  sqm: number;
  donator: string;
  authorizer: string;
  paid: boolean;
};

type Booking = {
  guest: string;
  bookingId: number;
};

function App() {
  // const { getAllBookings } = useContext(SenderContext);

  const [donationsCount, setDonationsCount] = useState<number>(0);
  const [bookingsCount, setBookingsCount] = useState<number>(0);

  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        await getUserInfo();
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    console.log("Is logged in:", loggedIn);
  }, [loggedIn]);

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    navigate("/login");
    setLoggedIn(false);
    console.log("logged out");
  };

  const navigate = useNavigate();

  const makeADonation = async () => {
    // Donation signature
    let signature = undefined;
    let donationId = undefined;

    // Contract
    let donationContract = undefined;

    // Address
    let address = undefined;

    try {
      if (!provider) {
        console.log("Please install wallet software");
        return;
      }

      const web3 = new Web3(provider);
      address = (await web3.eth.getAccounts())[0];

      donationContract = new web3.eth.Contract(
        donationContractABI,
        donationContractAddress
      );
    } catch (error) {
      console.log("Error: Could not connect to the blockchain");
      console.log(error);
    }

    if (!donationContract || !address) {
      console.log("Error: Missing data");
      return;
    }

    let test_signature_start_count = 0;
    let success = false;

    while (!success && test_signature_start_count < test_signatures.length) {
      // Select a signature from the test_signatures.json file
      signature = test_signatures[test_signature_start_count]["Signature"];
      donationId = test_signatures[test_signature_start_count]["Namehash"];

      // Try to donate if the test signature failed try the next one
      try {
        // Console log the test signature count
        console.log(`Testing signature ${test_signature_start_count}`);

        // Mint a new Donation NFT
        await donationContract.methods
          .donate(signature, address, "100", donationId, "")
          .send({ from: address });

        success = true;
      } catch (error) {
        console.log("Error: Could not donate");
        console.log(error);
        test_signature_start_count++;
      }
    }
  };

  const getAllBookings = async () => {
    try {
      if (!provider) {
        console.log("Please install wallet software");
        return;
      }

      const web3 = new Web3(provider);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];
      console.log(`Address: ${address}`);

      // Get user's balance in ether
      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(address), // Balance is in wei
        "ether"
      );

      console.log(`Balance: ${balance} CAM`);

      // Creating the contract by passing :
      // - address of the deployed contract
      // - abi of the contract (imported from constants) (In order to retrieve the abi within)
      const bookingsContract = new web3.eth.Contract(
        bookingContractABI,
        bookingContractAddress
      );

      // Calling the getAllBookings() in our smart contract
      const availableBookings = await bookingsContract.methods
        .getAllBookings()
        .call();

      // Count the number of donations, check first if its a valid array
      if (Array.isArray(availableBookings)) {
        // Parse Booking objects
        const bookings = availableBookings.map((booking: any) => {
          const data = {
            guest: booking.guest,
            bookingId: booking.bookingId,
          };
          return data as Booking;
        });
        setBookingsCount(bookings.length);
        console.log(availableBookings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listAllDonations = async () => {
    try {
      if (!provider) {
        console.log("Please install wallet software");
        return;
      }

      const web3 = new Web3(provider);

      const donationContract = new web3.eth.Contract(
        donationContractABI,
        donationContractAddress
      );

      // calling the getAllDonations() in our smart contract
      const availableDonations = await donationContract.methods
        .getAllDonations()
        .call();

      // Count the number of donations, check first if its a valid array
      if (Array.isArray(availableDonations)) {
        // Parse Booking objects
        const donations = availableDonations.map((booking: any) => {
          const data = {
            sqm: booking.sqm,
            donator: booking.donator,
            authorizer: booking.authorizer,
            paid: booking.paid,
          };
          return data as Donation;
        });

        setDonationsCount(donations.length);
      }
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
      />
      <ButtonStandart
        onClick={makeADonation}
        text="Donate"
        style={{
          width: "300px",
          height: "90px",
          borderRadius: "50px",
          backgroundColor: "var(--primary-color)",
          fontSize: "24px",
        }}
      ></ButtonStandart>
      <Button onClick={getAllBookings}>
        GET ALL BOOKINGS ({bookingsCount})
      </Button>
      <Button onClick={listAllDonations}>
        GET ALL DONATIONS ({donationsCount})
      </Button>
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
