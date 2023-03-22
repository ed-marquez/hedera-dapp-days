import { DAppConnector } from "@hashgraph/hedera-wallet-connect";
import { LedgerId } from "@hashgraph/sdk";

const ledgerId = LedgerId.TESTNET;
const network = ledgerId.toString();

async function walletConnectFcn() {
	console.log(`\n=======================================`);
	console.log("- Connecting wallet...");

	let appMetadata = {
		name: "Hedera dApp Days", // Name of your DApp
		description: "Let's buidl a dapp on Hedera", // Description for your DApp
		url: "hedera.com", // URL adress of your DApp
		icons: ["https://raw.githubusercontent.com/ed-marquez/hedera-dapp-days/testing/src/assets/hederaLogo.png"], // Icons for displaying in connector
	};
	let dAppConnector = new DAppConnector(appMetadata);

	dAppConnector.disconnect(ledgerId);
	// console.log(`${dAppConnector.initialized === true}`);

	console.log(`- init`);
	await dAppConnector.init(["someEventName"]);
	console.log(`${dAppConnector.initialized === true}`);

	console.log(`- connect`);
	await dAppConnector.connect(ledgerId);

	console.log(`- get signers`);
	let signers = dAppConnector.getSigners();
	let signer = signers[0];
	let accountId = signer.accountId.toString();

	dAppConnector.$events.subscribe((name, data) => {
		console.log(`Event ${name}: ${JSON.stringify(data)}`);
	});

	return [signer, accountId, network];
}

export default walletConnectFcn;
