import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import fs from 'fs/promises';
import path from 'path';

async function genWallet(amount) {
    try {
        if (!Number.isInteger(amount) || amount <= 0) {
            throw new Error("Invalid amount: must be a positive integer.");
        }

        const walletsFilePath = path.join(process.cwd(), 'walletsList.json');
        let existingWallets = [];

        // Controleer of walletsList.json al bestaat en wallets bevat
        try {
            const fileData = await fs.readFile(walletsFilePath, 'utf-8');
            if (fileData.trim()) {
                existingWallets = JSON.parse(fileData);
                if (!Array.isArray(existingWallets)) {
                    throw new Error("Invalid walletsList.json format. Expected an array.");
                }
            }
        } catch (error) {
            console.warn("No existing wallets found, creating a new file...");
        }

        const newWallets = [];

        for (let i = 0; i < amount; i++) {
            const keyPair = Keypair.generate();

            const walletData = {
                [`Wallet ${existingWallets.length + i + 1}`]: {
                    address: keyPair.publicKey.toString(),
                    privateKey: bs58.encode(keyPair.secretKey)
                }
            };

            newWallets.push(walletData);
            console.log(`Wallet ${existingWallets.length + i + 1} generated.`);
        }

        // Voeg nieuwe wallets toe aan de bestaande wallets
        const updatedWallets = [...existingWallets, ...newWallets];

        await fs.writeFile(walletsFilePath, JSON.stringify(updatedWallets, null, 2));
        console.log(`Successfully generated ${amount} new wallets.\n\n`);
    } catch (error) {
        console.error("Error generating wallets:", error.message);
    }
}

export default genWallet;

