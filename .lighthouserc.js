const BASE_URL_ALIAS = 'http://localhost:3000';

module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        'categories:performance': [
          'error',
          { minScore: 0.90, aggregationMethod: 'median' },
        ],
      },
    },
    collect: {
      url: BASE_URL_ALIAS,
      numberOfRuns: 10,
    },
  },
};
