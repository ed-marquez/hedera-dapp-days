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
import { HashConnect } from "hashconnect";

async function tokenCreateFcn(walletData) {
	// const operatorId = AccountId.fromString(operator.id);
	// const operatorKey = PrivateKey.fromString(operator.pvkey);
	// const client = Client.forTestnet().setOperator(operatorId, operatorKey);

	// console.log("- Creating token");

	// const tokenCreateTx = new TokenCreateTransaction()
	// 	.setTokenName("dAppDayToken")
	// 	.setTokenSymbol("DDT")
	// 	.setTreasuryAccountId(operatorId)
	// 	.setInitialSupply(100)
	// 	.setDecimals(0)
	// 	.setSupplyKey(operatorKey)
	// 	.freezeWith(client);
	// const tokenCreateSign = await tokenCreateTx.sign(operatorKey);
	// const tokenCreateSubmit = await tokenCreateSign.execute(client);
	// const tokenCreateRec = await tokenCreateSubmit.getRecord(client);
	// const tId = tokenCreateRec.receipt.tokenId;
	// const supply = tokenCreateTx._initialSupply.low;
	//
	const hashconnect = walletData[0];
	// const accountId = walletData[1];
	const accountId = "0.0.2520793";
	const saveData = walletData[2];

	const provider = hashconnect.getProvider("testnet", saveData.topic, accountId);
	const signer = hashconnect.getSigner(provider);

	console.log("- Creating token");

	const tokenCreateTx = await new TokenCreateTransaction()
		.setTokenName("dAppDayToken")
		.setTokenSymbol("DDT")
		.setTreasuryAccountId(accountId)
		.setAutoRenewAccountId(accountId)
		.setAutoRenewPeriod(7776000)
		.setInitialSupply(100)
		.setDecimals(0)
		// .setSupplyKey(operatorKey)
		.freezeWithSigner(signer);
	const tokenCreateSubmit = await tokenCreateTx.executeWithSigner(signer);
	const tokenCreateRec = await tokenCreateSubmit.getRecord(signer);
	const tId = tokenCreateRec.receipt.tokenId;
	const supply = tokenCreateTx._initialSupply.low;

	return [tId, supply];
}

export default tokenCreateFcn;
