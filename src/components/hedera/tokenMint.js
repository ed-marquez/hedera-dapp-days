import { TokenMintTransaction } from "@hashgraph/sdk";

async function tokenMintFcn(signer, accountId, tId) {
	console.log(`\n=======================================`);
	const amount = 100;
	console.log(`- Minting ${amount} tokens...`);

	const tokenMintTx = await new TokenMintTransaction().setTokenId(tId).setAmount(amount).freezeWithSigner(signer);
	const tokenMintSubmit = await tokenMintTx.executeWithSigner(signer);
	const tokenCreateRx = await tokenMintSubmit.getReceiptWithSigner(signer);
	const supply = tokenCreateRx.totalSupply;
	console.log(`- Tokens minted. New supply is ${supply}`);

	return [supply, tokenMintSubmit.transactionId.toString()];
}

export default tokenMintFcn;
