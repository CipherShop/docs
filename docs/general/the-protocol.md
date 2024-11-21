---
sidebar_label: 'The Protocol'
sidebar_position: 2
---

# The Protocol

## Objectives of the protocol

The protocol consists of a series of Ethereum smart contracts that enable the creation of CipherShop's primary targets.

The objectives are:

- **Use cryptocurrencies as payment**, being an alternative to the money currently used, with the benefit that they do not involve the use of intermediaries, such as banks.

- **Allow the purchase of any physical or digital goods**, with the **optional use of the ERC-721 standard (NFTs)**. Giving users the option of tokenizing the goods as an alternative, thus enabling them to earn passive income, either through resale or by having a proportional part of the good in the form of a token.

- **Incentivize users to use the platform**, so that the users themselves manage the future of the protocol, through a governance system. In addition, a reputation system will be used as a buyer and seller, allowing to obtain more or less rewards, depending on the actions that the users of the protocol decide to do.

- **Minimize fraud and lack of confidence** of buyers and sellers through established rules.

- **Avoid at all costs the use of third parties or intermediaries**, but as it is a peer-to-peer system, even though the protocol minimizes fraud as much as possible, incidents can always occur, for this, optionally, the protocol will have a system with which a reliable administrator, initially from the CiperShop team, and later may be other administrators chosen by the community, will resolve the incident based on the evidence provided.

- **Be transparent at all times**, open source, well documented and available to users from the start.

- **Have a simple and easily accessible interface** for any type of audience.

## How does the CipherShop protocol work?

To achieve the aforementioned objectives, Ethereum-based smart contracts have been created, developed in Solidity 0.8.11.

The operation of the protocol consists in the use of a third party as an intermediary. In this case, the third party consists of an Ethereum smart contract in which the deposits will be held. 

When the buyer has received the product, the seller will receive the money.

In detail, a user with a wallet with Web 3.0 access, such as MetaMask, Fortmatic, WalletConnect, and so on. He or she will have access to the interface designed to interact with the protocol.

A user, in this case a seller, using an Ethereum address can register a physical or digital product, along with some characteristics: title, description, product photos, category, price, type of cryptocurrency, country from which it is shipped, country or countries to which it is shipped, shipping method, shipping time, if it allows returns, if it is visible to the public or if it is only visible to certain Ethereum addresses.

Another user, in this case a buyer, will be able to make offers for a lower price, or buy the product directly. In case of an offer, it will go to the smart contract creating a deposit, with the details of the offer and a validity date. After the validity time if the seller does not accept the offer, this deposit will be refunded to the buyer. If he accepts it, it will become as if it were a direct purchase, so the rest of the offers will be cancelled and the deposits will be returned to their corresponding users. And a transaction will be initiated.

In the transaction, the characteristics of the purchase are detailed, such as the product, the quantity and its status, that is, if it has been marked as sent by the seller, received by the seller, received by the buyer, if a return has been requested, in case the seller has indicated that he accepts returns, and in case of return, the same but in reverse, if the buyer has marked it as, sent, received, etcetera.

The transaction will end in various states, and may end successfully, charging a commission of 0.3%, of which 70% will go to the community treasury, and 30% to the smart contract itself, to pay for future automated transactions. Depending on how the transaction status is finalized, it will influence the reputation as a seller or the reputation as a buyer, as the case may be.

In case of incidents, a reliable administrator, initially from the CiperShop team and then chosen by the community, will be involved in the transaction. He will be in charge of resolving the transfer in favor of the buyer or the seller on the basis of the evidence provided. It should be noted that the seller is in charge of the entire process until receipt of the product by the buyer, otherwise the intermediary will act in favor of the buyer.

:::note

For more details about the mechanism of the protocol see the 
[Whitepaper page](/docs/learn/whitepaper)

:::
