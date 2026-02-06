module.exports = {
  ci: {
    collect: {
      staticDistDir: './build',
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox --disable-setuid-sandbox',
      },
    },
  },
};
