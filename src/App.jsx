import React, { useState } from "react";
import MyGroup from "./components/MyGroup.jsx";
import walletConnectFcn from "./components/hedera/walletConnect.js";
import tokenCreateFcn from "./components/hedera/tokenCreate.js";
import tokenMintFcn from "./components/hedera/tokenMint.js";
import contractDeployFcn from "./components/hedera/contractDeploy.js";
import contractTokenTransferFcn from "./components/hedera/contractTokenTransfer.js";
import "./styles/App.css";

function App() {
	const [walletData, setWalletData] = useState();
	const [accountId, setAccountId] = useState();
	const [tokenId, setTokenId] = useState();
	const [tokenSupply, setTokenSupply] = useState();
	const [contractId, setContractId] = useState();

	const [createTextSt, setCreateTextSt] = useState("👆 Waiting to create token...");
	const [mintTextSt, setMintTextSt] = useState("");
	const [contractTextSt, setContractTextSt] = useState();
	const [trasnferTextSt, setTransferTextSt] = useState();

	async function connectWallet() {
		const wData = await walletConnectFcn();
		wData[0].pairingEvent.once((pairingData) => {
			pairingData.accountIds.forEach((id) => {
				setAccountId(id);
				console.log(`\n- Paired account id: ${id}`);
			});
		});
		setWalletData(wData);
	}

	async function tokenCreate() {
		if (tokenId !== undefined) {
			setCreateTextSt(`You already have token ${tokenId}`);
		} else {
			const [tId, supply] = await tokenCreateFcn(walletData, accountId);
			setTokenId(tId);
			setTokenSupply(supply);
			setCreateTextSt(`Successfully created token with ID: ${tId}`);
			setMintTextSt();
			setContractTextSt();
			setTransferTextSt();
		}
	}

	async function tokenMint() {
		if (tokenId === undefined) {
			setMintTextSt("Create a token first!");
		} else {
			const supply = await tokenMintFcn(tokenId);
			setTokenSupply(supply);
			setMintTextSt(`Supply of token ${tokenId} is ${supply}!`);
		}
	}

	async function contractDeploy() {
		if (tokenId === undefined) {
			setContractTextSt("Create a token first!");
		} else if (contractId !== undefined) {
			setContractTextSt(`You already have contract ${contractId}`);
		} else {
			const cId = await contractDeployFcn(tokenId);
			setContractId(cId);
			setContractTextSt(`Successfully deployed smart contract with ID: ${cId}`);
		}
	}

	async function contractTokenTransfer() {
		if (tokenId === undefined || contractId === undefined) {
			setTransferTextSt("Create a token AND deploy a contract first!");
		} else {
			await contractTokenTransferFcn(tokenId, contractId);
			setTransferTextSt(`🎉🎉🎉Great job! You completed the demo🎉🎉🎉`);
		}
	}

	return (
		<div className="App">
			<h1 className="header ">Let's build a cool dApp on Hedera!</h1>
			<MyGroup fcn={connectWallet} buttonLabel={"Connect to a Wallet"} text={"connect here..."} />
			{/*  */}
			<MyGroup fcn={tokenCreate} buttonLabel={"Create New Token"} text={createTextSt} />
			{/*  */}
			<MyGroup fcn={tokenMint} buttonLabel={"Mint 100 New Tokens"} text={mintTextSt} />
			{/*  */}
			<MyGroup fcn={contractDeploy} buttonLabel={"Deploy Contract"} text={contractTextSt} />
			{/*  */}
			<MyGroup
				fcn={contractTokenTransfer}
				buttonLabel={"Transfer Tokens to Contract"}
				text={trasnferTextSt}
			/>
			{/*  */}
			<img src={require("./assets/hederaLogo.png")} alt="Hedera" />
		</div>
	);
}
export default App;
