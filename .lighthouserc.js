module.exports = {
  ci: {
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        "categories:performance": ["error", {"minScore": 0.90}],
        "categories:accessibility": ["error", {"minScore": 1}],
        "categories:best-practices": ["error", {"minScore": 1}],
        "categories:seo": ["error", {"minScore": 1}],
        "uses-long-cache-ttl": "off",
        "legacy-javascript": "off",
        "is-crawlable": "off",
        "canonical": "off"
      },
    },
    collect: {
      url: ['http://localhost:3000/'],
      settings: {
        disableStorageReset: true,
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}