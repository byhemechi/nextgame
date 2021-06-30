module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination:
          "https://play.google.com/store/apps/details?id=au.id.george.nextgame",
        permanent: false,
      },
    ];
  },
};
