// Blockchain RPC URL
const rpcurl = "https://polygon.llamarpc.com";

// Your Token Address
const tokenAddress = "0xAfE090a314742B79d57657FA6880558b2d55B974";

// Pair token address
const pairAddress = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
const pairTokenTicker = "MATIC";

// Pair coin ID on CoinGecko
const pairCoinID = "matic-network";

// Your token Deployment Transaction Hash
const deploymentTxn = "0x64c8f113f763f4d2f1f03dda0c288448e97070e8e665de22956ba752dec703fa";
const liquidityPoolAddress = "0xbaf690f8087c46227144A36fEa436bf2951b7B6B";

// Addresses where tokens do not participate in circulation like owner, reserve wallets, etc.
const lockedWallets = [
    "0xEA814cd4767194027c960A4C10DAD24A9b78D689",
];

module.exports = {
    rpcurl,
    tokenAddress,
    pairAddress,
    pairTokenTicker,
    pairCoinID,
    deploymentTxn,
    liquidityPoolAddress,
    lockedWallets
};
