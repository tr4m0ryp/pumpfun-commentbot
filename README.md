# PumpFun Comment Bot

## Overview
The **PumpFun Comment Bot** is an automated script designed to monitor newly minted coins on Pump.fun, generate spoofed wallet accounts, and post randomized comments from multiple bot accounts. This tool is useful for engagement, visibility, and automation on the platform.

## Features
- **Automated coin detection**: Fetches newly minted coins automatically.
- **Wallet spoofing**: Generates a large number of fake wallets.
- **User profile automation**: Creates fake user profiles with randomized bios.
- **Randomized comments**: Selects comments from a predefined list.
- **Timed execution**: Runs at regular intervals to ensure timely interactions.
- **Error handling**: Ensures smooth execution with built-in error checks.

## How It Works
1. **Fetching new minted coins**:
   - The script queries the Pump.fun API (`https://frontend-api.pump.fun/latest-mints`) to get a list of newly minted coins.
2. **Generating wallets**:
   - Fake Solana wallets are generated using `Keypair.generate()`.
   - The wallets are stored in `walletsList.json` for later use.
3. **Creating fake user profiles**:
   - Each wallet gets a randomly generated username and bio.
   - Bios are randomly selected from `bioList.js`.
4. **Posting comments**:
   - The script picks **10 random wallets per coin**.
   - A comment is selected from `commentsList.js`.
   - The comment is posted using `sendPostRequest()`.
5. **Repeating the process**:
   - The script continuously checks for new minted coins every 30 seconds.

## Installation
### **1. Prerequisites**
- Node.js (>=16.0.0)
- npm or yarn

### **2. Clone the Repository**
```sh
git clone https://github.com/tr4m0ryp/pumpfun-commentbot.git
cd pumpfun-commentbot
```

### **3. Install Dependencies**
```sh
npm install
```

## Configuration
Edit `config.json` to customize the bot’s behavior:
```json
{
    "LICENSE_KEY": "",
    "API_KEY": "",
    "Image_List": [
        "./images/image1.png",
        "./images/image2.png",
        "./images/image3.png"
    ]
}
```

## Usage
### **1. Start the bot**
```sh
npm start
```
This runs `index.js`, which:
- Loads existing wallets or generates new ones.
- Continuously fetches new minted coins.
- Posts automated comments.

### **2. Generate additional wallets manually**
```sh
node generateWallets.js 50
```
This generates 50 new wallets and adds them to `walletsList.json`.

## File Structure
```
📁 pumpfun-commentbot
│-- 📄 README.md      # This file
│-- 📄 package.json   # Project dependencies
│-- 📄 config.json    # Configurations
│-- 📄 index.js       # Main execution script
│-- 📄 walletGen.js   # Wallet generation
│-- 📄 createProfile.js # User profile automation
│-- 📄 comments.js    # Comment posting logic
│-- 📄 commentsList.js # List of predefined comments
│-- 📄 bioList.js     # List of randomized bios
│-- 📄 signTX.js      # Transaction signing logic
│-- 📄 walletsList.json # Stored generated wallets
```

## Customization
- **Modify comments** in `commentsList.js` by adding your own phrases.
- **Modify bios** in `bioList.js` to fit different personas.
- **Adjust timing** in `index.js` by changing the interval for checking new mints.

## Troubleshooting
### **Error: "walletsList.json not found"**
- Ensure you’ve run the script at least once to generate wallets.
- Manually create an empty `walletsList.json` file:
  ```json
  []
  ```

### **Error: "Invalid API response"**
- The Pump.fun API might be temporarily down. Try again later.

## Disclaimer
This script is for educational purposes only. Using it in a way that violates Pump.fun’s terms of service may lead to account bans.

## License
MIT License

