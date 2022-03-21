import React from "react";
import operator from "../../config.js";
import {
	Client,
	AccountId,
	PrivateKey,
	ContractFunctionParameters,
	ContractExecuteTransaction,
	AccountBalanceQuery,
	ContractInfoQuery,
} from "@hashgraph/sdk";

async function contractTokenTransferFcn(tokenId, contractId) {
	//Configure the Hedera client...

	// // STEP 4 ===================================
	console.log(`STEP 4 ===================================`);
	//Execute a contract function (transfer)
}

export default contractTokenTransferFcn;
