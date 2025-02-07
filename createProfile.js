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
 * 3. Verifieert de handtekening bij de backend.
 *
 * @param {string} privKey - De Solana private key in base58.
 * @param {string} pubKey - De Solana public key in base58.
 * @returns {Promise<string|null>} Het access token als string, of null bij een fout.
 */
async function authenticateWallet(privKey, pubKey) {
  // Gebruik de meegegeven public key als wallet-adres (in base58)
  const walletAddress = pubKey;
  const solanaPrivateKeyBase58 = privKey;

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

    // Stap 2: Ondertekenen van de nonce met de Solana keypair
    console.log(chalk.blue("Stap 2: Ondertekenen van de nonce met Solana keypair..."));
    const message = new TextEncoder().encode(nonce);
    const signatureUint8 = nacl.sign.detached(message, keypair.secretKey);

    // Optie: gebruik de base58-gecodeerde handtekening (zoals de API dit lijkt te verwachten)
    const signatureBase58 = bs58.encode(signatureUint8);
    console.log(chalk.blue(`Handtekening (base58): ${signatureBase58}`));

    // Stap 3: Verifiëren van de handtekening bij de backend
    const verifyUrl = "https://pump-fun-backend.fly.dev/user/verify";
    console.log(chalk.blue("Stap 3: Verifiëren van de handtekening..."));
    const verifyResponse = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: walletAddress, signature: signatureBase58 })
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
 * @returns {Promise<object|boolean>} Het profielobject (bijv. { username, bio }) of false bij een fout.
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
  return res;
}

/**
 * Orkestreert de volledige workflow:
 * 1. Wallet authenticatie
 * 2. Profiel aanmaken
 *
 * @param {string} privKey - De Solana private key in base58.
 * @param {string} pubKey - De Solana public key in base58.
 * @returns {Promise<object|null>} Een object met het profiel en de keys, of null bij een fout.
 */
async function createUserProfile(privKey, pubKey) {
  const accessToken = await authenticateWallet(privKey, pubKey);
  if (!accessToken) {
    console.error(chalk.red("Authenticatie mislukt. Profiel aanmaken wordt afgebroken."));
    return null;
  }
  const profile = await createProfile(accessToken);
  if (!profile) {
    console.error(chalk.red("Profiel aanmaken mislukt."));
    return null;
  }
  return {
    profile: {
      username: profile.username,
      bio: profile.bio,
    },
    privKey,
    pubKey,
  };
}

export default createUserProfile;
