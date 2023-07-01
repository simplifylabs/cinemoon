module.exports = {
  expo: {
    name: 'CineMoon',
    slug: 'cinemoon',
    scheme: 'cinemoon',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    backgroundColor: '#1f2128',
    extra: {
      apiUrl: process.env.API_URL,
    },
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#1f2128',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'net.cinemoon',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'net.cinemoon',
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    plugins: [
      [
        '@config-plugins/detox',
        {
          skipProguard: false,
          subdomains: ['10.0.2.2', 'localhost'],
        },
      ],
    ],
  },
};
