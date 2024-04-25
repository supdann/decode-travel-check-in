# SIWY React App

This repository folder contains the frontend code submission for the Team07 (Has Left The Building) - SIWY.

During the hackathon we have setup a React App MVP, that makes it possible for any user to create a wallet.

For the Wallet creation process, we have chosen to use Web3Auth, this makes it easy for anyone to signup using different methods and manage their cryptographic wallets.

## Initialize project

Install & Run:

```bash
npm install
npm run start
```

## How to use

You can use the MVP of the SIWY App by starting the app as mentioned above.

Once the App has started you should see a sign in / sign up screen, powered by web3auth.

You should sign up on SIWY using your preferred authentication method, such as an email address or any social signing up options.

Once you have signed up, you will be able to simulate a donation by tapping on the **Donate** Button.

Donations require however a Signature which is normally provided by **the Hotel**. You can find some test_signatures in the test folder, otherwise you can have a look at the smart-contracts folder for more information on how to generate signatures.

## License

see LICENSE.
