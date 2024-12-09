---
sidebar_label: 'CipherPunks NFT Collection'
sidebar_position: 4
---

# Smart Contract: CipherPunks NFT Collection

:::note

You can see the original contract [here](https://github.com/CipherShop/core/tree/master/contracts/CipherPunks.sol).

:::

## Introduction

The smart contract was created using the Solidity language in version 0.8.7.

For its creation, we have based it on the ERC-721 standard contracts (NFTs) from OpenZeppelin, in version 4.8 (see [here](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/release-v4.8/contracts/token/ERC721)).

:::info

The CipherPunks collection is now available, and there are 10,000 NFTs for sale. At a price of 0.06 ETH per NFT. Go [here](https://ciphershop.org/cipherpunks) to buy your NFTs, with privileges in the [forum](https://forum.ciphershop.org) and future rewards. Read more [here](https://ciphershop.org/blog/the-forum).

:::

## Libraries

We basically use the OpenZeppelin ERC-721 token libraries, the Ownable library (to manage contract ownership) and Strings (to work with String operations).

```
import "./extensions/ERC721Enumerable.sol";
import "./access/Ownable.sol";

contract NFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    // Código del contrato
}
```

## Contract Code

### Initialization

When initializing the contract, we define the name and symbol of the NFT collection (CipherPunks and ₵) and the URI where the NFT metadata is hosted, in this case on IPFS (ipfs://QmaDNebnsXwfQqkUbry65RuaiPMdPT1saG1ok48CYYQg5k/).

When initializing, 20 NFTs will be created with the address created by the smart contract, using the `mint()` function.

```
constructor(string memory _name, string memory _symbol, string memory _initBaseURI) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
    mint(msg.sender, 20);
}
```

### Functions

#### Minting NFTs

The `mint()` function is responsible for creating NFTs. You need to indicate the amount (up to a maximum of 20 NFTs per address) and send ETH for each NFT to be created. Currently the value of each NFT is 0.06 ETH.

This function determines whether the address making the transaction is the current owner of the contract, or if it is on a whitelist. In these cases, the creation is free. Otherwise, you will have to send the amount of ETH mentioned above.

The function creates the NFTs using the `_safeMint()` function, described in the [ERC721.sol](https://github.com/CipherShop/core/tree/master/contracts/ERC721.sol) contract. In short, this function assigns ownership of the NFT to the address making the call.

```
function mint(address _to, uint256 _mintAmount) public payable {
    uint256 supply = totalSupply();
    require(!paused);
    require(_mintAmount > 0);
    require(_mintAmount <= maxMintAmount);
    require(supply + _mintAmount <= maxSupply);
    require((balanceOf(msg.sender) + _mintAmount) <= maxMintAmount);

    if (msg.sender != owner()) {
        if(whitelisted[msg.sender] != true) {
            require(msg.value >= cost * _mintAmount);
        }
    }

    for (uint256 i = 1; i <= _mintAmount; i++) {
        _safeMint(_to, supply + i);
    }
}
```

#### View URI of an NFT

Returns the URI of the collection's NFT identifier metadata.

```
function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0 ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension)) : "";
}
```

#### View NFTs from an Address

Returns the collection IDs owned by an Ethereum address.

```
function walletOfOwner(address _owner) public view returns (uint256[] memory) {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
        tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
}
```

#### Change NFT Creation Price

Function to update the creation price of an NFT, can only be called by the current owner of the contract. Currently it is 0.06 ETH.

```
function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
}
```

#### Change Maximum Creation Amount per Address

Function to update the maximum amount of NFTs that can be created by an address, can only be called by the current owner of the contract. Currently it is set to 20 NFTs per address.

```
function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
}
```

#### Modify the Collection URI

Function to modify the URI where the collection metadata is stored.

```
function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
}
```

#### Pause or Resume the Smart Contract

Allows you to pause or resume the operation of the smart contract.

```
function pause(bool _state) public onlyOwner {
    paused = _state;
}
```

#### Add Address to Whitelist

Adds an address to the whitelist. This allows the added address to create NFTs for free. It can only be called by the current owner of the contract.

```
function whitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = true;
}
```

#### Remove Address from Whitelist

Removes the specified address from the whitelist. Can only be called by the current owner of the contract.

```
function removeWhitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = false;
}
```

#### Withdraw Stored Funds

Withdraws the ETH funds stored in the contract for the purchase of NFTs. Only the current owner of the contract can call it.

```
function withdraw() public payable onlyOwner {
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
}
```

#### Other Functions

This document has described the main functions of the CipherPunks.sol contract. However, there are more functions related to contract ownership (see [here](https://github.com/CipherShop/core/tree/master/contracts/access/Ownable.sol)), or specific to the ERC721 standard (see [here](https://github.com/CipherShop/core/tree/master/contracts/ERC721.sol)).

## Contract on the Blockchain

The contract has been launched on the Ethereum mainnet and is available for trading.

:::info

Go [here](https://etherscan.io/address/0x19b9a91a07d5c539f0078768034530370a659d0e#code) to view the contract operational on the Ethereum blockchain.

:::

## Metadata on IPFS

The collection's metadata and images are hosted on IPFS by Pinata.

:::info

Go to [here](https://aquamarine-imaginative-pike-30.mypinata.cloud/ipfs/QmaDNebnsXwfQqkUbry65RuaiPMdPT1saG1ok48CYYQg5k/) to view the metadata and [here](https://aquamarine-imaginative-pike-30.mypinata.cloud/ipfs/QmVXWovu3MajR9L3n2M9wQogDbhoPFwfVA4ws17e7oZ1U9/) to view the collection's images.

:::
