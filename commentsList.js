const comments = [
    "Don't miss out! Join our AI-powered crypto revolution now!",
    "test"
];

function getRandomComment() {
    return comments[Math.floor(Math.random() * comments.length)];
}

// Detecteer of we CommonJS of ESM gebruiken
if (typeof module !== "undefined" && module.exports) {
    module.exports = getRandomComment;  // Voor CommonJS (require)
} else {
    export default getRandomComment;  // Voor ES Modules (import)
}
