---
sidebar_label: 'Colección de NFTs CipherPunks'
sidebar_position: 4
---

# Contrato inteligente: colección de NFTs CipherPunks

:::note Nota

Puedes ver el contrato original [aquí](https://github.com/CipherShop/core/tree/master/contracts/CipherPunks.sol).

:::

## Introducción

El contrato inteligente ha sido creado con el lenguaje Solidity en la versión 0.8.7.

Para la creación, nos hemos basado en los contratos del estándar ERC-721 (NFTs) de OpenZeppelin, en la versión 4.8 (ver [aquí](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/release-v4.8/contracts/token/ERC721)).

:::info

La colección CipherPunks ya está disponible, y hay 10.000 de NFTs a la venta. A un precio de 0,06 ETH por NFT. Accede [aquí](https://ciphershop.org/es/cipherpunks) para comprar tus NFTs, con privilegios en el [foro](https://forum.ciphershop.org) y futuras recompensas. Lee más [aquí](https://ciphershop.org/es/blog/the-forum).

:::

## Librerías

Básicamente usamos las librería de OpenZeppelin del token ERC-721, la librería Ownable (para administrar la posesión del contrato) y Strings (para trabajar con operaciones de Strings).

```
import "./extensions/ERC721Enumerable.sol";
import "./access/Ownable.sol";

contract NFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    // Código del contrato
}
```

## Código del contrato

### Inicialización

Al inicializar el contrato, definimos el nombre y el símbolo de la colección NFT (CipherPunks y ₵) y la URI donde están alojadas los metadatos de los NFTs, en este caso en IPFS (ipfs://QmaDNebnsXwfQqkUbry65RuaiPMdPT1saG1ok48CYYQg5k/).

Al inicializar se crearán 20 NFTs con la dirección que creó el contrato inteligente, mediante la función `mint()`.

```
constructor(string memory _name, string memory _symbol, string memory _initBaseURI) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
    mint(msg.sender, 20);
}
```

### Funciones

#### Crear NFT

La función `mint()` se encarga de crear los NFTs. Es necesario que se indique la cantidad (hasta un máximo de 20 NFTs por dirección) y se envíe ETH por cada NFT a crear. Actualmente el valor de cada NFT está en 0,06 ETH.

Esta función determina si la dirección que hace la transacción es el actual propietario del contrato, o si está en una lista blanca. En estos casos, la creación es gratuita. Es caso contrario, tendrá que enviar la cantidad de ETH anteriormente mencionada.

La función crea los NFT mediante la función `_safeMint()`, descrita en el contrato [ERC721.sol](https://github.com/CipherShop/core/tree/master/contracts/ERC721.sol). Resumidamente esta función asigna la propiedad del NFT a la dirección que realiza la llamada.

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

#### Ver URI de un NFT

Devuelve la URI de los metadatos del identificador del NFT de la colección.

```
function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0 ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension)) : "";
}
```

#### Ver NFTs de una dirección

Devuelve los identificadores de la colección que posee una dirección de Ethereum.

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

#### Cambiar el precio de creación de un NFT

Función para actualizar el precio de creación de un NFT, solo la puede llamar el actual propietario del contrato. Actualmente está en 0,06 ETH.

```
function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
}
```

#### Cambiar la cantidad máxima de creación por dirección

Función para actualizar la cantidad máxima de NFTs que puede crear una dirección, solo la puede llamar el actual propietario del contrato. Actualmente está en 20 NFTs por dirección.

```
function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
}
```

#### Modificar la URI de la colección

Función para modificar la URI donde se alojan los metadatos de la colección.

```
function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
}
```

#### Pausar o reanudar el contrato inteligente 

Permite pausar o reanudar el funcionamiento del contrato inteligente.

```
function pause(bool _state) public onlyOwner {
    paused = _state;
}
```

#### Añadir dirección a la lista blanca

Añade una dirección a la lista blanca. Esto permite que la dirección añadida, pueda crear NFTs gratuitamente. Solo la puede llamar el actual propietario del contrato.

```
function whitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = true;
}
```

#### Eliminar dirección de la lista blanca

Elimina la dirección indicada de la lista blanca. Solo la puede llamar el actual propietario del contrato.

```
function removeWhitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = false;
}
```

#### Sacar fondos almacenados

Saca los fondos en ETH alojados en el contrato por la compra de NFTs. Solo la puede llamar el actual propietario del contrato.

```
function withdraw() public payable onlyOwner {
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
}
```

#### Otras funciones

En este documento se han descrito las funciones principales del contrato CipherPunks.sol. Pero hay más funciones relacionadas con la propiedad del contrato (consultar [aquí](https://github.com/CipherShop/core/tree/master/contracts/access/Ownable.sol)), o propias del estándar ERC721 (consultar [aquí](https://github.com/CipherShop/core/tree/master/contracts/ERC721.sol)).

## Contrato en la blockchain

El contrato se ha lanzado a la red principal de Ethereum y está disponible para operar con él.

:::info

Accede [aquí](https://etherscan.io/address/0x19b9a91a07d5c539f0078768034530370a659d0e#code) para ver el contrato operativo en la blockchain de Ethereum.

:::

## Metadatos en IPFS

Los metadatos y las imágenes de la colección están alojados en IPFS mediante Pinata.

:::info

Accede [aquí](https://aquamarine-imaginative-pike-30.mypinata.cloud/ipfs/QmaDNebnsXwfQqkUbry65RuaiPMdPT1saG1ok48CYYQg5k/) para ver los metadatos y [aquí](https://aquamarine-imaginative-pike-30.mypinata.cloud/ipfs/QmVXWovu3MajR9L3n2M9wQogDbhoPFwfVA4ws17e7oZ1U9/) para ver las imágenes de la colección.

:::
