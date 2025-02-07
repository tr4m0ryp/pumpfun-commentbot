import fetch from "node-fetch";
import chalk from "chalk";
import { faker } from '@faker-js/faker';
import { ethers } from "ethers";
import { getRandomBio } from "./bioList.js"; // Zorg dat deze module een functie exporteert die een willekeurige bio teruggeeft

/**
 * Genereert een geldige gebruikersnaam (max 10 tekens, alleen letters, cijfers en underscores).
 */
function genUsername() {
  let username = '';
  while (username.length === 0 || username.length > 10 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    username = faker.internet.userName().replace(/[^a-zA-Z0-9_]/g, '_');
  }
  return username;
}

/**
 * Voert de wallet-authenticatie uit:
 * 1. Haalt een nonce op voor het wallet-adres.
 * 2. Ondertekent de nonce automatisch met de private key.
 * 3. Verifieert de handtekening bij de Pump.fun backend.
 *
 * @returns {Promise<string|null>} Het access token (auth_token) als string, of null bij een fout.
 */
async function authenticateWallet() {
  // Haal walletgegevens op (bij voorkeur uit environment variables)
  const walletAddress = process.env.WALLET_ADDRESS || '0xYOUR_WALLET_ADDRESS';
  const walletPrivateKey = process.env.WALLET_PRIVATE_KEY || '0xYOUR_PRIVATE_KEY';

  // Endpoint voor het opvragen van een nonce
  const nonceUrl = "https://frontend-api.pump.fun/user/nonce";

  try {
    console.log(chalk.blue("Stap 1: Ophalen van de nonce..."));
    const nonceResponse = await fetch(nonceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ address: walletAddress })
    });
    const nonceData = await nonceResponse.json();
    if (!nonceResponse.ok) {
      throw new Error("Fout bij het ophalen van de nonce: " + JSON.stringify(nonceData));
    }
    const nonce = nonceData.nonce;
    console.log(chalk.blue(`Nonce ontvangen: ${nonce}`));

    // Automatisch ondertekenen van de nonce
    console.log(chalk.blue("Stap 2: Ondertekenen van de nonce..."));
    const wallet = new ethers.Wallet(walletPrivateKey);
    const signature = await wallet.signMessage(nonce);
    console.log(chalk.blue(`Handtekening gegenereerd: ${signature}`));

    // Verificatie van de handtekening
    const verifyUrl = "https://frontend-api.pump.fun/user/verify";
    console.log(chalk.blue("Stap 3: Verifiëren van de handtekening..."));
    const verifyResponse = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ address: walletAddress, signature: signature })
    });
    const verifyData = await verifyResponse.json();
    if (!verifyResponse.ok) {
      throw new Error("Fout bij het verifiëren van de handtekening: " + JSON.stringify(verifyData));
    }
    // Verwacht dat de API een access token teruggeeft (bijvoorbeeld in verifyData.accessToken)
    const accessToken = verifyData.accessToken;
    console.log(chalk.green(`Verificatie geslaagd. Access token ontvangen: ${accessToken}`));

    return accessToken;
  } catch (error) {
    console.error(chalk.red("Authenticatie mislukt:"), error);
    return null;
  }
}

/**
 * Maakt een gebruikersprofiel aan via de Pump.fun API.
 *
 * @param {string} accessToken - Het access token (auth_token) dat wordt gebruikt voor de authenticatie (via cookie).
 * @returns {Promise<boolean>} True als het profiel succesvol is aangemaakt, anders false.
 */
async function createProfile(accessToken) {
  const username = genUsername();
  const bio = getRandomBio();

  const url = "https://frontend-api.pump.fun/users";

  const payload = {
    bio: bio,
    username: username,
  };

  const headers = {
    // Het accessToken wordt hier als cookie meegegeven
    "Cookie": `auth_token=${accessToken}`,
    "Content-Type": "application/json"
  };

  console.log(chalk.blue("Stap 4: Aanmaken van het profiel..."));
  const req = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload)
  });

  const res = await req.json();

  if (!req.ok) {
    console.error(chalk.redBright("Profiel aanmaken mislukt:"), JSON.stringify(res, null, 2));
    return false;
  }

  console.log(chalk.greenBright(`Profiel succesvol aangemaakt!
Username: ${res.username}
Bio: ${res.bio}`));
  return true;
}

/**
 * Orkestreert de volledige workflow:
 * 1. Wallet authenticatie
 * 2. Profiel aanmaken
 */
async function main() {
  const accessToken = await authenticateWallet();
  if (!accessToken) {
    console.error(chalk.red("Authenticatie mislukt. Profiel aanmaken wordt afgebroken."));
    return;
  }
  await createProfile(accessToken);
}

main();
