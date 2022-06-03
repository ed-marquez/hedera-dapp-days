import { ContractFunctionParameters, ContractExecuteTransaction } from "@hashgraph/sdk";

async function contractExecuteFcn(walletData, accountId, tokenId, contractId) {
	console.log(`\n=======================================`);
	console.log(`- Executing the smart contract...`);

	const hashconnect = walletData[0];
	const saveData = walletData[1];
	const provider = hashconnect.getProvider("testnet", saveData.topic, accountId);
	const signer = hashconnect.getSigner(provider);

	//Execute a contract function (transfer)
}

export default contractExecuteFcn;
