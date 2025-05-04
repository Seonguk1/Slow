module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript', 
  ],
  
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
        },
      },
    ],
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
    'react-native-reanimated/plugin',
  ],
};
