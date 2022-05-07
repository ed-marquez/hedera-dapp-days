import React from "react";
import operator from "../../config.js";
import {
	Client,
	AccountId,
	PrivateKey,
	TokenCreateTransaction,
	TokenMintTransaction,
	FileCreateTransaction,
	ContractCreateTransaction,
	ContractFunctionParameters,
	ContractExecuteTransaction,
	TokenInfoQuery,
	AccountBalanceQuery,
	Hbar,
	ContractInfoQuery,
} from "@hashgraph/sdk";

async function tokenMintFcn(walletData, accountId, tId) {
	const hashconnect = walletData[0];
	const saveData = walletData[1];
	const provider = hashconnect.getProvider("testnet", saveData.topic, accountId);
	const signer = hashconnect.getSigner(provider);

	console.log("- Minting new tokens!");
	const tokenMintTx = await new TokenMintTransaction()
		.setTokenId(tId)
		.setAmount(100)
		.freezeWithSigner(signer);
	const tokenMintSubmit = await tokenMintTx.executeWithSigner(signer);

	const sec = tokenMintSubmit.transactionId.validStart.seconds.low;
	const nano = tokenMintSubmit.transactionId.validStart.nanos.low;
	const txId = `${accountId}@${sec}.${nano}`;
	const tokenCreateRx = await provider.getTransactionReceipt(txId);
	const supply = tokenCreateRx.totalSupply;

	return supply;
}

export default tokenMintFcn;
