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
            source: '/broadcast/:slug*',
            destination: 'https://api.ech.network/cosmos/tx/v1beta1/txs/:slug*'
          },
        ]
      },
};


// https://api.ech.network/cosmos/auth/v1beta1/accounts/