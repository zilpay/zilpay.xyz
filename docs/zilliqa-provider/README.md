# API Reference

ZIlPay injects a global API into websites visited by its users at `window.zilPay`. This API allows websites to request user login, load data from blockchains the user has a connection to, and suggest the user sign messages and transactions. You can use this API to detect the user of a ZiPay.

```javascript
if (typeof window.zilPay !== 'undefined') {
  // ZilPay user detected. You can now use the provider.
  const zilliqa = window.zilPay;
}
```

The provider API itself is very simple, and wraps Zilliqa JSON-RPC formatted messages, which is why developers usually use a convenience library for interacting with the provider, like [Zilliqa-JavaScript-Library](https://github.com/Zilliqa/Zilliqa-JavaScript-Library). You can generally find sufficient documentation to interact with the provider, without reading this lower-level API.

However, for developers of convenience libraries, and for developers who would like to use features that are not yet supported by their favorite libraries, knowledge of the provider API is essential.

## Properties

These properties can be used to check the current state of the connected user, which can be important things to verify before sending a transaction:

### `window.zilPay.wallet.net`

Returns a string representing the current blockchain's network ID. A few example values:
- mainnet
- testnet
- private


### `window.zilPay.wallet.defaultAccount`

Returns a `object` with different address format :
```javascript
{
    base16: "0xf0D679Dd9cAD89FB941ea4e7687aA90019E1023A",
    bech32: "zil17rt8nhvu4kylh9q75nnks74fqqv7zq36jyy3vu"
}
```


### `window.zilPay.wallet.isEnable`

Returns `true` or `false`, representation is unlocked wallet ZilPay.

## Methods

### `window.zilPay.wallet.connect()`

Requests the user provides an zilliqa access to be identified by. Returns a promise boolean.

Example usage (ES6), assuming [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function):

```javascript
const isConnect = await window.zilPay.wallet.connect();
if (isConnect) {
    // do something...
} else {
    throw new Error('user rejected');
}
```
Example usage (ES5):

```javascript
window.zilPay.wallet.connect()
    .then(function (accounts) {
        if (isConnect) {
            // do something...
        } else {
            throw new Error('user rejected');
        }
    })
    .catch(function (error) {
    // Handle error. Likely the user rejected the login
    console.error(error)
    })
```

### Sign message

* Create message signature and Verify via [Zilliqa-js](https://github.com/Zilliqa/Zilliqa-JavaScript-Library):

```javascript
const message = 'ZilPay the best wallet!';
const { signature, message, publicKey } = await window.zilPay.wallet.sign(message); // Sign mesg via ZilPay.

// nodejs code...
import { sha256 } from 'js-sha256'
import { schnorr } from '@zilliqa-js/crypto'

const message = 'ZilPay the best wallet!';
const publicKey = '034f734a1dd79cd1b6dce193d243cc1fd5688ce264a02ca82c6cf1d80f2967e9d5'
const hashStr = sha256(message)
const hashBytes = Buffer.from(hashStr, 'hex')
const myZilPaySignature = '17644c45eab5124a47b8df6a9014d8e2d34912b30a018fb1139a1ca51565f36932504eacc7f9d4ebaa9e3ae96982719f13e6574ee9a8153ec3c77237588eb368'
const signature = schnorr.toSignature(myZilPaySignature)
const verify = schnorr.verify(
    hashBytes,
    signature,
    Buffer.from(publicKey, 'hex')
)
```

### `window.zilPay.wallet.observableAccount`

This method is required for the monitored user account, use the subscription only once and if you don't needed monitored account you  need unsubscribe.

```javascript
const accountStreamChanged = window.zilPay.wallet.observableAccount();
accountStreamChanged.subscribe(account => ...);
// If you do not need to track, you need to cancel the unsubscribe.
accountStreamChanged.unsubscribe();
```

### `window.zilPay.wallet.observableNetwork`

This method is required for the monitored user account, use the subscription only once and if you don't needed monitored account you  need unsubscribe.

```javascript
const networkStreamChanged = window.zilPay.wallet.observableNetwork();
accountStream.subscribe(net => ...);
// If you do not need to track, you need to cancel the unsubscribe.
accountStream.unsubscribe();
```

### `window.zilPay.wallet.observableBlock`

This method is required for the monitored user account, use the subscription only once and if you don't needed monitored account you  need unsubscribe.

When new block has been created, then this method show all block information.
This method use socket connection!
```javascript
const block = window
    .zilPay
    .wallet
    .observableBlock()
    .subscribe(block => / do something... /);
// If you do not need to track, you need to cancel the unsubscribe.
block.unsubscribe();
```

### `window.zilPay.wallet.observableTransaction`

This method is required for the monitored user account, use the subscription only once and if you don't needed monitored account you  need unsubscribe.

This method observable the new block and filtred by hash
```javascript
const block = window
    .zilPay
    .wallet
    .observableTransaction(
        // this args add to tranasctionQueue.
        '1c8da22d431bf411a9732d91ef89252f4b949215bdaaa4011ecfe753cfe50ec5',
        '06172676beee00682b92d353337d69f4965c857f3205488d04d76b5b40a2f9dc'
    )
    .subscribe(hashs => / do something... /);
    // If the tranasction has been mined and confirmed, then this method
    // emit the hash tx.

// this method is adding to transactionQueue hashs for observable.
// This method is working with the `observableTransaction`,
// if the `observableTransaction` has not subscribed, then this is not working!!!
window.zilPay.wallet.addTransactionsQueue(
  '1c8da22d431bf411a9732d91ef89252f4b949215bdaaa4011ecfe753cfe50ec5',
  '31231431bf411dffgdfa9732d91e3d52f4b94921adsddd4011ecfe753cfe50ec5'
)

// If you do not need to track, you need to cancel the unsubscribe.
block.unsubscribe();
```
