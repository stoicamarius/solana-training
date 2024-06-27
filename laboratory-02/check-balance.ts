import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

console.log('Connected to devnet');

const publicKey = new PublicKey("Hpxx4vFJyEDA7KGosZs1RdRRkqGYsunAoeV6sWEGJFHD");

const balance = await connection.getBalance(publicKey);
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log(`balance = ${balanceInSol}`);