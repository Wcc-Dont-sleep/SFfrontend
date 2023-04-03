const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/human_resource/organization',
        permanent: true
      }
    ];
  }
};

module.exports = withImages(redirects);
