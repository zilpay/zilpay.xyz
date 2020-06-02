# Sending Transactions

Transactions are a formal action on a blockchain. They are always initiated in ZilPay with a call to the `createTransaction, contract.deploy, contract.call` method. They can involve a simple sending of zil, may result in sending tokens, creating a new smart contract, or changing state on the blockchain in any number of ways. They are always initiated by a signature from an _external account_, or a simple key pair.

In ZilPay, using the `window.zilPay.wallet.sign` method to sign transactions.

```javascript
const zilliqa = window.zilPay;
const utils = zilPay.utils;

const amount = utils.units.toQa(10, utils.units.Units.Zil); // 10 zil
const gasPrice = utils.units.toQa('1000', utils.units.Units.Li);
const txParams = zilliqa.transactions.new({ // Create params for our trasnaction.
	toAddr: 'zil1wl38cwww2u3g8wzgutxlxtxwwc0rf7jf27zace',
	amount: amount,
	gasPrice: gasPrice
});
try {
    const txResult = await zilliqa.blockchain.createTransaction(txParams);
} catch (err) {
    // if user rejected this transaction or other problem.
}
```

Do not forget that if you change the `window.zilPay.wallet.broadcasting` parameter to `true`, than ZilPay return signature trasnaction but don't send to blockchain!!!

## Transaction Parameters

Many transaction parameters are handled for you by ZilPay, but it's good to know what all the parameters do.

### nonce [ignored]

This field is ignored by ZilPay.

In Zilliqa every transaction has a nonce. This is so that each transaction can only be processed by the blockchain once. Additionally, to be a valid transaction, the nonce must either be `0`, or a transaction with the previous number must have already been processed.

That means that transactions are always processed in order for a given account, and so incrementing nonces is a very sensitive matter that is easy to mess up, especially when a user is interacting with multiple applications with pending transactions using the same account, potentially across multiple devices.

For these reasons, ZilPay currently does not provide application developers any way to customize the nonce of transactions it suggests, and instead assists the user in managing their transaction queue themselves.

### gasPrice [semi-optional]

Optional parameter - best used on private blockchains.

In Zilliqa, the pool of pending transactions offer their gas price as a sort of auction bid to the validators to include this transaction in a block in exchange for a transaction fee. That means high gas prices can mean faster processing, but also more expensive transactions.

ZilPay helps users select competitive gas prices in the Zilliqa core network and popular test networks. Allow users to choose by themselves.

We cannot know about the gas market on all blockchains because it requires some deep analysis. For this reason, while you can safely ignore this parameter on our main hosted networks, you may want to suggest a gas price in situations where your application knows more about the target network than we do.

### gasLimit [semi-optional]
`gasLimit` is a complicated parameter to substitute for it will be difficult therefore Dapps developers must calculate it themselves for their smart contract
 
### toAddr [semi-optional]

A `bech32, base16` Zilliqa address. Required for transactions with a recipient (all transactions except for contract creation).

Contract creation occurs when there is no `to` value but there is a `data, code` value.

### amount [semi-optional]

Please note that these numbers often used in Zilliqa are far higher precision than native JavaScript numbers, and can cause unpredictable behavior if not anticipated. For this reason, we highly recommend using [BN.js](https://github.com/indutny/bn.js/) when manipulating values intended for the blockchain.

### data [semi-optional]

Required for smart contract creation.

This field is also used for specifying contract methods and their parameters.

### code [semi-optional]

Required for smart contract creation.

This field is smart contract code.

### version [currently ignored]

Version ID is currently derived by the user's current selected network at `window.zilPay.wallet.net`. In the future we will probably allow a way to connect to multiple networks at once, at which point this parameter will become important, so it may be useful to be in the habit of including now.

