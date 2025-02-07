const comments = [
    "Don't miss out! Join our AI-powered crypto revolution now!",
    "test"
];

function getRandomComment() {
    return comments[Math.floor(Math.random() * comments.length)];
}

export default getRandomComment;
