---
sidebar_label: 'CSHOP Token'
sidebar_position: 2
---

# Smart Contract: The CHSOP Token

:::note
You can see the original contract [here](https://github.com/CipherShop/core/tree/master/contracts/CShop.sol).
:::

## Introduction

The smart contract was created using the Solidity language in version 0.8.26.

For its creation, we based it on the OpenZeppelin ERC-20 token contracts, version 4.4 (see [here](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/release-v4.4)).

## Library Functions

We basically use the OpenZeppelin ERC-20 token library and the SafeMath library, to avoid overflow problems in operations.

    import "./ERC20.sol";
    import "./SafeMath.sol";

    contract CShop is ERC20 {
        using SafeMath for uint256;
        // Contract code
    }

## Contract Code

### Constructor

When initializing the contract, we define the address that will be able to create more CSHOP tokens in the future, and a date from which more tokens can be created. At the same time, the ERC20 library is initialized, indicating the address that will receive the initial funds, the name of the token and the symbol.

    constructor(address _account, address _minter, uint256 _mintingAllowedAfter) ERC20("CipherShop", "CSHOP", _account) {
        require(_mintingAllowedAfter >= block.timestamp);
        minter = _minter;
        emit MinterChanged(address(0), minter);
        mintingAllowedAfter = _mintingAllowedAfter;
    }

### Functions

#### Creation of CSHOP

The `mint` function is responsible for creating more CSHOP tokens. It is worth noting that it can only be called by the address that was specified during contract initialization.

    modifier onlyMinter {
        require(_msgSender() == minter);
        _;
    }

Other details to keep in mind are that it can only be used once a year, and it can only be created up to a limit of 1.6% of the total balance.

    uint32 public constant minimumTimeBetweenMints = 1 days * 365;

    function mint(address account, uint256 amount) external onlyMinter {
        require(block.timestamp >= mintingAllowedAfter, "CSHOP: minting not allowed yet");
        require(account != address(0));
        require(amount <= SafeMath.div(SafeMath.mul(totalSupply(), mintCap), 1000));
        mintingAllowedAfter = SafeMath.add(block.timestamp, minimumTimeBetweenMints);
        _mint(account, amount);
    }

The initial total balance is detailed in the ERC20.sol library code, which is 1 billion tokens.

    uint256 private _totalSupply = 1_000_000_000e18;

:::info

You can see the distribution of the CSHOP token that will be made, [here](/docs/general/governance#distribution-of-cshop).

:::

#### Modifying the address that allows creating tokens

This feature allows you to change the address that can create tokens, only the address mentioned above can change it. It is worth noting that this address is currently in the hands of the CipherShop team and will remain that way for the time being.

    function setMinter(address _address) external onlyMinter {
        require(address(0) != _address);
        emit MinterChanged(minter, _address);
        minter = _address;
    }

#### Loop transfer

This last feature allows for multiple token sends to multiple addresses with different amounts. This feature has been introduced so that the protocol can easily send tokens, for example in annual distributions.

    function multiTransfer(address[] memory addresses, uint256[] memory quantities) external {
        require(addresses.length > 0);
        require(quantities.length > 0);
        require(addresses.length == quantities.length);
        for (uint256 i = 0; i < addresses.length; i++) {
            transfer(addresses[i], quantities[i]);
        }
    }
