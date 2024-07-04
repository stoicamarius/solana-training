require('dotenv').config({ path: '../.env' });
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";

const user = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"), {
  commitment: "confirmed",
});

const recipient = new PublicKey('Hpxx4vFJyEDA7KGosZs1RdRRkqGYsunAoeV6sWEGJFHD');
const tokenMintAddress = new PublicKey("7GMKkj6JmUqxkKx5NUz9MBfTccvfN3V7Q5GjgRK3fa6d");
const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAddress,
  recipient,
);

const link = getExplorerLink("address", tokenAccount.address.toString(), "devnet");

console.log({ link });

const mintTxSig = await mintTo(
  connection,
  user,
  tokenMintAddress,
  tokenAccount.address,
  user,
  100 * LAMPORTS_PER_SOL
);

const mintLink = getExplorerLink("transaction", mintTxSig, "devnet");

console.log({ mintLink });