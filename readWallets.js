import { readFile } from 'fs/promises';
import { join } from 'path';
import bs58 from 'bs58';
import { Keypair } from '@solana/web3.js';

async function loadWallets() {
    const walletsFilePath = join(process.cwd(), 'walletsList.json');

    try {
        const data = await readFile(walletsFilePath, 'utf-8');

        if (!data.trim()) {
            console.error("Error: walletsList.json is empty.");
            return [];
        }

        const walletsJson = JSON.parse(data);

        if (!Array.isArray(walletsJson)) {
            console.error("Error: Invalid walletsList.json format.");
            return [];
        }

        const wallets = walletsJson.map(walletObject => {
            const walletKey = Object.keys(walletObject)[0];

            if (!walletKey || !walletObject[walletKey]) {
                console.error("Error: Invalid wallet structure detected, skipping...");
                return null;
            }

            const { address, privateKey } = walletObject[walletKey];

            if (!address || !privateKey) {
                console.error("Error: Missing address or privateKey, skipping...");
                return null;
            }

            try {
                const keypair = Keypair.fromSecretKey(bs58.decode(privateKey.trim()));

                return {
                    pubKey: address.trim(),
                    privKey: privateKey.trim(),
                    keypair
                };
            } catch (error) {
                console.error(`Error decoding private key for ${address}:`, error);
                return null;
            }
        }).filter(wallet => wallet !== null); // Filter out mislukte wallets

        return wallets;
    } catch (error) {
        console.error("Error reading walletsList.json:", error);
        return [];
    }
}

export default loadWallets;
