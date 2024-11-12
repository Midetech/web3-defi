import React from "react";
import { Wallet, AlertCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const WalletNotConnected = ({ onConnect }: { onConnect: () => void }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Wallet className="h-16 w-16 text-gray-400" />
                <div className="absolute -right-1 -bottom-1">
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-2">Connect Your Wallet</h2>

            <p className="text-gray-500 mb-6">
              Please connect your wallet to access token transfer features
            </p>

            <div className="space-y-4">
              <Button
                onClick={onConnect}
                className="w-full flex items-center justify-center space-x-2"
                size="lg"
              >
                <Wallet className="h-5 w-5" />
                <span>Connect Wallet</span>
              </Button>

              <div className="px-6 py-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-2">
                  New to Web3?
                </h3>
                <p className="text-sm text-blue-600">
                  You&apos;ll need a Web3 wallet like MetaMask to use this
                  application. Make sure it&apos;s installed and set up before
                  connecting.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletNotConnected;
