---
sidebar_label: 'Precompra privada'
sidebar_position: 3
---

# Contrato inteligente: precompra privada

:::note Nota

Puedes ver el contrato original [aquí](https://github.com/CipherShop/core/tree/master/contracts/CSHOP_Presale.sol).

:::

## Introducción

El contrato inteligente ha sido creado con el lenguaje Solidity en la versión 0.8.26.

Para la creación, nos hemos basado en el contrato Crowdsales (venta colectiva) de OpenZeppelin, en la versión 2.5 (ver [aquí](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/release-v2.5.0/contracts/crowdsale)).

También nos hemos basado en el contrato de AggregatorV3Interface de ChainLink en la versión 0.8 (ver [aquí](https://github.com/smartcontractkit/chainlink/tree/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol)).

:::info

La precompra privada ya está disponible, y hay 2 millones de tokens CSHOP a la venta. A un precio inicial de 0,16$ por token. Accede [aquí](https://ciphershop.org/es/blog/initial-private-purchase-available) para comprar tus tokens.

:::

## Librerías

Usamos las librerías de OpenZeppelin de: Context (para dar información del contexto de ejecución), IERC20 (interfaz del estándar ERC20), SafeERC20 (envoltorio para operaciones seguras del estándar ERC20), SafeMath (para evitar problemas de desbordamiento en las operaciones) y ReentrancyGuard (módulo que ayuda a prevenir llamadas reentrantes a una función).

Por último usamos la librería AggregatorV3Interface de ChainLink, para obtener el valor del precio de Ethereum en USD (dólares americanos) en tiempo real.

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
    // Código del contrato
}
```

## Código del contrato

### Inicialización

Al inicializar el contrato, definimos la dirección del token CSHOP (0x547b5362a0aa165cf98237c98cda5a4003f5ca9f), y la dirección que recibirá los fondos en ETH.

Al inicializar hará unas comprobaciones de seguridad y definirá el precio del token CSHOP, a partir de la librería AggregatorV3Interface y la dirección 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419, que indica la relación entre ETH y USD a tiempo real. 

```
constructor (address payable wallet, IERC20 token) {
    require(wallet != address(0), "Crowdsale: wallet is the zero address");
    require(address(token) != address(0), "Crowdsale: token is the zero address");
    _wallet = wallet;
    _token = token;
    priceFeed = AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);
}
```

### Funciones

#### Función por defecto

La función `receive()` es la función por defecto, es decir, si alguien envía ETH al contrato sin especificar ninguna función, el contrato ejecutará esta función, que a su vez ejecutará la función `buyTokens()` encargada de procesar el envío de tokens CSHOP según la cantidad de ETH enviado.

```
receive () external payable {
    buyTokens(_msgSender());
}
```

#### Ver token vendido

Devuelve la dirección del token que se está vendiendo, en este caso CSHOP (0x547b5362a0aa165cf98237c98cda5a4003f5ca9f). En este caso al ser un atributo `public` permite ver el contenido de la variable.

```
IERC20 public _token;
```

#### Ver cartera que recibe los fondos

Devuelve la dirección de la cartera a la que irán los fondos.

```
address payable public _wallet;
```

#### Ver el último valor del precio del token

El ratio se actualiza en cada transacción. Por lo que esta función indica la última cantidad de tokens por Wei que recibió el último comprador.

```
function rate() public view returns (uint256) {
    return _rate;
}
```

#### Ver la cantidad de Wei recolectado

Devuelve la cantidad de Wei recolectado hasta la fecha.

```
function weiRaised() public view returns (uint256) {
    return _weiRaised;
}
```

#### Ver la cantidad de tokens vendidos

Devuelve la cantidad de tokens vendidos hasta la fecha.

```
function tokensSold() public view returns (uint256) {
    return _tokensSold;
}
```

#### Comprar tokens CSHOP

La función `buyTokens()` es la función principal que se encarga de verificar que la compra está permitida y en caso afirmativo, de enviar los tokens CSHOP correspondientes al comprador.

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

Dentro de esta función se llaman a las funciones internas: `_preValidatePurchase()`, `_getTokenAmount()`, `_processPurchase()` y `_forwardFunds()`. Estas se definen a continuación.

##### Función buyTokens(): prevalidación

La función `_preValidatePurchase()` es la primera función que se ejecuta en `buyTokens()`. Esta se encarga de verificar que los datos del comprador son correctos y que la compra se puede realizar. Posteriormente, obtiene el último valor del precio de ETH en USD, y según los tokens comprados anteriormente, estimar el precio del token CSHOP.

Inicialmente será de 0,16$ por token, con un incremento de 0,01$ por cada 400.000 tokens comprados.

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

##### Función buyTokens(): obtener cantidad de tokens

La función `_getTokenAmount()` es la segunda función que se ejecuta en `buyTokens()`. Esta se encarga de obtener la cantidad de tokens que recibirá el comprador según el Wei que ha enviado.

```
function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
    return weiAmount.mul(_rate);
}
```

##### Función buyTokens(): procesar compra

La función `_processPurchase()` es la tercera función que se ejecuta en `buyTokens()`. Esta se encarga de procesar la compra y enviar de forma segura los tokens CSHOP comprados.

```
function _processPurchase(address beneficiary, uint256 tokenAmount) internal {
    _deliverTokens(beneficiary, tokenAmount);
}

function _deliverTokens(address beneficiary, uint256 tokenAmount) internal {
    _token.safeTransfer(beneficiary, tokenAmount);
}
```

##### Función buyTokens(): enviar fondos

Por último, tras enviar los tokens al comprador se procederá a enviar los fondos de la compra a la cartera de fondos indicada inicialmente.

```
function _forwardFunds() internal {
    _wallet.transfer(msg.value);
}
```

##### Función buyTokens(): otras funciones 

Además de las funciones mencionadas, en `buyTokens()` se usan otras dos funciones: `_updatePurchasingState()` y `_postValidatePurchase()`. Pero aunque estas funciones no hacen nada, se han mantenido por estar en el estándar del contrato original Crowdsale de OpenZeppelin.

```
function _updatePurchasingState(address beneficiary, uint256 weiAmount) internal {
    // solhint-disable-previous-line no-empty-blocks
}

function _postValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
    // solhint-disable-previous-line no-empty-blocks
}
```

## Contrato en la blockchain

El contrato se ha lanzado a la red principal de Ethereum y está disponible para operar con él.

:::info

Accede [aquí](https://etherscan.io/address/0x954faaaa93ff332d149ceb5816e32fefd19be4ae#code) para ver el contrato operativo en la blockchain de Ethereum.

:::

Cabe destacar que hay dos versiones de este contrato inteligente en la red. El primero tenía errores críticos, por lo que lanzamos un segundo contrato (el presente en este página) con los errores corregidos.

Si bien el contrato antiguo posee aproximadamente 2.000.000 (dos millones) de tokens CSHOP, estos tokens se descuentan del monto asignado al equipo de CipherShop, y no entrarán en la categoría de pequeños inversores iniciales, por lo que aquel que adquiera tokens mediante el contrato antiguo, no recibirá las recompensas asignadas a la categoría de pequeños inversores iniciales, que si recibirá si adquiere los tokens mediante el contrato presente en esta página.
