import fetch from "node-fetch";
import chalk from "chalk";
import { faker } from '@faker-js/faker';
import { getRandomBio } from "./bioList.js";
import { Keypair } from '@solana/web3.js';
import nacl from "tweetnacl";
import bs58 from "bs58";

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
 * 1. Haalt een nonce op voor het Solana‑wallet-adres.
 * 2. Ondertekent de nonce met de Solana keypair.
 * 3. Probeert de handtekening te verifiëren bij de backend.
 *
 * Let op: Er wordt lokaal gecontroleerd of de ondertekende handtekening valide is.
 *
 * @returns {Promise<string|null>} Het access token als string, of null bij een fout.
 */
async function authenticateWallet() {
  // Haal walletgegevens op (bij voorkeur uit environment variables)
  const walletAddress = process.env.SOLANA_WALLET_ADDRESS || 'F5MxxskewpB8AEkpERA6ZETToBxXEgyyEx5YTfkKh23N';
  // Je private key in base58-notatie (bijvoorbeeld 88 tekens lang)
  const solanaPrivateKeyBase58 = process.env.SOLANA_PRIVATE_KEY || '4zXLNijtqeR1AJaXGhNbBTEGtaPAaK2pWmf2WgbUvoujpLXpxHwTa154Ddm7bXU5Fpj2cr9sKyapxERNW48siWKW';

  // Decode de base58 private key en maak een keypair aan
  const secretKey = bs58.decode(solanaPrivateKeyBase58);
  const keypair = Keypair.fromSecretKey(secretKey);

  // Endpoint voor het ophalen van de nonce
  const nonceUrl = "https://pump-fun-backend.fly.dev/user/nonce";

  try {
    console.log(chalk.blue("Stap 1: Ophalen van de nonce..."));
    const nonceResponse = await fetch(nonceUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: walletAddress })
    });
    const nonceData = await nonceResponse.json();
    if (!nonceResponse.ok) {
      throw new Error("Fout bij het ophalen van de nonce: " + JSON.stringify(nonceData));
    }
    const nonce = nonceData.nonce;
    console.log(chalk.blue(`Nonce ontvangen: ${nonce}`));

    // Stap 2: Ondertekenen van de nonce
    console.log(chalk.blue("Stap 2: Ondertekenen van de nonce met Solana keypair..."));
    // Zet de nonce (als string) om naar bytes
    const message = new TextEncoder().encode(nonce);
    // Onderteken de boodschap
    const signatureUint8 = nacl.sign.detached(message, keypair.secretKey);

    // Controleer lokaal of de handtekening valide is
    const isValid = nacl.sign.detached.verify(message, signatureUint8, keypair.publicKey.toBytes());
    console.log(chalk.blue("Lokale verificatie van de handtekening:", isValid));

    // Genereer twee formaten voor de signature:
    // Optie 1: Base58-gecodeerd (standaard voor Solana)
    const signatureBase58 = bs58.encode(signatureUint8);
    // Optie 2: Hex-gecodeerd met "0x"-prefix
    const signatureHex = "0x" + Buffer.from(signatureUint8).toString('hex');

    console.log(chalk.blue(`Handtekening (base58): ${signatureBase58}`));
    console.log(chalk.blue(`Handtekening (hex): ${signatureHex}`));

    // Probeer eerst met hex (als dat niet werkt, gebruik dan signatureBase58)
    const signatureToSend = signatureBase58;
    // Als alternatief: const signatureToSend = signatureBase58;

    // Stap 3: Verifiëren van de handtekening bij de backend
    const verifyUrl = "https://pump-fun-backend.fly.dev/user/verify";
    console.log(chalk.blue("Stap 3: Verifiëren van de handtekening..."));
    const verifyResponse = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: walletAddress, signature: signatureToSend })
    });
    const verifyData = await verifyResponse.json();
    if (!verifyResponse.ok) {
      throw new Error("Fout bij het verifiëren van de handtekening: " + JSON.stringify(verifyData));
    }
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
 * @param {string} accessToken - Het access token dat wordt gebruikt voor de authenticatie (via cookie).
 * @returns {Promise<boolean>} True als het profiel succesvol is aangemaakt, anders false.
 */
async function createProfile(accessToken) {
  const username = genUsername();
  const bio = getRandomBio();

  const url = "https://pump-fun-backend.fly.dev/users";

  const payload = { bio, username };

  const headers = {
    "Cookie": `auth_token=${accessToken}`,
    "Content-Type": "application/json"
  };

  console.log(chalk.blue("Stap 4: Aanmaken van het profiel..."));
  const req = await fetch(url, {
    method: "POST",
    headers,
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
