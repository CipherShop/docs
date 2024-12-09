---
sidebar_label: 'Private Pre-Sale'
sidebar_position: 3
---

# Smart Contract: Private Pre-Sale

:::note

You can see the original smart contract [here](https://github.com/CipherShop/core/tree/master/contracts/CSHOP_Presale.sol).

:::

## Introduction

The smart contract was created using the Solidity language in version 0.8.26.

For its creation, we have based it on the OpenZeppelin Crowdsales contract, version 2.5 (see [here](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/release-v2.5.0/contracts/crowdsale)).

We have also based ourselves on ChainLink's AggregatorV3Interface contract in version 0.8 (see [here](https://github.com/smartcontractkit/chainlink/tree/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol)).

:::info

Private pre-purchase is now available, and there are 2 million CSHOP tokens for sale. At an initial price of $0.16 per token. Go [here](https://ciphershop.org/es/blog/initial-private-purchase-available) to purchase your tokens.

:::

## Libraries

We use the OpenZeppelin libraries: Context (to provide information about the execution context), IERC20 (interface to the ERC20 standard), SafeERC20 (wrapper for secure operations of the ERC20 standard), SafeMath (to avoid overflow problems in operations) and ReentrancyGuard (module that helps prevent reentrant calls to a function).

Finally, we use the AggregatorV3Interface library from ChainLink, to obtain the value of the Ethereum price in USD (US dollars) in real time.

```
import "./utils/Context.sol";
import "./IERC20.sol";
import "./SafeMath.sol";
import "./SafeERC20.sol";
import "./utils/ReentrancyGuard.sol";
import "./interfaces/AggregatorV3Interface.sol";

contract CSHOPPresale is Context, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    // Contract code
}
```

## Contract Code

### Initialization

When initializing the contract, we define the address of the CSHOP token (0x547b5362a0aa165cf98237c98cda5a4003f5ca9f), and the address that will receive the funds in ETH.

When initializing, it will perform some security checks and define the price of the CSHOP token, based on the AggregatorV3Interface library and the address 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419, which indicates the relationship between ETH and USD in real time.

```
constructor (address payable wallet, IERC20 token) {
    require(wallet != address(0), "Crowdsale: wallet is the zero address");
    require(address(token) != address(0), "Crowdsale: token is the zero address");
    _wallet = wallet;
    _token = token;
    priceFeed = AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);
}
```

### Functions

#### Default Function

The `receive()` function is the default function, that is, if someone sends ETH to the contract without specifying any function, the contract will execute this function, which in turn will execute the `buyTokens()` function in charge of processing the sending of CSHOP tokens according to the amount of ETH sent.

```
receive () external payable {
    buyTokens(_msgSender());
}
```

#### View Sold Token

Returns the address of the token being sold, in this case CSHOP (0x547b5362a0aa165cf98237c98cda5a4003f5ca9f). In this case, being a `public` attribute, it allows you to see the content of the variable.

```
IERC20 public _token;
```

#### View Wallet Receiving Funds

Returns the address of the wallet to which the funds will go.

```
address payable public _wallet;
```

#### View the Last Value of the Token Price

The ratio is updated in each transaction. Therefore, this function indicates the last amount of tokens per Wei that the last buyer received.

```
function rate() public view returns (uint256) {
    return _rate;
}
```

#### View the Amount of Wei Collected

Returns the amount of Wei collected to date.

```
function weiRaised() public view returns (uint256) {
    return _weiRaised;
}
```

#### View the Amount of Tokens Sold

Returns the amount of tokens sold to date.

```
function tokensSold() public view returns (uint256) {
    return _tokensSold;
}
```

#### Buy CSHOP Tokens

The `buyTokens()` function is the main function that is responsible for verifying that the purchase is allowed and if so, sending the corresponding CSHOP tokens to the buyer.

```
function buyTokens(address beneficiary) public nonReentrant payable {
    uint256 weiAmount = msg.value;
    _preValidatePurchase(beneficiary, weiAmount);

    // calculate token amount to be created
    uint256 tokens = _getTokenAmount(weiAmount);

    require(tokensSold().add(tokens) <= 2_000_000 * 1e18, "Crowdsale: tokens sold exceeds the amount available");

    // update state
    _weiRaised = _weiRaised.add(weiAmount);
    _tokensSold = _tokensSold.add(tokens);

    _processPurchase(beneficiary, tokens);
    emit TokensPurchased(_msgSender(), beneficiary, weiAmount, tokens);

    _updatePurchasingState(beneficiary, weiAmount);

    _forwardFunds();
    _postValidatePurchase(beneficiary, weiAmount);
}
```

Within this function, the internal functions are called: `_preValidatePurchase()`, `_getTokenAmount()`, `_processPurchase()` and `_forwardFunds()`. These are defined below.

##### buyTokens() Function: Prevalidation

The `_preValidatePurchase()` function is the first function that is executed in `buyTokens()`. It is responsible for verifying that the buyer's data is correct and that the purchase can be made. Afterwards, it obtains the latest value of the ETH price in USD, and based on the previously purchased tokens, estimates the price of the CSHOP token.

Initially it will be $0.16 per token, with an increase of $0.01 for every 400,000 tokens purchased.

```
function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal {
    require(beneficiary != address(0), "Crowdsale: beneficiary is the zero address");
    require(weiAmount != 0, "Crowdsale: weiAmount is 0");
    require(tokensSold() < 2_000_000 * 1e18, "Crowdsale: there are no tokens available for sale");
    (,int256 _price,,,) = priceFeed.latestRoundData();
    uint price = uint256(_price).div(100000000);
    if (tokensSold() > 1_600_000 * 1e18) {
        uint result = price.div(20).mul(100);
        _rate = result;
    }
    else if (tokensSold() > 1_200_000 * 1e18) {
        uint result = price.div(19).mul(100);
        _rate = result;
    }
    else if (tokensSold() > 800_000 * 1e18) {
        uint result = price.div(18).mul(100);
        _rate = result;
    }
    else if (tokensSold() > 400_000 * 1e18) {
        uint result = price.div(17).mul(100);
        _rate = result;
    } else {
        uint result = price.div(16).mul(100);
        _rate = result;
    }
}
```

##### buyTokens() Function: Get the Amount of Tokens

The `_getTokenAmount()` function is the second function that runs in `buyTokens()`. It is responsible for obtaining the amount of tokens that the buyer will receive according to the Wei that he has sent.

```
function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
    return weiAmount.mul(_rate);
}
```

##### buyTokens() Function: Process Purchase

The `_processPurchase()` function is the third function that runs in `buyTokens()`. It is responsible for processing the purchase and securely sending the purchased CSHOP tokens.

```
function _processPurchase(address beneficiary, uint256 tokenAmount) internal {
    _deliverTokens(beneficiary, tokenAmount);
}

function _deliverTokens(address beneficiary, uint256 tokenAmount) internal {
    _token.safeTransfer(beneficiary, tokenAmount);
}
```

##### buyTokens() Function: Sending Funds

Finally, after sending the tokens to the buyer, the purchase funds will be sent to the initially indicated fund wallet.

```
function _forwardFunds() internal {
    _wallet.transfer(msg.value);
}
```

##### buyTokens() Function: Other Functions

In addition to the functions mentioned, two other functions are used in `buyTokens()`: `_updatePurchasingState()` and `_postValidatePurchase()`. But although these functions do nothing, they have been kept because they are in the standard of the original Crowdsale contract of OpenZeppelin.

```
function _updatePurchasingState(address beneficiary, uint256 weiAmount) internal {
    // solhint-disable-previous-line no-empty-blocks
}

function _postValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
    // solhint-disable-previous-line no-empty-blocks
}
```

## Contract on the Blockchain

The contract has been launched on the Ethereum mainnet and is available for trading.

:::info

Go [here](https://etherscan.io/address/0x954faaaa93ff332d149ceb5816e32fefd19be4ae#code) to view the contract operating on the Ethereum blockchain.

:::

It is worth noting that there are two versions of this smart contract on the network. The first one had critical bugs, so we launched a second contract (the one on this page) with the bugs fixed.

While the old contract contains approximately 2,000,000 (two million) CSHOP tokens, these tokens are deducted from the amount allocated to the CipherShop team and will not fall into the small initial investor category, so anyone who acquires tokens through the old contract will not receive the rewards allocated to the small initial investor category, which they will receive if they acquire the tokens through the contract on this page.
