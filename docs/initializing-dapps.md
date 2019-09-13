# Initializing Dapps

Once you have your basic dev environment [set up](./get-started), you are ready to start interacting with some smart contracts. There are some basic things you'll need regardless of what convenience library you're using, when communicating with a smart contract:

## The Contract Network

If you aren't connected to the right network, you aren't going to have any luck sending transactions to your contract, so make sure you have this right!

Many clever dapps will recognize the user's current network, and actually adapt to it! For example, if you detect a test network, you could deliberately connect to a test-network version of your smart contract, which makes it easy for users to "try out" your system without using real money!

## The Contract Address

Every account in Zilliqa has an address, whether it’s an external key-pair account, or a smart contract. In order for any smart contract library to communicate with your contracts, they’ll need to know its exact address.

## Scilla: A Smart Contract Intermediate Level Language
Scilla short for Smart Contract Intermediate-Level LAnguage is an intermediate-level smart contract language being developed for Zilliqa. Scilla has been designed as a principled language with smart contract safety in mind.

Scilla imposes a structure on smart contracts that will make applications less vulnerable to attacks by eliminating certain known vulnerabilities directly at the language-level. Furthermore, the principled structure of Scilla will make applications inherently more secure and amenable to formal verification.

Zilliqa - the underlying blockchain platform on which Scilla contracts are run, has been designed to be scalable. It employs the idea of sharding to validate transactions in parallel. Zilliqa has an intrinsic token named Zilling, ZIL for short that are required to run smart contracts on Zilliqa.
