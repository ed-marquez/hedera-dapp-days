import { ContractFunctionParameters, ContractExecuteTransaction } from "@hashgraph/sdk";

async function contractExecuteFcn(signer, tokenId, contractId) {
	console.log(`\n=======================================`);
	console.log(`- Executing the smart contract...`);

	//Execute a contract function (transfer)
	const contractExecTx = await new ContractExecuteTransaction()
		.setContractId(contractId)
		.setGas(3000000)
		.setFunction("tokenAssoTrans", new ContractFunctionParameters().addInt64(50))
		.freezeWithSigner(signer);
	const contractExecSign = await contractExecTx.signWithSigner(signer);
	const contractExecSubmit = await contractExecSign.executeWithSigner(signer);
	const contractExecRx = await contractExecSubmit.getReceiptWithSigner(signer);
	console.log(`- Token transfer from Operator to contract: ${contractExecRx.status.toString()}`);

	const txId = contractExecSubmit.transactionId.toString();
	const bCheck = await signer.getAccountBalance();
	console.log(`- Operator balance: ${bCheck.tokens[0].balance} units of token ${tokenId}`);

	return txId;
}

export default contractExecuteFcn;
