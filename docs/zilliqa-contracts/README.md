# Zilliqa API "contract".

## `window.zilPay.contracts`

Object for managing Scilla smart contracts on the Zilliqa blockchain.

### Static Methods:

`static getAddressForContract(tx: Transaction): string`

Computes the address for a contract deployment by concatenating
`senderAddress` and `nonce` and hasing the resulting bytes. Note that this
method will not compute an accurate address if the provided `nonce` is not up
to date with the actual nonce on the blockchain.

**Parameters**

- `tx`: `Transaction` - a `Transaction` with `nonce` and `senderAddress`.

**Returns**

- The compute contract address.

### Instance Methods

`at(address: string, abi: ABI, code: string, init?: Init, state?: State): Contract`

Constructs a `Contract` with the provided parameters. It is recommended that
this method by used only to construct contracts that have already been
deployed.

**Parameters**

- `address`: `string` - the contract address.
- `abi`: `ABI` (optional) - the ABI return by `scilla-checker`.
- `code`: `string` (optional) - UTF-8 encoded Scilla smart contract code.
- `init`: `Init` (optional) - the initialisation parameters of the smart contract.
- `state`: `State` (optional) - the current smart contract state.

**Returns**

- `Contract` - a `Contract` instance.

`new(code: string, init: Init, abi?: ABI): Contract`

Constructs a `Contract` with the provided parameters, that is not deployed.
The contract may subsequently be deployed.

**Parameters**

- `code`: `string` - UTF-8 encoded Scilla smart contract code.
- `init`: `Init` - the initialisation parameters of the smart contract.
- `abi`: `ABI` (optional) - the ABI return by `scilla-checker`.

**Returns**

- `Contract` - a `Contract` instance.

`Contract(factory: Contracts, code?: string, address?: string, abi?: ABI,  init?: Init, state?: State): Contracts`

A class representing a single smart contract. Allows for deployment and
calling the smart contract's transitions. This class is still under
development, and its API should, as of now, be considered unstable and
a candidate for breaking changes prior to the launch of the Zilliqa main net.

**Parameters**

- `factory`: Contracts - the creating factory instance.
- `code`: `string` (Optional) - UTF-8 Scilla smart contract code.
- `address`: `string` (Optional)
- `init`: `any` (Optional) - contract initialisation parameters.
- `state`: `any` (Optional) - contract state.

**Returns**

- `Contract` - a `Contract` instance.


### Instance Methods

`isInitialised(): boolean`

Returns `true` if no attempt has been made to deploy the `Contract`, or its
status is unknown.

**Returns**

- `boolean`

`isDeployed(): boolean`

Returns `true` if the contract has been successfully deployed.

**Returns**

- `boolean`

`isRejected(): boolean`

Returns `true` if the contract deployment attempt was rejected by the network.

**Returns**

- `boolean`

`deploy(params: DeployParams, attempts: number = 33, interval: number = 1000): Promise<Contract>`

Deploys a contract to the blockchain. This method will automatically generate
and sign the underlying `Transaction` and broadcast it. The status of the
`Contract` may then be ascertained by using `isRejected` or `isDeployed`, once
the `Promise` resolves.

_This API is unstable and subject to breaking changes pre-main net_

**Parameters**

- `params`: `DeployParams` - a subset of TxParams. Passed to the underlying
  `Transaction`. This can be used to manually provide `nonce` and `pubKey`,
  if it is desirable to sign the underlying transaction with a non-default
  account in the `Wallet`.
- `attempts` (Optional - default 33): `number` - the number of times to poll the lookup node for
  transaction receipt.
- `interval` (Optional - default 1000): `number` - the amount of time to wait
  between attempts. increases linearly (`numAttempts * interval`).

**Returns**

- `Promise<Contract>` - will be rejected if a network error occurs. A resolved
  `Promise` does not indicate that the `Contract` is deployed, as the
  underlying `Transaction` may be confirmed by the blockchain but
  unsuccessful, due to lack of `gas`, and so on.

`call(transition: string, args: Value[], params: CallParams): Promise<Transaction>`

Calls a transition of the current contract. At the moment, this is a low-level
interface for interacting with simple smart contracts.

_This API is unstable and subject to breaking changes pre-main net_

**Parameters**

- `transition`: `string` - the exact name of the contract transition to be
  invoked. _case matters_
- `args`: `Value[]` - JSON-encoded array of transition arguments.
- `params`: `CallParams` - a subset of `TxParams`. Passed to the underlying
  `Transaction`.
- `attempts` (Optional - default 20): `number` - the number of times to poll the lookup node for
  transaction receipt.
- `interval` (Optional - default 1000): `number` - the amount of time to wait
  between attempts. increases linearly (`numAttempts * interval`).

**Returns**

- `Promise<Transaction>` - the Transaction that has been signed and broadcast
  to the network.

`getState(): Promise<State>`

Queries the blockchain for the smart contract's state. Note that this method
will return the _entire_ state of the smart contract. As a result, if you have
a large amount of data stored in a smart contract do not use this method on
a client. Instead, use a server-side layer to cache and proxy such queries.

_This API is temporary and will be subject to breaking changes_

**Parameters**

None

**Returns**

- `Promise<State>` - the Contract state.

### Examples:

* method `at`: create contract instance by contract address.

```javascript
// Create contract instance with some methods
const contract = zilPay
  .contracts
  .at('zil1az5e0c6e4s4pazgahhmlca2cvgamp6kjtaxf4q');

contract.getCode().then(({ code }) => /do something.../)
contract.getInit().then((init) => /do something.../)
contract.getState().then((contractState) => /do something.../)
contract.getSubState('entropy').then(({ entropy }) => /do something.../)
```

* method `new `: create new contract by code.

```javascript
const scillaCode = `scilla_version 0
import ListUtils
library HelloWorld

let one_msg = 
  fun (msg : Message) => 
  let nil_msg = Nil {Message} in
  Cons {Message} msg nil_msg
  
let not_owner_code = Int32 1
let set_hello_code = Int32 2

contract HelloWorld
(owner: ByStr20)

field welcome_msg : String = ""

transition setHello (msg : String)
  is_owner = builtin eq owner _sender;
  match is_owner with
  | False =>
    e = {_eventname : "setHello()"; code : not_owner_code};
    event e
  | True =>
    welcome_msg := msg;
    e = {_eventname : "setHello()"; code : set_hello_code};
    event e
  end
end

transition getHello ()
    r <- welcome_msg;
    e = {_eventname: "getHello()"; msg: r};
    event e
end

transition multipleMsgs()
  msg1 = {_tag : ""; _recipient : _sender; _amount : Uint128 0};
  msg2 = {_tag : ""; _recipient : _sender; _amount : Uint128 0};
  msgs1 = one_msg msg1;
  msgs2 = Cons {Message} msg2 msgs1;
  send msgs2
end

transition contrAddr()
  msg1 = {_eventname : "ContractAddress"; addr : _this_address };
  event msg1
end
`
const init = [
  {
    "vname":"owner",
    "type":"ByStr20",
    "value":"zil1zxvjnkxr3r0rv582rv7u0w07pnh0ap30td4thr"
  },
  {
    "vname":"_scilla_version",
    "type":"Uint32",
    "value":"0"
  }
]
// Create contract instance with some methods
const contract = zilPay
  .contracts
  .new(scillaCode, init);

// Sending to DS
contract.deploy({
  gasLimit: '25000',
  gasPrice: '1000000000'
}, true)
.then(([tx, contract]) => /do something.../);

// Sending to TX
contract.deploy({
  gasLimit: '25000',
  gasPrice: '1000000000'
})
.then(([tx, contract]) => /do something.../);
```

* method `at`: create contract instance by contract address.

```javascript
// Create contract instance with some methods
const contract = zilPay
  .contracts
  .at('zil1az5e0c6e4s4pazgahhmlca2cvgamp6kjtaxf4q');

contract.getCode().then(({ code }) => /do something.../)
contract.getInit().then((init) => /do something.../)
contract.getState().then((contractState) => /do something.../)
contract.getSubState('entropy').then(({ entropy }) => /do something.../)
```

* method `call`: create new contract by code.

```javascript
const { contracts, utils, wallet } = window.zilPay;
const contract = contracts.at(this.contractAddress);
const amount = utils.units.toQa(0, utils.units.Units.Zil);
const gasPrice = utils.units.toQa('1000', utils.units.Units.Li)

// Sending to DS
const tx = await contract.call(
  'setHello',
  [
    {
      vname: 'msg',
      type: 'String',
      value: 'TEST'
    }
  ],
  {
    amount,
    gasPrice,
    gasLimit: utils.Long.fromNumber(9000)
  },
  true
).then(([tx, contract]) => /do something.../);

// Sending to TX
const tx = await contract.call(
  'setHello',
  [
    {
      vname: 'msg',
      type: 'String',
      value: 'TEST'
    }
  ],
  {
    amount,
    gasPrice,
    gasLimit: utils.Long.fromNumber(9000)
  }
).then(([tx, contract]) => /do something.../);
```