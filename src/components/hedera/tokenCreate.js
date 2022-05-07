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
	TransactionId,
	PublicKey,
} from "@hashgraph/sdk";
import { HashConnect } from "hashconnect";

async function tokenCreateFcn(walletData, aId) {
	const accountId = AccountId.fromString(aId);
	const hashconnect = walletData[0];
	const saveData = walletData[1];

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

	const sec = tokenCreateSubmit.transactionId.validStart.seconds.low;
	const nano = tokenCreateSubmit.transactionId.validStart.nanos.low;
	const txId = `${accountId}@${sec}.${nano}`;
	console.log(`- Transaction ID: ${txId}`);

	const tokenCreateRx = await provider.getTransactionReceipt(txId);
	const tId = tokenCreateRx.tokenId.toString();
	const supply = tokenCreateTx._initialSupply.low;

	return [tId, supply];
}

export default tokenCreateFcn;
