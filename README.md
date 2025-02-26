# Grape Staking UI powerd by Cardinal

This repository hosts the inteface that powers **https://grapestake.vercel...** for staking NFTs on Solana.

Use this repo to create and deploy stake pools with built-in reward distribution, or build your own custom interface with our underlying staking protocol.

For questions or technical help, join our **[Discord](https://discord.gg/stX2FAYbVq)**.

---

<div style="text-align: center; width: 100%;">
  <img style="height: 450px" src="./images/staking.png" />
</div>

### Installation

To get started, clone the repo and run:

```bash
yarn install
```

Next, run the development server:

```bash
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the staking interface running locally.

### Set your Cluster

To access different clusters in the scaffold, set the `cluster` query parameter in the URL:

- Mainnet - http://localhost:3000?cluster=mainnet
- Devnet - http://localhost:3000?cluster=devnet
- Testnet - http://localhost:3000?cluster=testnet

The default cluster set is **mainnet**. It's recommended to ensure you have `?cluster=devnet` while testing out functionality.

### Create a Stake Pool

To create a stake pool, navigate to the admin page located at http://localhost:3000/admin. This page hosts a form to create a stake pool with various configurations.

**Note:** All configurations in the admin page are optional. Also, filters in the stake pool configuration are **union-based**, if any one of the conditions is met, then the NFT will be allowed to stake in the pool.

After creating your stake pool, you will receive a **`Stake Pool Id`**. View your stake pool at http://localhost:3000/[stakePoolId]

**Pool Creation Parameters:**

```typescript
export type StakePoolParams {
    requiresCollections?: PublicKey[];
    requiresCreators?: PublicKey[];
    requiresAuthorization?: boolean;
    overlayText?: string;
    imageUri?: string;
    resetOnStake?: boolean;
  }
```

**Reward Distribution Parameters**

```typescript
export type RewardDistributionParams {
    stakePoolId: PublicKey;
    rewardMintId: PublicKey;
    rewardAmount?: BN;
    rewardDurationSeconds?: BN;
    kind?: RewardDistributorKind;
    maxSupply?: BN;
    supply?: BN;
  }
```

There are two types of reward distribution (RewardDistributionKind) with Cardinal Staking.

1. **Mint** - give mint authority of your reward token to the stake pool so the pool can mint on demand
2. **Treasury** - transfer reward tokens from your wallet to the stake pool, top-up the stake pool treasury balance whenever needed.

## Accessing your Stake Pool

In order to easily access your stake pool, airdrop NFTs on devnet for your specific collection and get a stake.cardinal.so/[projectName] url, you'll need to create a Stake Pool metadata object. NOTE if you specified a verified creator in a devnet pool, airdropped NFTs will not be allowed into that pool because your creator will not be verified.

```typescript
export type StakePoolMetadata = {
  // Name of this stake pool used as an id. Should be in lower-case kebab-case since it is used in the URL as /{name}
  // https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Why-you-should-make-kebab-case-a-URL-naming-convention-best-practice
  name: string
  // Display name to be displayed in the header. Often the same as name but with capital letters and spaces
  displayName: string
  // Publickey for this stake pool
  stakePoolAddress: PublicKey
  // Default receipt type. Setting this will remove the option for the user to choose which receipt type to use
  receiptType?: ReceiptType
  // Colors object to style the stake page
  colors?: {
    primary: string
    secondary: string
    accent?: string
    fontColor?: string
  }
  // Image url to be used as the icon in the pool selector and the header
  imageUrl?: string
  // Website url if specified will be navigated to when the image in the header is clicked
  websiteUrl?: string
  // Max staked is used to compute percentage of total staked
  maxStaked?: number
  // Links to show at the top right of the page
  links?: { text: string; value: string }[]
  // On devnet when you click the airdrop button on this page it will clone NFTs with this metadata and airdrop to the user
  airdrops?: AirdropMetadata[]
}
```

In `api/mapping.ts`, add your own object to the stakePoolMetadatas array. You'll now be able to access your project at http://localhost:3000/[name].

In order to get a custom Cardinal URL, **deploy your pool** on mainnet and then **make a PR** to our `api/mapping.ts` file in this repo with updates containing your pool's metadata.

---
