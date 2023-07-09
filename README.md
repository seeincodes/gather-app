# Gather - Stake to Date

## Create meaningful connections offline

Gather is a dating or friendship app designed to combat the prevalent issues of ghosting and endless chatting that often hinder true connections in the digital dating sphere. Our platform emphasizes real, face-to-face meetings and minimizes online chatter, bringing dating back to its most meaningful form.

Gather tackles the problem of online dating inertia by implementing a 48-hour limit for online interaction. Once matched, users focus on making real plans, not endless small talk. We facilitate the planning process by sending tailored suggestions for meeting places and activities based on users' locations and sharPed interests.

To foster accountability, users stake crypto to confirm their meet-ups. If both parties attend, their crypto is returned. However, if a user fails to show up, their staked crypto is forfeited to a community pool and eventually donated to charity. This unique approach not only encourages commitment but also makes a positive impact by channeling funds towards charitable causes.

The Gather Dating App is not just about finding a date - it's about enhancing the overall dating experience and fostering meaningful connections while creating a positive societal impact. Through our platform, we're shaping a more accountable, interactive, and generous dating culture.

## XDC

We've chosen XDC tokens as the digital currency for our unique 'stake to date' feature. This functionality creates a higher level of commitment between users, increasing the likelihood of actual meetups. XDC tokens provide a secure, efficient, and widely accepted form of crypto asset that makes this staking process seamless.

More details about the staking mechanism can be found in our [Staking Contract](https://github.com/seeinplays/gather-app/blob/main/contracts/staking/contracts/staking.sol) on GitHub.

## Endaoment

To ensure that our app contributes positively to society, we've integrated with Endaoment. This means that when users stake but fail to meet up, their funds are not lost. Instead, they are channeled to a charity pool. This way, every 'stake to date' has a beneficial outcome, regardless of whether a meetup takes place or not.

You can review the mechanism within our [Endaoment Component](https://github.com/seeinplays/gather-app/blob/main/src/components/Endaoment.jsx) on GitHub.

## Gnosis Chain

We've deployed an ERC20 token, MEET, on Gnosis Chain. Gnosis Chain was chosen for its secure, reliable, and efficient handling of smart contracts. Our MEET token enhances the 'stake to date' process by providing a custom and native currency system for our app.

MEET token contract address: 0xCa44fe9BA1722abBf9855856866487146704E78e. More about the MEET token is available at our [Token Contracts](https://github.com/seeinplays/gather-app/tree/main/contracts/token) on GitHub.

## Scroll

We've deployed our staking contract on Scroll Network. Scroll offers low transaction fees and high-speed operations, crucial for a smooth and user-friendly staking experience. In addition, Scroll's advanced security features guarantee that every transaction is protected.

You can view the contract deployment on our [Staking Contracts](https://github.com/seeinplays/gather-app/blob/main/contracts/staking/contracts/staking) GitHub page. Contract address: 0xbA2cc8659Fc49B73ED4a7D396d1428a7bC2F66C9

## AI Matchmaking

Our AI system streamlines the meetup process by proposing a time and location for the date based on the interests and availability of both users. This intelligent matchmaking not only simplifies scheduling but also enhances the user experience by considering individual preferences and constraints, increasing the likelihood of successful and enjoyable meetups.

## Deployed on Vercel

[Link](gather-app-five.vercel.app)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
