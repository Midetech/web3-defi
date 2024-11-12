/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import { createWalletClient, createPublicClient, custom, formatEther, parseEther, extractChain } from 'viem'
import { mainnet, polygonAmoy, sepolia, bscTestnet } from 'viem/chains'
import type { IProvider } from "@web3auth/base";

import * as chains from 'viem/chains'

const getViewChain = (provider: IProvider) => {
    switch (provider.chainId) {
        case "1":
            return mainnet;
        case "0x13882":
            return polygonAmoy;
        case "0xaa36a7":
            return sepolia;
        case "0x61":
            return bscTestnet;
        default:
            return mainnet;
    }
}



const getChainId = async (provider: IProvider): Promise<any> => {
    try {
        const walletClient = createWalletClient({
            transport: custom(provider)
        })

        const address = await walletClient.getAddresses()
        console.log(address)

        const chainId = await walletClient.getChainId()
        const optimism = extractChain({
            chains: Object.values(chains),
            id: chainId as 1 | 5 | 7 | 8 | 10 | 14 | 15 | 16 | 19 | 20 | 21 | 24 | 25 | 30 | 31 | 40 | 56 | 88 | 96 | 168 | 240 | 248 | 80002 | 11155111 | 97 | 11124 | 787 | 47 | 10241024 | 10241025 | 888888888 | 28122024
        })
        return optimism;
        // return chainId.toString();
    } catch (error) {
        return error;
    }
}
const getAccounts = async (provider: IProvider): Promise<any> => {
    try {

        const walletClient = createWalletClient({
            chain: getViewChain(provider),
            transport: custom(provider)
        });

        const address = await walletClient.getAddresses();

        return address;
    } catch (error) {
        return error;
    }
}

const getBalance = async (provider: IProvider): Promise<string> => {
    try {
        const publicClient = createPublicClient({
            chain: getViewChain(provider),
            transport: custom(provider)
        })

        const walletClient = createWalletClient({
            chain: getViewChain(provider),
            transport: custom(provider)
        });

        const address = await walletClient.getAddresses();

        const balance = await publicClient.getBalance({ address: address[0] });
        console.log(balance)
        return formatEther(balance);
    } catch (error) {
        return error as string;
    }
}

const sendTransaction = async ({ provider, destination, tokenAmount }: {
    provider: IProvider,
    destination: any,
    tokenAmount: string
}): Promise<any> => {
    try {
        const publicClient = createPublicClient({
            chain: getViewChain(provider),
            transport: custom(provider)
        })

        const walletClient = createWalletClient({
            chain: getViewChain(provider),
            transport: custom(provider)
        });

        // data for the transaction
        const amount = parseEther(tokenAmount);
        const address = await walletClient.getAddresses();

        // Submit transaction to the blockchain
        const hash = await walletClient.sendTransaction({
            account: address[0],
            to: destination,
            value: amount,
        });
        console.log(hash)
        const receipt = await publicClient.waitForTransactionReceipt({ hash });


        return JSON.stringify(receipt, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        );
    } catch (error) {
        return error;
    }
}

const signMessage = async (provider: IProvider): Promise<any> => {
    try {
        const walletClient = createWalletClient({
            chain: getViewChain(provider),
            transport: custom(provider)
        });

        // data for signing
        const address = await walletClient.getAddresses();
        const originalMessage = "YOUR_MESSAGE";

        // Sign the message
        const hash = await walletClient.signMessage({
            account: address[0],
            message: originalMessage
        });

        console.log(hash)

        return hash.toString();
    } catch (error) {
        return error;
    }
}

export default { getChainId, getAccounts, getBalance, sendTransaction, signMessage };
