import axios from "axios";
import { TokenCreateTransaction, PublicKey } from "@hashgraph/sdk";

async function tokenCreateFcn(walletData, accountId) {
	console.log(`\n=======================================`);
	console.log(`- Creating HTS token...`);

	const hashconnect = walletData[0];
	const saveData = walletData[1];
	const provider = hashconnect.getProvider("testnet", saveData.topic, accountId);
	const signer = hashconnect.getSigner(provider);

	// Create new HTS fungible token
}

export default tokenCreateFcn;
