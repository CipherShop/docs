---
sidebar_label: 'Gobernanza'
sidebar_position: 3
---

# Gobernanza

## La DAO

:::info

La DAO se basa en la original "The DAO" creada en 2016, cuyos errores en los contratos inteligentes provocaron el hard fork de Ethereum, creando Ethereum Classic y el actual Ethereum.

:::

Nuestra DAO, es una versión mayor del original y adaptada al ecosistema de CipherShop. Esta tiene tres componentes: dos en la red y otro fuera de la red.

- **Un estándar ERC-20 de Ethereum**, o un token llamado **CSHOP** (en la red).

- **Un sistema de gobernanza** a través del cual votar propuestas, con las que: decidir la actualización del protocolo, decidir a qué asociaciones donar o proyectos financiar, y cambiar aspectos del protocolo CipherShop, como las tarifas (en la red).

- **Un foro** para pre-discutir propuestas, ver las decisiones de la gente y en base a esto decidir si vale la pena o no hacer una propuesta. O donde debatir sobre las propuestas realizadas (fuera de la red).

## El estándar ERC-20 CSHOP

El token ERC-20 CSHOP ha sido creado con un objetivo en mente: animar a los usuarios a utilizar el protocolo y permitirles, a través de la DAO, cumplir sus objetivos.

> La dirección Ethereum del token CSHOP es: [0x547b5362a0aa165cf98237c98cda5a4003f5ca9f](https://etherscan.io/address/0x547b5362a0aa165cf98237c98cda5a4003f5ca9f).

El contrato ha sido creado a partir de la última versión de OppenZeppelin y modificado con las funciones necesarias.

> Para ver el contrato inteligente puede acceder al repositorio core, e inspeccionar el propio contrato inteligente, [aquí](https://github.com/CipherShop/core/tree/master/contracts/CShop.sol).

### Distribución de CSHOP

Inicialmente se crearán 1.000.000.000 (mil millones) de CSHOP, que se distribuirán a lo largo de 4 años en las siguientes proporciones:

- **56% para la comunidad y la tesorería de la comunidad.** A los 4 años: 560.000.000 CSHOP.

- **24,333% para el equipo de desarrollo.** A los 4 años: 243.330.000 CSHOP.

- **18,069% para los inversores.** A los 4 años: 180.690.000 CSHOP.

- **0,968% para pequeños inversores iniciales.** A los 4 años: 9.680.000 CSHOP.

- **0,63% para los anunciantes.** A los 4 años: 6.300.000 CSHOP.

Un total de 120.000.000 de CSHOP estarán inicialmente disponibles para la comunidad y la tesorería de la comunidad. De estos, 20.000.000 (16,6667%) estarán disponibles en el contrato inteligente del protocolo, para incentivar a los usuarios a utilizarlo.

Como se puede ver, hay dos fases de captación de inversores, la primera fase disponible para cualquier usuario tendrá como objetivo recaudar una cantidad mínima de capital, para auditar el protocolo y ver vulnerabilidades, lanzar el protocolo y contratar miembros para el equipo, que actualmente es una persona.

:::info
Hay una sección de documentos sobre [unirse al equipo](/docs/maintain/team).
:::

La distribución de los tokens CSHOP a lo largo de los 4 años será la siguiente:

- Año 1: 40%.

- Año 2: 30%.

- Año 3: 20%.

- Año 4: 10%.

En el caso de la tesorería comunitaria y de los pequeños inversores iniciales, el porcentaje se calculará restando el importe total de los 4 años establecidos, menos el importe inicialmente disponible.

Después de 4 años, habrá una tasa de inflación anual del 1,6%.

### Atracción de inversores

En la primera distribución a pequeños inversores, 2.000.000 CSHOP estarán disponibles para su compra directa a través de un contrato inteligente, garantizando así la seguridad. Con un precio inicial de 0,16 dólares, con un incremento de 0,01 dólares por cada 400.000 CSHOP vendidos.

:::info
Esta distribución está disponible actualmente [aquí](https://ciphershop.org/es/blog/initial-private-purchase-available), hasta agotar existencias.
:::

La segunda fase de captación de inversores corresponderá al lanzamiento oficial de la moneda, junto con el protocolo, una vez que haya sido debidamente auditado y probado. Con el objetivo de atraer a grandes inversores que quieran formar parte del proyecto, financiándolo y ayudando a crear un gran ecosistema.

## Gobernanza

Al incentivar a los usuarios a utilizar el protocolo, esto permitiría a los propios usuarios controlar las actualizaciones del protocolo o los cambios en las condiciones de base.

Así, el protocolo tendría un sistema de gobernanza en el que los usuarios con CSHOP podrían votar en cambios o dar subvenciones a organizaciones o financiar proyectos relacionados con CipherShop y así crear un gran ecosistema.

Para lanzar una propuesta en la gobernanza, se necesitan al menos 100 CSHOP propios o delegados. Habrá un periodo de votación de 7 días, en el que cualquier persona con CSHOP podrá votar y dependiendo del tipo de propuesta, si alcanza al menos, 500.000 votos de CSHOP, propios o delegados y un 51% de votos positivos, se ejecutará automáticamente al cabo de 2 días el código para ejecutar el cambio, si se trata de un cambio de gobernanza. Ya que habrá diferentes tipos de propuestas.

> Accede a la [web de gobernanza](https://gov.ciphershop.org).

## El foro

El foro será un sistema fuera de la cadena, en el que a través de un sistema de registro tradicional, habrá diferentes salas en las que debatir futuras propuestas, o propuestas en curso.

Una sala del foro podrá conectarse a una propuesta automáticamente, pero no utilizará contratos inteligentes.

> Accede a la [web del foro](https://forum.ciphershop.org).
