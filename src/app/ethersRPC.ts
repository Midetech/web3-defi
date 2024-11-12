/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IProvider } from "@web3auth/base";
import { ethers } from "ethers";

const getChainId = async (provider: IProvider): Promise<any> => {
    try {
        const ethersProvider = new ethers.BrowserProvider(provider);
        // Get the connected Chain's ID
        const networkDetails = await ethersProvider.getNetwork();
        return networkDetails;
    } catch (error) {
        return error;
    }
}

const getAccounts = async (provider: IProvider): Promise<any> => {
    try {
        const ethersProvider = new ethers.BrowserProvider(provider);
        const signer = await ethersProvider.getSigner();

        // Get user's Ethereum public address
        const address = signer.getAddress();

        return await address;
    } catch (error) {
        return error;
    }
}

const getBalance = async ({ provider, address }: { provider: IProvider, address: string }): Promise<string> => {
    try {
        const ethersProvider = new ethers.BrowserProvider(provider);
        // const signer = await ethersProvider.getSigner();

        // // Get user's Ethereum public address
        // const address = signer.getAddress();

        // Get user's balance in ether
        const balance = ethers.formatEther(
            await ethersProvider.getBalance(address) // Balance is in wei
        );

        return Number(balance).toFixed(2);
    } catch (error) {
        return error as string;
    }
}

const sendTransaction = async ({ provider, address, tokenAmount }: {
    provider: IProvider,
    address: string,
    tokenAmount: string
}): Promise<any> => {
    try {
        const ethersProvider = new ethers.BrowserProvider(provider);
        const signer = await ethersProvider.getSigner();

        // const address = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";

        const amount = ethers.parseEther(tokenAmount);
        const fees = await ethersProvider.getFeeData()

        // Submit transaction to the blockchain
        const tx = await signer.sendTransaction({
            to: address,
            value: amount,
            maxPriorityFeePerGas: fees.maxPriorityFeePerGas, // Max priority fee per gas
            maxFeePerGas: fees.maxFeePerGas, // Max fee per gas
        });

        // Wait for transaction to be mined
        const receipt = await tx.wait();

        return receipt;
    } catch (error) {
        return error as string;
    }
}

const signMessage = async (provider: IProvider): Promise<any> => {
    try {
        // For ethers v5
        // const ethersProvider = new ethers.providers.Web3Provider(provider);
        const ethersProvider = new ethers.BrowserProvider(provider);

        // For ethers v5
        // const signer = ethersProvider.getSigner();
        const signer = await ethersProvider.getSigner();
        const originalMessage = "YOUR_MESSAGE";

        // Sign the message
        const signedMessage = await signer.signMessage(originalMessage);

        return signedMessage;
    } catch (error) {
        return error as string;
    }
}

export default { getChainId, getAccounts, getBalance, sendTransaction, signMessage };
