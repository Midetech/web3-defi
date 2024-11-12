/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */

"use client";

import {
  CHAIN_NAMESPACES,
  IAdapter,
  IProvider,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { useEffect, useState } from "react";

import { Send, Wallet } from "lucide-react";
import Image from "next/image";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import WalletNotConnected from "./components/WalletConnect";
import RPC from "./ethersRPC";
// import RPC from "./viemRPC";
// import RPC from "./web3RPC";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID; // get from https://dashboard.web3auth.io

// STAKE: "0x395e978DE3fE20C74a8fb6F6437BdCAEA0e7DaBD",
// TOKEN: "0xFF1a44E3a8DCfb255073D2047b5E8280550d1BDa",
// LaunchIDO: "0x97Aac8Fc07792f3a413541bD92eB072b32641fc3",
// MINT: "0x5660C4C57f67d7033f544C824B4dF131784F211a",
// id: 97,
// chain: "bsc",
// idHex: "0x61",
// rpc: "https://soft-ancient-tree.bsc-testnet.discover.quiknode.pro/a07b98a85542347bf8168930b1903504969f85ac/",
// explorer: "https://testnet.bscscan.com",
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x61",
  rpcTarget: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://testnet.bscscan.com",
  ticker: "tBNB",
  tickerName: "Binance",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});
const web3AuthOptions: Web3AuthOptions = {
  clientId: clientId || "", // Ensure clientId is a string
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
};
const web3auth = new Web3Auth(web3AuthOptions);

function App() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [networkInfo, setNetworkInfo] = useState<any>();

  const [info, setInfo] = useState({
    bal: "0.0",
    add: "0x",
  });
  useEffect(() => {
    const init = async () => {
      try {
        const adapters = await getDefaultExternalAdapters({
          options: web3AuthOptions,
        });
        adapters.forEach((adapter: IAdapter<unknown>) => {
          web3auth.configureAdapter(adapter);
        });
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
    const getInfo = async () => {
      try {
        if (provider) {
          const add = await RPC.getAccounts(provider);
          const bal = await RPC.getBalance(provider);
          const networkInfo = await RPC.getChainId(provider);

          console.log(networkInfo);
          setNetworkInfo(networkInfo);
          setInfo({
            bal,
            add,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, [provider]);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  // const getUserInfo = async () => {
  //   const user = await web3auth.getUserInfo();
  //   uiConsole(user);
  // };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  // Check the RPC file for the implementation
  // const getAccounts = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const address = await RPC.getAccounts(provider);
  //   uiConsole(address);
  // };

  // const getBalance = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const balance = await RPC.getBalance(provider);
  //   uiConsole(balance);
  // };

  // const signMessage = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const signedMessage = await RPC.signMessage(provider);
  //   uiConsole(signedMessage);
  // };

  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [sending, setSending] = useState(false);

  const [response, setResponse] = useState<any>({});

  const sendTransaction = async () => {
    setResponse({});
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    console.log("Sending Transaction...");
    setSending(true);
    const transactionReceipt = await RPC.sendTransaction({
      provider,
      address: recipientAddress,
      tokenAmount: amount,
    });
    setResponse(transactionReceipt);
    setSending(false);
  };

  console.log(response);

  if (!loggedIn) {
    return <WalletNotConnected onConnect={login} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Image
                priority
                src="https://testnet.bscscan.com/assets/bsc/images/svg/logos/chain-light.svg"
                height={20}
                width={20}
                alt="BNB"
              />
              <span className="text-sm font-medium text-gray-600">
                {networkInfo?.name}
              </span>
            </div>

            <Button
              onClick={loggedIn ? logout : login}
              variant={loggedIn ? "outline" : "default"}
              className="flex items-center space-x-2"
            >
              <Wallet className="h-4 w-4" />
              <span>{loggedIn ? "Disconnect" : "Connect Wallet"}</span>
            </Button>
          </div>

          {loggedIn && (
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Wallet Address:</span>
                <span className="font-mono">{`${info.add.slice(
                  0,
                  6
                )}...${info.add.slice(-4)}`}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Balance:</span>
                <span className="font-medium">{info.bal} TOKEN</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      {response?.info?.error && (
        <p className="text-center text-xl text-red-700 pt-10">
          {response.info.error.message.split(":")[2]}
        </p>
      )}

      {response?.status === 1 && (
        <div className="flex items-center gap-x-2 pt-10 justify-center">
          <p className="text-center text-xl text-green-800">
            {" "}
            Transaction is successful
          </p>
          <a
            className="text-center text-xl text-green-400 underline"
            href={`${chainConfig.blockExplorerUrl}/tx/${response.hash}`}
            target="_blank"
          >
            Check Tnx on Explorer
          </a>
        </div>
      )}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Transfer Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Address
                </label>
                <Input
                  type="text"
                  placeholder="0x..."
                  className="!h-12 font-mono"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <Input
                  type="number"
                  className="!h-12"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <Button
                onClick={sendTransaction}
                className="w-full flex items-center justify-center space-x-2 !h-12"
                disabled={!loggedIn || sending}
              >
                <Send className="h-4 w-4" />
                {sending ? (
                  <span>Sending Transaction....</span>
                ) : (
                  <span>Send Tokens</span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
