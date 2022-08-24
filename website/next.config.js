const GOOGLE_MAPS_APIKEY = process.env.GOOGLE_MAPS_APIKEY

module.exports = {
  env: {
    GOOGLE_MAPS_APIKEY,
  },
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/james-wallis/salsamish',
        permanent: true,
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/SalsaMish',
        permanent: true,
      },
      {
        source: '/clubhouse',
        destination: 'https://www.clubhouse.com/club/salsa-mish',
        permanent: true,
      },
      {
        source: '/facebook',
        destination: 'https://www.facebook.com/SalsaMish',
        permanent: true,
      },
    ]
  },
}
