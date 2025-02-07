import fetch from "node-fetch";
import chalk from "chalk";
import createProfile from "./createProfile.js";
import genWallet from "./walletGen.js";
import sendPostRequest from "./comments.js";
import loadWallets from "./readWallets.js";

const API_URL = "https://pumpapi.fun/api/get_newer_mints?limit=10"; // Nieuwe API!
const NUMBER_OF_BOTS = 100;
const COMMENTS_PER_COIN = 10;

let processedMints = new Set(); // Hier houden we bij welke mints al verwerkt zijn

async function getLatestMints() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

        const data = await response.json();
        if (!data.mint || !Array.isArray(data.mint)) throw new Error("Invalid API response format.");

        return data.mint.filter(mint => !processedMints.has(mint)); // Filter dubbele mints eruit
    } catch (error) {
        console.error(chalk.redBright("Error fetching latest mints:", error));
        return [];
    }
}

async function setupBots() {
    console.log(chalk.green("Generating wallets and user profiles..."));
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

    if (newMints.length === 0) {
        console.log(chalk.yellow("No new mints found."));
        return;
    }

    for (const mint of newMints) {
        processedMints.add(mint); // Voeg toe aan de lijst van verwerkte mints
        const selectedBots = botProfiles.sort(() => 0.5 - Math.random()).slice(0, COMMENTS_PER_COIN);

        for (const bot of selectedBots) {
            const getRandomComment = require("./commentsList.js");
            const commentText = getRandomComment(); // Random comment
            await sendPostRequest(commentText, mint.address, "token-placeholder", bot.authToken, {});
        }
    }
}

async function monitorMints() {
    const botProfiles = await setupBots();
    console.log(chalk.blue("Monitoring new mints..."));
    setInterval(() => autoComment(botProfiles), 30000); // Elke 30 seconden controleren op nieuwe mints
}

monitorMints();
