/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
          {
            source: '/accounts/:slug*',
            destination: 'https://api.ech.network/cosmos/auth/v1beta1/accounts/:slug*'
          },
          {
            source: '/broadcast',
            destination: 'https://api.ech.network/cosmos/tx/v1beta1/txs'
          },
          {
            source: '/rewards/:slug*',
            destination: 'https://api.ech.network/cosmos/distribution/v1beta1/delegators/:slug*/rewards'
          },
        ]
      },
};


// https://api.ech.network/cosmos/auth/v1beta1/accounts/