import fetch from "node-fetch";
import chalk from "chalk";
import { faker } from '@faker-js/faker';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';


// Main function to log in
const loginWithSolanaWallet = async (address, signature) => {
  try {
    // Generate the message with the current timestamp
    //const timestamp = Date.now();
    //const message = `Sign this message to log in to Pump.fun at timestamp: ${timestamp}`;

    // Sign the message
    //const signature = await signMessage(message, privateKey);

    // Make the login request
    const response = await fetch("https://frontend-api-v3.pump.fun/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://pump.fun",
      },
      body: JSON.stringify({
        address: address,
        signature: signature,
        timestamp: Date.now(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Try to parse error details
      throw new Error(`Login failed: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log("Login successful! Response data:", data);
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

// Example usage
const main = async () => {
  try {

    //wallet_gen
    const keypair = Keypair.generate();
    const privateKey = keypair.secretKey;
    const walletAddress = keypair.publicKey.toString();
    console.log("New Wallet Address:", walletAddress);
    console.log("New Private Key:", Buffer.from(privateKey).toString('hex'));

    const timestamp = Date.now();
    const timestampString = Date.now();
    const message = `Sign in to pump.fun: ${timestampString}`;
    console.log("Boodschap die wordt ondertekend:", message);
    const messageBytes = Buffer.from(message);
    const signature = nacl.sign.detached(messageBytes, privateKey);
    console.log("Signature:", Buffer.from(signature).toString('hex'));

    await loginWithSolanaWallet(walletAddress, Buffer.from(signature).toString('hex'));
  } catch (error) {
    console.error("Error in main function:", error);
  }
};



// Run the script
main();