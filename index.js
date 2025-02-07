import fetch from "node-fetch";
import createProfile from "./createProfile.js";
import genWallet from "./walletGen.js";
import sendPostRequest from "./comments.js";
import loadWallets from "./readWallets.js";

const API_URL = "https://frontend-api.pump.fun/latest-mints"; // Hypothetisch endpoint voor nieuwe coins
const NUMBER_OF_BOTS = 100;
const COMMENTS_PER_COIN = 10;

async function getLatestMints() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.mints || [];
    } catch (error) {
        console.error("Error fetching latest mints:", error);
        return [];
    }
}

async function setupBots() {
    console.log("Generating wallets and user profiles...");
    await genWallet(NUMBER_OF_BOTS);
    const wallets = await loadWallets();

    const botProfiles = [];
    for (let i = 0; i < NUMBER_OF_BOTS; i++) {
        const profile = await createProfile(wallets[i].privKey);
        if (profile) {
            botProfiles.push({
                username: profile.username,
                authToken: wallets[i].privKey,
            });
        }
    }
    return botProfiles;
}

async function autoComment(botProfiles) {
    const newMints = await getLatestMints();
    for (const mint of newMints) {
        const selectedBots = botProfiles.sort(() => 0.5 - Math.random()).slice(0, COMMENTS_PER_COIN);
        for (const bot of selectedBots) {
            import { getRandomComment } from "./commentsList.js";
            const commentText = getRandomComment(); // Random comment
            await sendPostRequest(commentText, mint.address, "token-placeholder", bot.authToken, {});
        }
    }
}

async function main() {
    const botProfiles = await setupBots();
    setInterval(() => autoComment(botProfiles), 30000); // Elke 30 seconden controleren op nieuwe mints
}

main();
