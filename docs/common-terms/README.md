# Common Terms

## Words are Hard
This is a list of terms you might encounter when using the ZilPay interface.

### Wallet
 * The interface / client / wrapper / holder that you use to manage your account(s).
 * Example: ZilPay.xyz, your Ledger Hardware Wallet, Zillet, MetaMask a Multisig Wallet Contract.

### Account
    * A public & private keypair that "holds" your funds.
    * Your funds are actually stored on the blockchain, not in the wallet or account.
Just like your Reddit account has a <code> username (public)</code> and <code> password (private)</code>, so does your Ethereum account. For additional security, you can use a password to encrypt your private key which would result in a <code> username (public)</code> and <code> password (private)</code> and <code> password for that password (private + more secure)</code>. See the <code> Keystore File</code> section. 

### Address _("Public Key")_
 - You use this to send funds to an account.
 - Sometimes referred to as the "public key"
 - A string made up of ```zil``` + ```39 characters``` Bech32 format.
 - In Zilliqa, the address begins with ```zil```.
 - Example: ```zil1wl38cwww2u3g8wzgutxlxtxwwc0rf7jf27zace```

### Public Key
 - In cryptography, you have a keypair: the public and private key.
 - You can derive a public key from a private key, but cannot derive a private key from a public key.

### Private Key
- You use this to send funds `from` an account.
- The secret half of your Address / public key.
- A string of 64 hexadecimal characters.
- [Every string of 64 hexadecimal characters is a private key.](https://crypto.stackexchange.com/questions/30269/are-all-possible-ec-private-keys-valid)
- This is the string you need to send from your account. Without it you cannot access your funds. Although, you don't need to save this raw, unencrypted private key in this format. You can saving the fancy versions of it (e.g. the Keystore File / Mnemonic Phrase).
- Example: `3375F915F3F9AE35E6B301B7670F53AD1A5BE15D8221EC7FD5E503F21D3450C8`>

### Mnemonic Phrase / Seed Phrase / Seed Words
- Another fancy version of your private key, that is actually used to derive multiple private keys.
- A (typically) 12 or 24 word phrase that allows you to access infinite number of accounts.
- Used by Ledger, TREZOR, ZilPay, MetaMask, and others.
- The accounts you can access with this phrase are determined by the "path".
- Example 12-words: "target frequent bundle imitate spell spatial idle ginger volcano render genius object"

### Hardware Wallet:
- Typically, a single-purpose device that "holds" your private key(s), ensuring your private keys are safe.
- Typically, they use a 24-word phrase. This phrase you should write down (not on your computer) and store separately from your hardware wallet.
- If you lose your hardware wallet, you can still gain access to your accounts funds via the word-phrase you wrote down.
- Never type the word-phrase on your computer. It defeats the purpose of your hardware wallet.
- See here for more information about Hardware Wallets.

### Hexadecimal
Used all over Ethereum for a variety of things, a hexadecimal string is comprised of the numbers `0 1 2 3 4 5 6 7 8 9` and `A B C D E F`.

### Encryption
- Encryption is the act of taking a string of letters/numbers, like your private key, and turning them into another string of letters/numbers through a method of private translation.
- There are various different encryption methods.
- Encryption offers protection against those trying to steal your information!

### Encrypted vs Unencrypted Keys
- An unencrypted private key is 64 characters long, and it is used to unlock or restore wallets.
- An encrypted key is also 64 letters long and is a regular private key that has gone through the process of encryption, as defined above.
- For example, if the world ‘Apple’ was your shortened private key, then it was encrypted three letters down the alphabet, your new shortened encrypted key would be ‘Dssoh’. Since you know the way to encrypt this key, you could derive the original private key from it by reversing the method of encryption.
- Usually encrypted private keys are kept within the extension or device they are encrypted by, and they remain out of sight from the user. This is meant to add another layer of security to keep a user’s wallet information safe.

### Decentralize / Decentralization
The process of transferring authority of a single entity (ex. Government or large corporation) to multiple smaller entities.

### Trustless
A distributed trustless consensus which the blockchain is responsible for. Since everyone has a copy of the ledger of all transactions ever executed, there is no need for a third-party. You can verify the transactions yourself, however the Ethereum blockchain and Bitcoin blockchain were created to ensure rules and agreements between all parties are executed when all conditions are met.

### Smart Contracts
A piece of code (or program) that is stored on the blockchain network. Conditions of the contract are predefined by the users, if all conditions are met, certain actions are executed by the contract (program).

### Blockchain
A decentralized publicly owned ledger.


Thanks to for this Glossary's starting point [MyCrypto](https://support.mycrypto.com/getting-started/ethereum-glossary.html)
