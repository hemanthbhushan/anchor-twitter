import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { utils, BN } from "@project-serum/anchor";
import { AnchorTwitter } from "../target/types/anchor_twitter";
import { expect } from "chai"

describe("anchor-twitter", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  console.log(provider , "provider")
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorTwitter as Program<AnchorTwitter>;
  const user = anchor.web3.Keypair.generate();
  const tweet = anchor.web3.Keypair.generate()
  it("Is initialized!", async () => {
    const tx = await program.methods.tweet("hemanth").accounts({tweet : tweet.publicKey }).signers([tweet]).rpc();
    console.log(tweet.publicKey , "tweet.publicKey")
    console.log(provider.wallet.publicKey , "user.publicKey")
    const account = await program.account.tweet.fetch(tweet.publicKey)
    console.log(account.tweetText , "account.tweetText")
    console.log(account.user , "account.user")
    console.log("Your transaction signature", tx);
    expect(account.tweetText.includes("hemanth")).equal(true);
  });
});
