import bytecode from "./bytecode.js";
import {
	FileCreateTransaction,
	ContractCreateTransaction,
	ContractFunctionParameters,
} from "@hashgraph/sdk";

async function contractDeployFcn(walletData, accountId, tokenId) {
	console.log(`\n=======================================`);
	console.log(`- Deploying smart contract on Hedera...`);

	const hashconnect = walletData[0];
	const saveData = walletData[1];
	const provider = hashconnect.getProvider("testnet", saveData.topic, accountId);
	const signer = hashconnect.getSigner(provider);

	//Create a file on Hedera and store the hex-encoded bytecode

	// Create the smart contract
}
export default contractDeployFcn;
