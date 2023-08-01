// Learn more https://docs.expo.dev/guides/monorepos
// Learn more https://docs.expo.io/guides/customizing-metro
/**
 * @type {import('expo/metro-config')}
 */
const { getDefaultConfig } = require('expo/metro-config')
const path = require('path');
const { isObject } = require('util');

// Find the project and workspace directories
const projectRoot = __dirname
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot]
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]
// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true

// // // 4. Assets
// config.resolver.sourceExts.push(
//   // Adds support for `.db` files for SQLite databases
//   '.jsx', 
//   '.js', 
//   '.ts', 
//   'tsx', 
//   'cjs', 
//   'json', 
//   'native.js', 
//   'native', 
//   'ios.jsx', 
//   'native.jsx', 
//   'ios.js', 
//   'native.js', 
//   'ios.ts', 
//   'native.ts', 
//   'native.tsx', 
//   'ios.cjs', 
//   'native.cjs', 
//   'cjs', 
//   'ios.json', 
//   'native.json', 
//   'json'
// );

module.exports = config

// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
//   resolver: {
//     sourceExts: ['.jsx', '.js', '.ts', 'tsx', 'cjs', 'json', 'native.js', '.native', 'ios.jsx', 'native.jsx', '.ios.js', 'native.js', 'ios.ts', 'native.ts', 'native.tsx', '.ios.cjs', 'native.cjs', '.cjs', 'ios.json', 'native.json', '.json'] //add here
//   },
// };
