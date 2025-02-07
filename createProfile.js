import fetch from "node-fetch";
import chalk from "chalk";
import { faker } from '@faker-js/faker';
import { getRandomBio } from "./bioList.js";

async function createProfile(accessToken) {
    const username = genUsername();
    const bio = getRandomBio(); // Nu uit een aparte lijst

    const url = "https://frontend-api.pump.fun/users";

    const payload = {
        "bio": bio,
        "username": username,
    };

    const headers = {
        "Cookie": `auth_token=${accessToken}`,
        "Content-Type": "application/json"
    };

    const req = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
    });

    const res = await req.json();

    if (!req.ok) {
        console.error(chalk.redBright("Failed to create profile:", JSON.stringify(res, null, 2)));
        return false;
    }

    console.log(chalk.greenBright(`Profile created \nUsername: ${res.username}\nBio: ${res.bio}`));
    return true;
}

function genUsername() {
    let username = '';
    while (username.length === 0 || username.length > 10 || !/^[a-zA-Z0-9_]+$/.test(username)) {
        username = faker.internet.userName().replace(/[^a-zA-Z0-9_]/g, '_');
    }
    return username;
}

export default createProfile;
