// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CipherShop Docs',
  tagline: 'The source of truth of the CipherShop protocol',
  url: 'https://docs.ciphershop.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/ciphershop_logo_32x32_favicon.ico',
  organizationName: 'CipherShop', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/CipherShop/docs/tree/main/packages/docs/',
        },
        // showLastUpdateAuthor: true,
        // showLastUpdateTime: true,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      hideableSidebar: true,
      navbar: {
        title: 'CipherShop Docs',
        logo: {
          alt: 'CipherShop Logo',
          src: 'img/ciphershop_logo_800x800_invert_money.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'general/getting-started',
            position: 'left',
            label: 'Get Started',
          },
          {
            type: 'doc',
            docId: 'learn/smart-contracts',
            position: 'left',
            label: 'Learn',
          },
          {
            type: 'doc',
            docId: 'maintain/roadmap',
            position: 'left',
            label: 'Maintain',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://ciphershop.org/whitepaper',
            label: 'Whitepaper',
            position: 'right',
          },
          {
            href: 'https://github.com/CipherShop',
            //label: 'GitHub',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub Repository'
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Get Started',
                to: '/docs/general/getting-started',
              },
              {
                label: 'Learn',
                to: '/docs/learn/smart-contracts',
              },
              {
                label: 'Maintain',
                to: '/docs/maintain/roadmap',
              },
            ],
          },
          {
            title: 'Ecosystem',
            items: [
              {
                label: 'Home',
                href: 'https://ciphershop.org',
              },
              {
                label: 'App',
                href: 'https://app.ciphershop.org',
              },
              {
                label: 'DAO',
                href: 'https://dao.ciphershop.org',
              }
            ],
          },
          {
            title: 'Technology',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ciphershop',
              },
              {
                label: 'Whitepaper',
                href: 'https://ciphershop.org/whitepaper',
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Forum',
                href: 'https://forum.ciphershop.org'
              },
              {
                label: 'Blog',
                href: 'https://ciphersop.org/blog',
              },
              {
                label: 'Contact',
                href: 'mailto:dev@ciphershop.org',
              }
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'Telegram',
                href: 'https://t.me/ciphershop',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/CipherShop',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/ciphershop/about'
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} CipherShop. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeConfigs: {
      en: {
        htmlLang: 'en-US',
      },
      es: {
        htmlLang: 'es-ES',
      },
    },
  },
};

module.exports = config;
