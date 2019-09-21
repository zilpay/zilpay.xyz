module.exports = {
  base: '/app/Documentation/',
  plugins: [
  ],
  title: 'ZilPay',
  head: [
    ['link', { rel: 'icon', href: 'https://zilpay.xyz/favicon.ico' }]
  ],
  description: 'ZilPay Developer Documentation',
  themeConfig: {
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'ZilPay', link: 'https://zilpay.xyz' },
      { text: 'GitHub', link: 'https://github.com/zilpay/zil-pay' }
    ],
    sidebar: [
      {
        title: 'General',
        sidebarDepth: 1,
        children: [
          '/getting-started/',
          '/common-terms/',
          '/initializing-dapps/',
          '/accessing-accounts/'
        ]
      },
      {
        title: 'API Reference',
        children: [
          '/zilliqa-provider/',
          '/zilliqa-api-blockchain/',
          '/zilliqa-api-crypto/',
          '/zilliqa-api-utils/',
          '/zilliqa-contracts/'
        ]
      }
    ]
  }
}