import fetch from "node-fetch";
import { faker } from "@faker-js/faker";
import chalk from "chalk";

// Herbruikbare API-configuratie
const API_BASE_URL = "https://pump-fun-backend.fly.dev";

// Stap 1: Vraag een nonce op
async function getNonce(address) {
  const response = await fetch(`${API_BASE_URL}/user/nonce`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address }),
  });
  if (!response.ok) {
    throw new Error(`Failed to get nonce: ${response.status}`);
  }
  const { nonce } = await response.json();
  return nonce;
}

// Stap 2: Onderteken de nonce (dummy implementatie)
function signNonce(nonce, privateKey) {
  // Gebruik ethers.js of een vergelijkbare library voor echte ondertekening
  // Voorbeeld: ethers.utils.signMessage(nonce, privateKey);
  return `signed_${nonce}_with_${privateKey}`;
}

// Stap 3: Verifieer de handtekening
async function verifySignature(address, signature) {
  const response = await fetch(`${API_BASE_URL}/user/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, signature }),
  });
  if (!response.ok) {
    throw new Error(`Failed to verify signature: ${response.status}`);
  }
  const { accessToken } = await response.json();
  return accessToken;
}

// Stap 4: Maak een gebruiker aan
async function createUser(accessToken, username, bio) {
  const response = await fetch(`${API_BASE_URL}/user`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, bio }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to create user: ${error.message}`);
  }
  return await response.json();
}

// Functie om alles te combineren
async function main(walletAddress, privateKey) {
  try {
    console.log(chalk.blue("Requesting nonce..."));
    const nonce = await getNonce(walletAddress);

    console.log(chalk.blue("Signing nonce..."));
    const signature = signNonce(nonce, privateKey);

    console.log(chalk.blue("Verifying signature..."));
    const accessToken = await verifySignature(walletAddress, signature);

    console.log(chalk.blue("Creating user..."));
    const username = faker.internet.userName();
    const bio = faker.lorem.sentence();
    const user = await createUser(accessToken, username, bio);

    console.log(chalk.greenBright("User created successfully!"));
    console.log(user);
  } catch (error) {
    console.error(chalk.redBright("Error:", error.message));
  }
}

// Voer de flow uit
main("jouw_wallet_adres", "jouw_private_key");
