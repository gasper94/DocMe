const path = require('path');
const dotenv = require('dotenv');

module.exports = function (api) {
  api.cache(true)

  console.log("Hello!")
  const APP_ENV = process.env.APP_ENV || 'production'
  console.log("APP_ENV:", APP_ENV);

  const envPath = path.resolve(__dirname, `../../`, `.env.${APP_ENV}`)
  console.log("envPath:", envPath);


  const envResult = dotenv.config({
    path: envPath,
  });

  if (envResult.error) {
    throw envResult.error;
  }


  const isDev = APP_ENV.startsWith('dev');

  console.log("isDev:", isDev);

  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      'react-native-reanimated/plugin',
      'nativewind/babel',
      [
        'babel-plugin-inline-dotenv',
        {
          path: envPath
        },
        !isDev && 'babel-plugin-transform-remove-console',
      ].filter(Boolean)
    ],
  }
}
