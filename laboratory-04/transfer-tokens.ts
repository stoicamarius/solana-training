require('dotenv').config({ path: '../.env' });
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";
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
  user.publicKey,
);

const link = getExplorerLink("address", tokenAccount.address.toString(), "devnet");

console.log({ tokenAccount: link });

const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAddress,
  recipient,
);

const link2 = getExplorerLink("address", recipientTokenAccount.address.toString(), "devnet");

console.log({ recipientTokenAccount: link2 });

const transferTx = await transfer(
  connection,
  user,
  tokenAccount.address,
  recipientTokenAccount.address,
  user.publicKey,
  50 * LAMPORTS_PER_SOL
);

const transferLink = getExplorerLink("transaction", transferTx, "devnet");

console.log({ transferLink });