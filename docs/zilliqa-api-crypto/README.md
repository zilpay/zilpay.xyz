# Zilliqa API "crypto".

This API is needed to verify and normalize the address, this API may be expanded in the future.

## `window.zilPay.crypto`

- `fromBech32Address(address: string): String`

This method receive address in format Bech32 and returns address in format base16.

for example:
```javascript
const address = 'zil17rt8nhvu4kylh9q75nnks74fqqv7zq36jyy3vu';
const base16Address = window.zilPay.crypto.fromBech32Address(address);
```
```string
0xf0D679Dd9cAD89FB941ea4e7687aA90019E1023A
```

- `toBech32Address(address: string): String`

This method is the opposite for `fromBech32Address`, receive base16 address format and return Bech32.

for example:
```javascript
const address = '0xf0D679Dd9cAD89FB941ea4e7687aA90019E1023A';
const bech32Address = window.zilPay.crypto.toBech32Address(address);
```
```string
zil17rt8nhvu4kylh9q75nnks74fqqv7zq36jyy3vu
```

- `isValidChecksumAddress(address: string): Boolean`

This method receive address in only base16 format and calculate Checksum.

for example:
```javascript
const address = '0xf0D679Dd9cAD89FB941ea4e7687aA90019E1023A';
const isValidAddress = window.zilPay.crypto.isValidChecksumAddress(address);
```
```boolean
true
```

- `toChecksumAddress(address: string): String`

maybe could situations when the address of the old format can come for these cases there is a method `toChecksumAddress`.

for example:
```javascript
const address = 'f0D679Dd9cAD89FB941ea4e7687aA90019E1023A';
const normalizeAddress = window.zilPay.crypto.toChecksumAddress(address);
```
```string
0xf0D679Dd9cAD89FB941ea4e7687aA90019E1023A
```
