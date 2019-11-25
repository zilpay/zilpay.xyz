# Getting Started

To develop for ZilPay, you're first going to want to get ZilPay installed on your development machine. [Download here](https://zilpay.xyz/).

Once you have it running, you should find that new browser tabs have a `window.zilPay` object available in the console. This is the way ZilPay provides for you to interact with it.

You can review the full API for that object [here](../zilliqa-provider).

## Basic Considerations

### ZilPay Detection

The first thing your app will want to do is verify whether the user is using ZilPay or not, which is simple using a check like `if (typeof window.zilPay !== 'undefined') { /* deal with it */ }`.

### Running a Test Network

In the top right menu of ZilPay, you can select the network that you are currently connected to. Among several popular defaults, you'll find `Custom RPC` and `Localhost:4200`. These are both useful for connecting to a test blockchain, like [Kaya](https://github.com/Zilliqa/kaya), which you can quickly install and start if you have `npm` installed with `npm install -g kaya-cli`.

Since your seed phrase is the power to control all your accounts, it is probably worth keeping at least one seed phrase for development, separate from any that you use for storing real value. One easy way to manage multiple seed phrases with ZilPay is with multiple browser profiles, each of which can have its own clean extension installations.

#### Resetting Your Local Nonce Calculation

To clear ZilPay transactions queue, and effectively reset its nonce calculation, you can use the `CLEAR` button in `Setting -> General -> CLEAR`.

### User State

Currently there are a few stateful things you want to consider when interacting with this API:

- What is the current network?
- What is the current account?
- Has the user allowed work with your site?
- Is ZilPay unlocked?
- Enable is broadcasting?

Both of these are available synchronously as `window.zilPay.wallet`. You can listen for changes using events, too ([see the observable state](../zilliqa-provider/#window-zilpay-wallet-observablenetwork)).

### Connection In

When you're ready to request the user connect in, you can call this simple method:

```javascript
window.zilPay.wallet.connect()
```

This promise-returning function resolves with a Boolean value, true if user access and false if use reject your requests.

Over time, this method is intended to grow to include various additional parameters to help your site request all the setup it needs from the user during setup.

Since it returns a promise, if you're in an `async` function, you may log in like this:

```javascript
const status = await connect();
status === window.zilPay.wallet.isConnect;
```
if the user has allowed then ZilPay will remember this and will no longer ask.

You can also remove all Dapps from ZilPay by going to ```Setting -> Security & Privacy -> CLEAR DATA```

## Choosing a Convenience Library

Convenience libraries exist for a variety of reasons.

Some of them simplify the creation of specific user interface elements, some entirely manage the user account onboarding, and others give you a variety of methods of interacting with smart contracts, for a variety of API preferences, from promises, to callbacks, to strong types, and on.

The provider API itself is very simple, and wraps [Zilliqa-JavaScript-Library](https://github.com/Zilliqa/Zilliqa-JavaScript-Library) . You can generally find sufficient documentation to interact with the provider, without reading this lower-level API.

