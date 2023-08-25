const { override, fixBabelImports, addLessLoader, addWebpackAlias, addDecoratorsLegacy } = require('customize-cra');
const path = require('path');
const theme = require('./theme');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: true,
  }),
  addDecoratorsLegacy(),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: theme
    }
  }),
  addWebpackAlias({ //路径别名
    '@': path.resolve(__dirname, 'src'),
    'assets': path.resolve(__dirname, 'src/assets'),
    'components': path.resolve(__dirname, 'src/components'),
  }),
);
