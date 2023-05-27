/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
          {
            source: '/accounts/:slug*',
            destination: 'https://api.fury.black/cosmos/auth/v1beta1/accounts/:slug*'
          },
          {
            source: '/broadcast',
            destination: 'https://api.fury.black/cosmos/tx/v1beta1/txs'
          },
          {
            source: '/rewards/:slug*',
            destination: 'https://api.fury.black/cosmos/distribution/v1beta1/delegators/:slug*/rewards'
          },
        ]
      },
};


// https://api.fury.black/cosmos/auth/v1beta1/accounts/