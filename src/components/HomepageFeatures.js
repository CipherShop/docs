import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'General',
    Svg: require('../../static/img/undraw_ciphershop_moon.svg').default,
    description: (
      <>
        Discover what CipherShop is and its components: the protocol as well as its governance. Immerse yourself in the Web 3.0 revolution.
      </>
    ),
  },
  {
    title: 'Learn',
    Svg: require('../../static/img/undraw_ciphershop_tree.svg').default,
    description: (
      <>
        Learn the technical details of the core CipherShop protocol, the technical aspects in detail and for newcomers, there are guides on how to interact with the interface.
      </>
    ),
  },
  {
    title: 'Maintain',
    Svg: require('../../static/img/undraw_ciphershop_maintain.svg').default,
    description: (
      <>
        For those who want to contribute to improving the CipherShop ecosystem, discover the tools or become part of the team.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
