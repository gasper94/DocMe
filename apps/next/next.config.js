const { withExpo } = require('@expo/next-adapter')
const withPlugins = require('next-compose-plugins')
const APP_ENV = process.env.APP_ENV || 'production'
const path = require('path')
const dotenv = require('dotenv')

console.log('APP_ENV:', APP_ENV)

const envPath = path.resolve(__dirname, `../../`, `.env.${APP_ENV}`)

const envResult = dotenv.config({
  path: envPath,
})

console.log('envResult:', envResult)

const env = {}
console.log('Object:', JSON.stringify(Object))

Object.keys(process.env).forEach((key) => {
  if (key.startsWith('NEXT_PUBLIC_')) {
    env[key] = process.env[key]
  }
})

console.log('hello there:', env)

// module.exports = withPlugins(
//   [
//     withSourceMaps(dirname),
//     withTM,
//     withBundleAnalyzer,
//     withFonts,
//     withImages,
//     ...resizeTo,
//     [withExpo, { projectRoot: '../..' }],
//   ],
//   { ...nextConfig, env }
// )

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/nandorojo/moti/issues/224
  // https://github.com/necolas/react-native-web/pull/2330
  // https://github.com/nandorojo/moti/issues/224
  // once that gets fixed, set this back to true
  env: env,
  reactStrictMode: false,
  transpilePackages: [
    'react-native',
    'react-native-web',
    'solito',
    'moti',
    'app',
    'react-native-reanimated',
    'nativewind',
    'react-native-gesture-handler',
    'react-native-svg',
    // Here
    'expo-status-bar',
    'expo-av',
    'expo-modules-core',
    'expo-asset',
    'expo-sharing',
  ],
}

module.exports = withExpo(nextConfig)
