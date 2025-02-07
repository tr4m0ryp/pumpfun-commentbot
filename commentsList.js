const comments = [
    "🚀 To the moon!",
    "🔥 This is gonna blow up!",
    "💎 Hands are ready!",
    "📈 All in!",
    "🎯 This one is a gem!",
    "🐳 Whales are coming!",
    "🚀 Just minted, let's go!",
    "🔥 Hyper bullish on this!",
    "🤑 Gains incoming!",
    "🎉 Best launch so far!"

];

export function getRandomComment() {
    return comments[Math.floor(Math.random() * comments.length)];
}
