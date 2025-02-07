const bios = [
    "Crypto enthusiast looking for the next big thing!",
    "Diamond hands, holding strong!",
    "Chart analyst, let's ride the waves!",
    "Sniping gems before they moon!",
    "Always ahead of the pump!",
    "living for the gains!",
    "Whale in the making!",
    "Early investor, let's go!",
    "celebrating every new moonshot!",
    "Making crypto global!"
];

export function getRandomBio() {
    return bios[Math.floor(Math.random() * bios.length)];
}
