import { TokenMintTransaction } from "@hashgraph/sdk";

async function tokenMintFcn(walletData, accountId, tId) {
	console.log(`\n=======================================`);
	const amount = 100;
	console.log(`- Minting ${amount} tokens...`);

	const hashconnect = walletData[0];
	const saveData = walletData[1];
	const provider = hashconnect.getProvider("testnet", saveData.topic, accountId);
	const signer = hashconnect.getSigner(provider);

	// Mint new tokens
}

export default tokenMintFcn;
