module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'module:react-native-dotenv',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '/index.ts',
          '/index.tsx',
          '/index.js',
          '/index.jsx',
          '.json',
          ''
        ],
        alias: {
          '@Theme': './src/theme',
          '@Store': './src/store',
          '@Scenes': './src/scenes',
          '@Navigators': './src/navigators',
          '@Components': './src/components',
          '@Context': './src/context',
          '@Lib': './src/lib',
          '@Assets': './src/assets'
        }
      }
    ],
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg']
      }
    ]
  ]
};
