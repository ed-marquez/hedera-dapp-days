import React from "react";
import operator from "../../config.js";
import { HashConnect } from "hashconnect";

async function walletConnectFcn() {
	console.log("- Connecting wallet");

	let hashconnect = new HashConnect();

	let accountId = "";

	let saveData = {
		topic: "",
		pairingString: "",
		privateKey: "",
		pairedWalletData: null,
		pairedAccounts: [],
	};

	let appMetadata = {
		name: "dApp Day Example",
		description: "An example hedera dApp",
		icon: "https://www.hashpack.app/img/logo.svg",
	};

	//first init and store the private for later
	const initData = await hashconnect.init(appMetadata);
	saveData.privateKey = initData.privKey;
	console.log(`\n- Private key for pairing: ${saveData.privateKey}`);

	//then connect, storing the new topic for later
	const state = await hashconnect.connect();
	saveData.topic = state.topic;
	console.log(`\n- Pairing topic is: ${saveData.topic}`);

	//generate a pairing string, which you can display and generate a QR code from
	saveData.pairingString = hashconnect.generatePairingString(state, "testnet", false);

	//find any supported local wallets
	hashconnect.findLocalWallets();
	hashconnect.connectToLocalWallet(saveData.pairingString);

	hashconnect.pairingEvent.once((pairingData) => {
		pairingData.accountIds.forEach((id) => {
			accountId = id;
			console.log(`\n- Paired account id: ${id}`);
		});
	});

	// const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	// await delay(3000);

	console.log(`Test point${accountId}`);
	return [hashconnect, accountId, saveData];
}

export default walletConnectFcn;