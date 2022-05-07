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
	Provider,
	Wallet,
} from "@hashgraph/sdk";
import { HashConnect } from "hashconnect";

async function tokenCreateFcn(walletData, accountId) {
	const hashconnect = walletData[0];
	const saveData = walletData[1];
	const provider = hashconnect.getProvider("testnet", saveData.topic, accountId);
	const signer = hashconnect.getSigner(provider);

	const supplyKey = PublicKey.fromString(
		"302a300506032b6570032100368260e7e005ddb8557d66ddfa0c6f7c0383152edb58688c534ad9b47ef58adb"
	);
	const tokenCreateTx = await new TokenCreateTransaction()
		.setTokenName("dAppDayToken")
		.setTokenSymbol("DDT")
		.setTreasuryAccountId(accountId)
		.setAutoRenewAccountId(accountId)
		.setAutoRenewPeriod(7776000)
		.setInitialSupply(100)
		.setDecimals(0)
		.setSupplyKey(supplyKey)
		.freezeWithSigner(signer);
	const tokenCreateSubmit = await tokenCreateTx.executeWithSigner(signer);

	const sec = tokenCreateSubmit.transactionId.validStart.seconds.low;
	const nano = tokenCreateSubmit.transactionId.validStart.nanos.low;
	const txId = `${accountId}@${sec}.${nano}`;
	const tokenCreateRx = await provider.getTransactionReceipt(txId);
	const tId = tokenCreateRx.tokenId.toString();
	const supply = tokenCreateTx._initialSupply.low;

	return [tId, supply];
}

export default tokenCreateFcn;
