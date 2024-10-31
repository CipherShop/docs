---
sidebar_label: 'El Protocolo'
sidebar_position: 2
---

# El Protocolo

## Objetivos del protocolo

El protocolo consiste en una serie de contratos inteligentes de Ethereum que permiten la creación de los principales objetivos de CipherShop.

Los objetivos son:

- **Utilizar criptomonedas como medio de pago**, siendo una alternativa al dinero que se utiliza actualmente, con la ventaja de que no implican el uso de intermediarios, como los bancos.

- **Permitir la compra de cualquier bien físico o digital**, con el **uso opcional del estándar ERC-721 (NFTs)**. Dar a los usuarios la opción de tokenizar los bienes como alternativa, permitiéndoles así obtener ingresos pasivos, ya sea mediante la reventa o teniendo una parte proporcional del bien en forma de token.

- **Incentivar a los usuarios para que utilicen la plataforma**, de forma que sean los propios usuarios los que gestionen el futuro del protocolo, a través de un sistema de gobernanza. Además, se utilizará un sistema de reputación como comprador y vendedor, permitiendo obtener más o menos recompensas, en función de las acciones que los usuarios del protocolo decidan realizar.

- **Minimizar el fraude y la falta de confianza** de compradores y vendedores mediante normas establecidas.

- **Evitar a toda costa el uso de terceros o intermediarios**, pero al tratarse de un sistema peer-to-peer, aunque el protocolo minimice al máximo el fraude, siempre pueden producirse incidencias, para ello, opcionalmente, el protocolo dispondrá de un sistema con el que un administrador de confianza, inicialmente del equipo de CiperShop, y posteriormente podrán ser otros administradores elegidos por la comunidad, resolverá la incidencia en base a las pruebas aportadas.

- **Ser transparente en todo momento**, de código abierto, bien documentado y disponible para los usuarios desde el principio.

- **Tener una interfaz sencilla y fácilmente accesible** para cualquier tipo de público.

## ¿Cómo funciona el protocolo CiperShop?

Para lograr los objetivos mencionados, se han creado contratos inteligentes basados en Ethereum, desarrollados en Solidity 0.8.11.

El funcionamiento del protocolo consiste en el uso de un tercero como intermediario. En este caso, el tercero consiste en un contrato inteligente de Ethereum en el que se mantendrán los depósitos.

Cuando el comprador haya recibido el producto, el vendedor recibirá el dinero.

En detalle, un usuario con un monedero con acceso a la Web 3.0, como MetaMask, Fortmatic, WalletConnect, etc. Tendrá acceso a la interfaz diseñada para interactuar con el protocolo.

Un usuario, en este caso un vendedor, utilizando una dirección Ethereum puede registrar un producto físico o digital, junto con algunas características: título, descripción, fotos del producto, categoría, precio, tipo de criptomoneda, país desde el que se envía, país o países a los que se envía, método de envío, tiempo de envío, si permite devoluciones, si es visible para el público o si sólo es visible para determinadas direcciones Ethereum.

Otro usuario, en este caso un comprador, podrá hacer ofertas por un precio menor, o comprar el producto directamente. En el caso de una oferta, ésta irá al contrato inteligente creando un depósito, con los detalles de la oferta y una fecha de validez. Pasado el tiempo de validez, si el vendedor no acepta la oferta, este depósito será devuelto al comprador. Si la acepta, se convertirá en una compra directa, por lo que el resto de las ofertas serán canceladas y los depósitos serán devueltos a sus correspondientes usuarios. Y se iniciará una transacción.

En la transacción se detallan las características de la compra, como el producto, la cantidad y su estado, es decir, si se ha marcado como enviado por el vendedor, recibido por el vendedor, recibido por el comprador, si se ha solicitado una devolución, en caso de que el vendedor haya indicado que acepta devoluciones, y en caso de devolución, lo mismo pero a la inversa, si el comprador lo ha marcado como, enviado, recibido, etcétera.

La transacción terminará en varios estados, y puede terminar con éxito, cobrando una comisión del 0,3%, de la cual el 70% irá a la tesorería de la comunidad, y el 30% al propio contrato inteligente, para pagar futuras transacciones automatizadas. Dependiendo de cómo finalice el estado de la transacción, influirá la reputación como vendedor o la reputación como comprador, según sea el caso.

En caso de incidencias, un administrador de confianza, inicialmente del equipo de CiperShop y luego elegido por la comunidad, intervendrá en la transacción. Él será el encargado de resolver la transferencia a favor del comprador o del vendedor en base a las pruebas aportadas. Hay que tener en cuenta que el vendedor se encarga de todo el proceso hasta la recepción del producto por parte del comprador, en caso contrario el intermediario actuará a favor del comprador.

:::note Nota

Para más detalles sobre el mecanismo del protocolo, consulte la 
página [Whitepaper](/docs/learn/whitepaper)

:::