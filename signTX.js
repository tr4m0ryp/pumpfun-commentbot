import bs58 from "bs58";
import nacl from "tweetnacl";

async function signAndEncodeSignature(privateKey) {
    try {
        if (!privateKey || typeof privateKey !== "string") {
            throw new Error("Invalid private key: privateKey is missing or not a string.");
        }

        let decodedKey;
        try {
            decodedKey = bs58.decode(privateKey);
        } catch (error) {
            throw new Error("Invalid private key format: unable to decode base58.");
        }

        if (decodedKey.length !== 64) {
            throw new Error("Invalid private key length: expected 64 bytes.");
        }

        const keypair = nacl.sign.keyPair.fromSecretKey(decodedKey);
        const timestamp = Date.now();
        const message = new TextEncoder().encode(`Sign in to pump.fun: ${timestamp}`);
        const signature = nacl.sign.detached(message, keypair.secretKey);
        const encodedSignature = bs58.encode(signature);

        return { timestamp, signature: encodedSignature };
    } catch (error) {
        console.error("Error in signAndEncodeSignature:", error.message);
        return null;
    }
}

export default signAndEncodeSignature;
