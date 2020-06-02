# Zilliqa API "utils".

This API is needed to verify and normalize the address, this API may be expanded in the future.

## `window.zilPay.utils`

- `BN`

See documentation at [bn.js](https://github.com/indutny/bn.js/) for more information.

for example:
```javascript
const amount = utils.units.toQa(10, utils.units.Units.Zil); // 10 zil
const gasPrice = utils.units.toQa('1000', utils.units.Units.Li);
```

- `Long`

See documentation at [long.js](https://github.com/dcodeIO/long.js). Note that long is only required if you need to serialise integers with size greater than or equal to 2^53.

for example:
```javascript
const gasLimit = utils.Long.fromNumber(9000);
```

### `units`

`fromQa(qa: BN, unit: Units, options: Options)`

Converts from `qa` (smallest unit) to `zil` or `li`.

**Parameters**

- `qa`: `BN` - the value to convert from.
- `unit`: `Units` - the unit to be converted to (`'zil' | 'qa'`).
- `options`: `Options` - an object specifying options.

`toQa(input: string | number | BN, unit: Units)`

Converts `zil` or `li` to `qa` (smallest unit).

**Parameters**

- `input`: `string | number | BN` - the value to convert from.
- `unit`: `Units` - the unit to be converted _from_ (`'zil' | 'li'`).


### `validation`

`isString(x: unknown): boolean`

Determines if a given value is a valid JS `string`.

**Parameters**

- `x`: `unknown`

**Returns**

- `boolean` - `true` if the value is a `string`.


`isBN(x: unknown): boolean`

Determines if a given value is an instance of `BN.js`.

**Parameters**

- `x`: `unknown`

**Returns**

- `boolean` - `true` if the value is a `BN` instance.


`isNumber(x: unknown): boolean`

Determines if a given value is a valid JS `number`.

**Parameters**

- `x`: `unknown`

**Returns**

- `boolean` - `true` if the string is a valid signature.

`isSignature(sig: string): boolean`

Determines if a given string is a valid Schnorr signature.

**Parameters**

- `sig`: `string`

**Returns**

- `boolean` - `true` if the string is a valid signature.


`isPubKey(pubKey: string): boolean`

Determines if a given string is a valid _uncompressed_ public key.

**Parameters**

- `pubKey`: `string`.

**Returns**

- `boolean` - `true` if the string is a valid public key.


`isBech32(address: string): boolean`

Determines if a given string is a valid Zilliqa bech32 address.

**Parameters**

- `address`: `string`.

**Returns**

- `boolean` - `true` if the string is a valid Zilliqa bech32 address.

`isAddress(address: string): boolean`

Determines if a given string is a valid address.

**Parameters**

- `address`: `string`.

**Returns**

- `boolean` - `true` if the string is an address.


**Parameters**

- `address`: `string`.

**Returns**

- `boolean` - `true` if the string is an address.


`isBech32(address: string): boolean`

Determines if a given string is a valid address in Bech32 format.

**Parameters**

- `address`: `string`.

**Returns**

- `boolean` - `true` if the string is an address.


## `window.zilPay.TypeChecker`

This API can check types.

```javascript
const testForArray = new window.zilPay.TypeChecker([])
testForArray.isArray // true
```
```javascript
const testForArray = new window.zilPay.TypeChecker([1, 2, 3])
testForArray.isArray // true
testForArray.isBoolean // false
testForArray.isFloat // false
testForArray.isFunction // false
testForArray.isInt // false
testForArray.isObject // false
testForArray.isString // false
testForArray.isSymbol // false
testForArray.isUndefined // false
```
