# Zilliqa API "blockchain"

ZilPay injected provider in your browser `window.zilPay`, this API is similar to the [Zilliqa-JavaScript-Library API](https://github.com/Zilliqa/Zilliqa-JavaScript-Library), with the exception of some functions.

## `window.zilPay.blockchain`

This object have some methods for get information from blockchain.

All examples usage (ES6), assuming [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function):

- `getBalance(address: string): Promise<RPCResponse>`
```javascript
const blockchain = window.zilPay.blockchain;
const result = await blockchain.getBalance('zil1wl38cwww2u3g8wzgutxlxtxwwc0rf7jf27zace');
```

```json
{
    id: 1,
    jsonrpc: "2.0",
    req: {
        url: "https://api.zilliqa.com",
        payload: {
            id: 1,
            jsonrpc: "2.0",
            method: "GetBalance",
            params: ["f0d679dd9cad89fb941ea4e7687aa90019e1023a"]
        }
    },
    result: {
        balance: "248790000000000",
        nonce: 27
    },
}
```
- `getBlockChainInfo(): Promise<RPCResponse>`

Retrieves generally blockchain information, such as the number of nodes per shard.

```javascript
const blockchain = window.zilPay.blockchain;
const result = await blockchain.getBlockChainInfo();
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "CurrentDSEpoch": "7238",
        "CurrentMiniEpoch": "723922",
        "DSBlockRate": 0.00040082390505467733,
        "NumDSBlocks": "7239",
        "NumPeers": 40,
        "NumTransactions": "334980",
        "NumTxBlocks": "723922",
        "NumTxnsDSEpoch": "0",
        "NumTxnsTxEpoch": "0",
        "ShardingStructure": {
            "NumPeers": [
                10,
                10,
                10
            ]
        },
        "TransactionRate": 0,
        "TxBlockRate": 0.04008205653697802
    },
    "req": {
        "url": "https://dev-api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetBlockchainInfo",
            "params": [
                null
            ]
        }
    }
}
```

- `getContractAddressFromTransactionID(transactionId: string): Promise<RPCResponse>`
 
You can get contract address from transaction hash (id).

```javascript
const blockchain = window.zilPay.blockchain;
const transactionID = '4ecbf705da6d9a57abf3c6c2cd901bf1493d1ef2cb3a6f46e74ad452880052da';
const result = await blockchain.getContractAddressFromTransactionID(transactionID);
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "32b9012ef910cfccbc0af4937001299cbd8e5fad",
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetContractAddressFromTransactionID",
            "params": [
                "4ecbf705da6d9a57abf3c6c2cd901bf1493d1ef2cb3a6f46e74ad452880052da"
            ]
        }
    }
}
```

- `getCurrentDSEpoch(): Promise<RPCResponse>`

```javascript
const blockchain = window.zilPay.blockchain;
const result = await blockchain.getCurrentDSEpoch();
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "2212",
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetCurrentDSEpoch",
            "params": [
                null
            ]
        }
    }
}
```

- `getCurrentMiniEpoch(transactionId: string): Promise<RPCResponse>`

```javascript
const blockchain = window.zilPay.blockchain;
const transactionID = '4ecbf705da6d9a57abf3c6c2cd901bf1493d1ef2cb3a6f46e74ad452880052da';
const result = await blockchain.getContractAddressFromTransactionID(transactionID);
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "221117",
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetCurrentMiniEpoch",
            "params": [
                null
            ]
        }
    }
}
```

- `getDSBlock(blockNum: number): Promise<RPCResponse>`

Get the full information about block.

```javascript
const blockchain = window.zilPay.blockchain;
const blockNumber = 2212;
const result = await blockchain.getDSBlock(blockNumber);
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "header": {
            "BlockNum": "2212",
            "Difficulty": 93,
            "DifficultyDS": 146,
            "GasPrice": "1000000000",
            "LeaderPubKey": "0x022D915BCD93019D7D7B97F205939784FA2DA54DFB0975542B33063E2100E0E8D4",
            "PoWWinners": [
                "0x0272C59B6A3893EF3DF70587F428111AACB8F579D4F529F9F2FF69F0C5E3C2F8D3",
                "0x02CA3CE74F2362E8EF09B516771FC5CFE175848DAB283D84F0E3CAF6FFE03DE235",
                "0x02D4AEDE896CA0D45EA7A575F246266212F86E66B6D715601DECE36A63CEE52017",
                "0x032FC5AAD662823E52AE906EE736F733CF76F6CA394C9CD31FFF08BD2326526B0D",
                "0x033EDD0C8C4529506F7752428A6D629546D2D117BE01D6D51859DD7A6E0CECAB45",
                "0x0393E3D884C84E7ED9C9D1A4051BD702F94E073FE1C0E163B6FDCD1C6424ED6E7E",
                "0x03D364AC7C0633D123BB4C22E02AF42DBC3E63DADECEB24895F306113CE122C3A7",
                "0x03FF54B632ED649DCADA7D58D806BDFAC6E7BA9BE4ABAB1D72DB18DFA536DAD5BD"
            ],
            "PrevHash": "be444859d92e20b0740414e47f180d8f4dc7ec7073dd6defe070067c0dbf3f97",
            "Timestamp": "1567326449340446"
        },
        "signature": "41E419A714A15846B0661FB83534F56E6BC5AFB11F83DC245AEBCAA1B3BFC85AB834B1068F43D8546484A2196355198DB503DCA3DF252C09D53ADE7B6C846B39"
    },
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetDsBlock",
            "params": [
                "2212"
            ]
        }
    }
}
```

- `getDSBlockListing(max: number): Promise<RPCResponse>`

Returns last blocks.

max: number - the maximum number of pages to retrieve.

```javascript
const blockchain = window.zilPay.blockchain;
const maxAmountLasBlocks = 3;
const result = await blockchain.getDSBlockListing(maxAmountLasBlocks);
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "data": [
            {
                "BlockNum": 2192,
                "Hash": "91d872449009431fe94bc39c4f980504ce552d950b42757a4811ded55928772b"
            },
            {
                "BlockNum": 2191,
                "Hash": "07587e3c90de2be5361cb612b0599ed3d1dccfd28149b9a52f32902cf34ad57e"
            },
            {
                "BlockNum": 2190,
                "Hash": "a4c0ba4207ddeabeba4c10f2b2636d8ae6cf42a504370834011eaf954800b942"
            },
            {
                "BlockNum": 2189,
                "Hash": "c2aff69829a024904ae53ffa4b00612ac1c7b0b6a9b5f5922405485ddbafcbea"
            },
            {
                "BlockNum": 2188,
                "Hash": "a4cd68af727df0508f91c2ee05dd9b198492e5343b9b08ad889f93d520e61609"
            },
            {
                "BlockNum": 2187,
                "Hash": "a6a82093e1cfa4dc85999677292da4b10458602bb38ece813fb48b0876493f96"
            },
            {
                "BlockNum": 2186,
                "Hash": "8bd9db1b1f49b1db65e2942d0e8b223c111dc4fb59ec90e140aa04962cac614e"
            },
            {
                "BlockNum": 2185,
                "Hash": "6740c8b875fc5c245e9be418e303943648dd0303d57a859e630f68a54a88d0c7"
            },
            {
                "BlockNum": 2184,
                "Hash": "70b8a5f5db06f8333f41147459c0764bc36918d57622e9745249a8824edea8d3"
            },
            {
                "BlockNum": 2183,
                "Hash": "ad4479e35623aafbd5b07a72a8d47a99271682eaed4880c903ce5f090a771601"
            }
        ],
        "maxPages": 222
    },
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "DSBlockListing",
            "params": [
                3
            ]
        }
    }
}
```

- `getDSBlockRate(): Promise<RPCResponse>`

Gets the ds blocks processed per second.

```javascript
const blockchain = window.zilPay.blockchain;
const result = await blockchain.getDSBlockRate();
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": 0.00012028805319302061,
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetDSBlockRate",
            "params": [
                null
            ]
        }
    }
}
```

- `getLatestDSBlock(): Promise<RPCResponse>`

Gets the most recently confirmed DS block.

```javascript
const blockchain = window.zilPay.blockchain;
const result = await blockchain.getLatestDSBlock();
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "header": {
            "BlockNum": "2212",
            "Difficulty": 93,
            "DifficultyDS": 146,
            "GasPrice": "1000000000",
            "LeaderPubKey": "0x022D915BCD93019D7D7B97F205939784FA2DA54DFB0975542B33063E2100E0E8D4",
            "PoWWinners": [
                "0x0272C59B6A3893EF3DF70587F428111AACB8F579D4F529F9F2FF69F0C5E3C2F8D3",
                "0x02CA3CE74F2362E8EF09B516771FC5CFE175848DAB283D84F0E3CAF6FFE03DE235",
                "0x02D4AEDE896CA0D45EA7A575F246266212F86E66B6D715601DECE36A63CEE52017",
                "0x032FC5AAD662823E52AE906EE736F733CF76F6CA394C9CD31FFF08BD2326526B0D",
                "0x033EDD0C8C4529506F7752428A6D629546D2D117BE01D6D51859DD7A6E0CECAB45",
                "0x0393E3D884C84E7ED9C9D1A4051BD702F94E073FE1C0E163B6FDCD1C6424ED6E7E",
                "0x03D364AC7C0633D123BB4C22E02AF42DBC3E63DADECEB24895F306113CE122C3A7",
                "0x03FF54B632ED649DCADA7D58D806BDFAC6E7BA9BE4ABAB1D72DB18DFA536DAD5BD"
            ],
            "PrevHash": "be444859d92e20b0740414e47f180d8f4dc7ec7073dd6defe070067c0dbf3f97",
            "Timestamp": "1567326449340446"
        },
        "signature": "41E419A714A15846B0661FB83534F56E6BC5AFB11F83DC245AEBCAA1B3BFC85AB834B1068F43D8546484A2196355198DB503DCA3DF252C09D53ADE7B6C846B39"
    },
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetLatestDsBlock",
            "params": [
                null
            ]
        }
    }
}
```

- `getLatestTxBlock(): Promise<RPCResponse>`

Gets the most recently confirmed Tx block.

```javascript
const blockchain = window.zilPay.blockchain;
const result = await blockchain.getLatestTxBlock();
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "body": {
            "BlockHash": "afa43223b6e5f1da7d104c4f212f297b2e1f9c10f9a84f8e5f0b013db2bfa585",
            "HeaderSign": "EA944119129BC489809F0869C9780203ADBFEA65946F8F7B3887814D661AC11DE51B624A11375D5076A6DF9972DCFD137DC232E2D50737C1FC9A922D1797DB56",
            "MicroBlockInfos": [
                {
                    "MicroBlockHash": "832a7a3af6d58930c71a6034b34018bb2d91fec3d43342d3537e8431d66621d4",
                    "MicroBlockShardId": 0,
                    "MicroBlockTxnRootHash": "0000000000000000000000000000000000000000000000000000000000000000"
                },
                {
                    "MicroBlockHash": "af623f04f19cbe2e1225e6ad05df91344047180b10380c93742ef53310858ba7",
                    "MicroBlockShardId": 1,
                    "MicroBlockTxnRootHash": "0000000000000000000000000000000000000000000000000000000000000000"
                },
                {
                    "MicroBlockHash": "593e197447fa7ee41f008120654d23d8754e90c3ae0b59b9e212d343ac34394b",
                    "MicroBlockShardId": 2,
                    "MicroBlockTxnRootHash": "0000000000000000000000000000000000000000000000000000000000000000"
                },
                {
                    "MicroBlockHash": "1a2d2aefc8b6df186dc4b6725d6f2869ceec4641e67ba6174fb61b43292c2454",
                    "MicroBlockShardId": 3,
                    "MicroBlockTxnRootHash": "0000000000000000000000000000000000000000000000000000000000000000"
                }
            ]
        },
        "header": {
            "BlockNum": "221134",
            "DSBlockNum": "2212",
            "GasLimit": "60000",
            "GasUsed": "0",
            "MbInfoHash": "ecd2b7abbbf301186763339d1d0d0c48ea3ec4a324e6e5bf4ac8e0173e20b2a6",
            "MinerPubKey": "0x02393D38E48D95B55B31FB8EF6FC736067CAB1E95AF4AC88B6521E4E95EBEF47EA",
            "NumMicroBlocks": 4,
            "NumTxns": 0,
            "PrevBlockHash": "23bde6b14eeb9f5decdcbcde07063405dfd68bf3c820e99f2d28928bb24b8d56",
            "Rewards": "0",
            "StateDeltaHash": "0000000000000000000000000000000000000000000000000000000000000000",
            "StateRootHash": "75b269f6ecfbb1ac658a1810224e8b55963bf03b9f45d36a395798b47142678a",
            "Timestamp": "1567329186465877",
            "Version": 1
        }
    },
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetLatestTxBlock",
            "params": [
                null
            ]
        }
    }
}
```

- `getMinimumGasPrice(): Promise<RPCResponse>`

This method returns the current gas price. The gas price is determined by the x latest blocks median gas price.

```javascript
const blockchain = window.zilPay.blockchain;
const result = await blockchain.getMinimumGasPrice();
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "1000000000",
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetMinimumGasPrice",
            "params": [
                null
            ]
        }
    }
}
```

- `getNumDSBlocks(): Promise<RPCResponse>`

Queries the blockchain for the number of confirmed DS blocks in the chain.

```javascript
const blockchain = window.zilPay.blockchain;
const result = await blockchain.getNumDSBlocks();
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "2213",
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetNumDSBlocks",
            "params": [
                null
            ]
        }
    }
}
```

- `getNumTransactions(): Promise<RPCResponse>`

Get the count transactions.

```javascript
const blockchain = window.zilPay.blockchain;
const result = await blockchain.getNumTransactions();
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "514955",
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetNumTransactions",
            "params": [
                null
            ]
        }
    }
}
```

- `getNumTxBlocks(): Promise<RPCResponse>`

Queries the blockchain for the number of confirmed Tx blocks in the chain.

```javascript
const blockchain = window.zilPay.blockchain;
const result = await blockchain.getNumTxBlocks();
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "221143",
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetNumTxBlocks",
            "params": [
                null
            ]
        }
    }
}
```

- `getNumTxnsDSEpoch(epoch?: number): Promise<RPCResponse>`

```javascript
const blockchain = window.zilPay.blockchain;
const currentDSEpoch = 221146;
const result = await blockchain.getNumTxnsDSEpoch(currentDSEpoch);
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "900",
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetNumTxnsDSEpoch",
            "params": [
                221146
            ]
        }
    }
}
```

- `getPrevDSDifficulty(): Promise<RPCResponse>`

```javascript
const blockchain = window.zilPay.blockchain;
const result = await blockchain.getPrevDSDifficulty();
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": 146,
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetPrevDSDifficulty",
            "params": [
                null
            ]
        }
    }
}
```

- `getPrevDifficulty(): Promise<RPCResponse>`

```javascript
const blockchain = window.zilPay.blockchain;
const result = await blockchain.getPrevDifficulty();
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": 93,
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetPrevDifficulty",
            "params": [
                null
            ]
        }
    }
}
```

- `getRecentTransactions(): Promise<RPCResponse>`

Returns the most recent transactions. Because there are a lot of transactions in each block, this method is not paginated as Ethereum.

```javascript
const blockchain = window.zilPay.blockchain;
const result = await blockchain.getRecentTransactions();
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "TxnHashes": [
            // Much trasactions hashs.
        ],
        "number": 100
    },
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetRecentTransactions",
            "params": [
                null
            ]
        }
    }
}
```

- `getShardingStructure(): Promise<RPCResponse>`

```javascript
const blockchain = window.zilPay.blockchain;
const result = await blockchain.getShardingStructure();
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "NumPeers": [
            600,
            600,
            530
        ]
    },
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetShardingStructure",
            "params": [
                null
            ]
        }
    }
}
```


- `getSmartContractCode(address: string): Promise<RPCResponse>`

This method return full contract code.

```javascript
const blockchain = window.zilPay.blockchain;
const contractAddress = 'zil1x2uszthezr8ue0q27jfhqqffnj7cuhadekj4gg';
const result = await blockchain.getSmartContractCode(contractAddress);
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "code": "Some scilla contract code"
    },
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetSmartContractCode",
            "params": [
                "32b9012ef910cfccbc0af4937001299cbd8e5fad"
            ]
        }
    }
}
```

- `getSmartContractInit(address: string): Promise<RPCResponse>`

This method return constructor data when owner deployed this contract.

```javascript
const blockchain = window.zilPay.blockchain;
const contractAddress = 'zil1x2uszthezr8ue0q27jfhqqffnj7cuhadekj4gg';
const result = await blockchain.getSmartContractInit(contractAddress);
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [
        {
            "type": "Uint32",
            "value": "0",
            "vname": "_scilla_version"
        },
        {
            "type": "ByStr20",
            "value": "0x77E27C39ce572283b848E2cDF32ccE761e34Fa49",
            "vname": "owner"
        },
        {
            "type": "Uint128",
            "value": "10000000000000",
            "vname": "total_tokens"
        },
        {
            "type": "Uint32",
            "value": "18",
            "vname": "decimals"
        },
        {
            "type": "String",
            "value": "Zilliqa dApp interactive wallet ZilPay",
            "vname": "name"
        },
        {
            "type": "String",
            "value": "ZP",
            "vname": "symbol"
        },
        {
            "type": "BNum",
            "value": "133951",
            "vname": "_creation_block"
        },
        {
            "type": "ByStr20",
            "value": "0x32b9012ef910cfccbc0af4937001299cbd8e5fad",
            "vname": "_this_address"
        }
    ],
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetSmartContractInit",
            "params": [
                "32b9012ef910cfccbc0af4937001299cbd8e5fad"
            ]
        }
    }
}
```

- `getSmartContractState(address: string): Promise<RPCResponse>`

Only method for get scilla contract state

```javascript
const blockchain = window.zilPay.blockchain;
const contractAddress = 'zil1x2uszthezr8ue0q27jfhqqffnj7cuhadekj4gg';
const result = await blockchain.getSmartContractState(contractAddress);
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [
        {
            "type": "Map (ByStr20) (Uint128)",
            "value": [
                {
                    "key": "0x77e27c39ce572283b848e2cdf32cce761e34fa49",
                    "val": "9999990000000"
                },
                {
                    "key": "0xb2e51878722d8b6d2c0f97e995a7276d64c1618b",
                    "val": "10000000"
                }
            ],
            "vname": "balances"
        },
        {
            "type": "Map (ByStr20) (Map (ByStr20) (Uint128))",
            "value": [],
            "vname": "allowed"
        },
        {
            "type": "Uint128",
            "value": "0",
            "vname": "_balance"
        }
    ],
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetSmartContractState",
            "params": [
                "32b9012ef910cfccbc0af4937001299cbd8e5fad"
            ]
        }
    }
}
```

- `getTransaction(transactionId: string): Promise<RPCResponse>`

This method return full contract code.

```javascript
const blockchain = window.zilPay.blockchain;
const txHash = '4ecbf705da6d9a57abf3c6c2cd901bf1493d1ef2cb3a6f46e74ad452880052da';
const result = await blockchain.getTransaction(txHash);
```
```json
{
    "code": "",
    "data": "",
    "version": 65537,
    "toAddr": "0x0000000000000000000000000000000000000000",
    "nonce": 2,
    "pubKey": "02F006B10B35ED60AC7CB79866B228A048B7D820561EC917B1AD3D2E5A851CEDB9",
    "amount": "0",
    "signature": "0x388716FF43997230144636F2BD38FA62EC945637512331D372278C93865FD82193F7124FCFA445453D4654785052BBAE56A902C8BFB755EEDE4475C1BD410EBC",
    "gasPrice": "3b9aca00",
    "gasLimit": {
        "low": 10000,
        "high": 0,
        "unsigned": false
    },
    "receipt": {
        "cumulative_gas": 5640,
        "epoch_num": "133951",
        "success": true
    },
    "provider": {
        "middleware": {
            "request": {},
            "response": {}
        },
    },
    "status": 2,
    "toDS": false,
    "blockConfirmation": 0
}
```


- `getTransactionRate(): Promise<RPCResponse>`

This method return full contract code.

```javascript
const blockchain = window.zilPay.blockchain;
const result = await blockchain.getTransactionRate();
```
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": 0,
    "req": {
        "url": "https://api.zilliqa.com",
        "payload": {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "GetTransactionRate",
            "params": [
                null
            ]
        }
    }
}
```

