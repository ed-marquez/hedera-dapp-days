import bytecode from "./bytecode.js";
import { ContractCreateFlow, ContractFunctionParameters } from "@hashgraph/sdk";
// DELETE 👇 WHEN BUG ADDRESSED
import { Client, AccountId, PrivateKey } from "@hashgraph/sdk";

async function contractDeployFcn(signer, tokenId) {
	console.log(`\n=======================================`);
	console.log(`- Deploying smart contract on Hedera...`);

	const client = Client.forTestnet();
	client.setOperator(
		AccountId.fromString("0.0.1218"),
		PrivateKey.fromStringED25519("302e020100300506032b6570042204202cf397862247a379304bfd716dc4e08926500e5e0fee9d1b8d1fe1deec4c045a")
	);

	// Create the smart contract
	const contractCreateTx = new ContractCreateFlow()
		.setBytecode(bytecode)
		.setGas(4000000)
		.setConstructorParameters(new ContractFunctionParameters().addAddress(tokenId.toSolidityAddress()));
	// const contractCreateSubmit = await contractCreateTx.executeWithSigner(signer);
	// const contractCreateRx = await contractCreateSubmit.getReceiptWithSigner(signer);
	// DELETE 👇 WHEN BUG ADDRESSED
	const contractCreateSubmit = await contractCreateTx.execute(client);
	const contractCreateRx = await contractCreateSubmit.getReceipt(client);

	const cId = contractCreateRx.contractId;
	const txId = contractCreateSubmit.transactionId.toString();
	const contractAddress = cId.toSolidityAddress();
	console.log(`- The smart contract ID is: ${cId}`);
	console.log(`- The smart contract ID in Solidity format is: ${contractAddress} \n`);

	return [cId, txId];
}
export default contractDeployFcn;
