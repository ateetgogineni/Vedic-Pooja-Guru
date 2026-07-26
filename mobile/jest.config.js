module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(?:.pnpm/)?(' +
      [
        '@react-native',
        'react-native',
        '@react-navigation',
        'react-native-gesture-handler',
        'react-native-reanimated',
        'react-native-screens',
        'react-native-safe-area-context',
        'react-native-vector-icons',
        'react-native-tts',
        'react-native-url-polyfill',
      ].join('|') +
      ')/)',
  ],
};
