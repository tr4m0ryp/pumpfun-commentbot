const comments = [
    `Don't miss out! Join our AI-powered crypto revolution now!`,
    "test"
];

export function getRandomComment() {
    return comments[Math.floor(Math.random() * comments.length)];
}
