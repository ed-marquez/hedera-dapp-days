import { Hbar, TransferTransaction } from "@hashgraph/sdk";

async function contractExecuteFcn(walletData, accountId, tokenId, contractId) {
	console.log(`\n=======================================`);
	console.log(`- Executing HBAR transfer to the smart contract...`);

	const hashconnect = walletData[0];
	const saveData = walletData[1];
	const provider = hashconnect.getProvider("testnet", saveData.topic, accountId);
	const signer = hashconnect.getSigner(provider);

	// Execute a transfer of HBAR from the operator account to the contract
	const transferTx = await new TransferTransaction().addHbarTransfer(accountId, new Hbar(-1)).addHbarTransfer(contractId, new Hbar(1)).freezeWithSigner(signer)
	const transferTxSign = await transferTx.signWithSigner(signer);
	const transferTxSubmit = await transferTxSign.executeWithSigner(signer);
	const transferTxRx = await provider.getTransactionReceipt(transferTxSubmit.transactionId);
	console.log(`- HBAR transfer from Operator to contract: ${transferTxRx.status.toString()}`);

	const bCheck = await signer.getAccountBalance();
	console.log(
		`- Operator balance: ${bCheck.tokens._map.get(tokenId.toString())} units of token ${tokenId}`
	);

	return transferTxSubmit.transactionId;
}

export default contractExecuteFcn;
