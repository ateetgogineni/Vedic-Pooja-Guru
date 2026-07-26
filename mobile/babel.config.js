module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
        },
        extensions: ['.ios.tsx', '.android.tsx', '.tsx', '.ios.ts', '.android.ts', '.ts', '.jsx', '.js', '.json'],
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
    // NOTE: must remain the last plugin in this array.
    'react-native-reanimated/plugin',
  ],
};
