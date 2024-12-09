---
sidebar_label: 'Token CSHOP'
sidebar_position: 2
---

# Contrato inteligente: el token CSHOP

:::note Nota

Puedes ver el contrato original [aquí](https://github.com/CipherShop/core/tree/master/contracts/CShop.sol).

:::

## Introducción

El contrato inteligente ha sido creado con el lenguaje Solidity en la versión 0.8.7.

Para la creación, nos hemos basado en los contratos del estándar ERC-20 de OpenZeppelin, en la versión 4.8 (ver [aquí](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/release-v4.8/contracts/token/ERC20)).

## Librerías

Básicamente usamos la librería de OpenZeppelin del token ERC-20 y la librería de SafeMath, para evitar problemas de desbordamiento en las operaciones.

```
import "./ERC20.sol";
import "./SafeMath.sol";

contract CShop is ERC20 {
    using SafeMath for uint256;
    // Código del contrato
}
```

## Código del contrato

### Inicialización

Al inicializar el contrato, definimos la dirección que podrá crear más tokens CSHOP en el futuro, y una fecha a partir de la cual se podrá crear más tokens. Se inicializa al mismo tiempo la librería ERC20, indicando la dirección que recibirá los fondos inciales, el nombre del token y el símbolo.

```
constructor(address _account, address _minter, uint256 _mintingAllowedAfter) ERC20("CipherShop", "CSHOP", _account) {
    require(_mintingAllowedAfter >= block.timestamp);
    minter = _minter;
    emit MinterChanged(address(0), minter);
    mintingAllowedAfter = _mintingAllowedAfter;
}
```

### Funciones

#### Creación de CSHOP

La función `mint()` se encarga de la creación de más tokens CSHOP. Cabe destacar que solo la puede llamar aquella dirección que se indicó en la inicialización del contrato.

```
modifier onlyMinter {
    require(_msgSender() == minter);
    _;
}
```

Otros detalles a tener en cuenta es que solo se puede utilizar una vez al año, y solo se puede crear hasta un tope del 1,6% del balance total.

```
uint32 public constant minimumTimeBetweenMints = 1 days * 365;

function mint(address account, uint256 amount) external onlyMinter {
    require(block.timestamp >= mintingAllowedAfter, "CSHOP: minting not allowed yet");
    require(account != address(0));
    require(amount <= SafeMath.div(SafeMath.mul(totalSupply(), mintCap), 1000));
    mintingAllowedAfter = SafeMath.add(block.timestamp, minimumTimeBetweenMints);
    _mint(account, amount);
}
```

El balance total inicial se detalla en el código de la librería ERC20.sol, que es de mil millones de tokens.

```
uint256 private _totalSupply = 1_000_000_000e18;
```

:::info

Puedes ver la distribución que se hará del token CSHOP, [aquí](/docs/general/governance#distribution-of-cshop).

:::

#### Modificación de la dirección que permite crear tokens

Esta función permite modificar la dirección que puede crear tokens, solo la puede modificar la dirección mencionada. Cabe destacar que actualmente esta dirección está en manos del equipo de CipherShop y así seguirá de momento.

```
function setMinter(address _address) external onlyMinter {
    require(address(0) != _address);
    emit MinterChanged(minter, _address);
    minter = _address;
}
```

#### Transferencia en bucle

Esta última función permite realizar múltiples envíos del token a varias direcciones con cantidades diferentes. Se ha introducido esta función para que el protocolo pueda enviar facilmente tokens, por ejemplo en las distribuciones anuales.

```
function multiTransfer(address[] memory addresses, uint256[] memory quantities) external {
    require(addresses.length > 0);
    require(quantities.length > 0);
    require(addresses.length == quantities.length);
    for (uint256 i = 0; i < addresses.length; i++) {
        transfer(addresses[i], quantities[i]);
    }
}
```

## Contrato en la blockchain

El contrato se ha lanzado a la red principal de Ethereum y está disponible para operar con él.

:::info

Accede [aquí](https://etherscan.io/address/0x547b5362a0aa165cf98237c98cda5a4003f5ca9f#code) para ver el contrato operativo en la blockchain de Ethereum.

:::
