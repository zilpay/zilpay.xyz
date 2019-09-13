# Accessing Accounts

User accounts are used in a variety of contexts in Zilliqa, they serve as neat identifiers, but no use as as important as calling _wallet methods_, methods that involve a signature or transaction approval. All of those methods require the sending account as a function parameter:

- ```createTransaction```
- ```contract.deploy```
- ```contract.call```

Once you’ve connected to a user, you can always re-check the current account by checking ```window.zilPay.wallet.defaultAccount```.

If you'd like to be notified when the address changes or netwrok, we have an event you can subscribe to:

```javascript
window.zilPay.wallet.observableAccount().subscribe(function (account) {
    // ... When user changed account
});
window.zilPay.wallet.observableNetwork().subscribe(function (net) {
    // ... When user changed network
});
```


If this isn't the account or network you expected, you should notify the user!
