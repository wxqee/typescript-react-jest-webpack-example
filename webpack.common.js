const debug = require('debug')('app:webpack-common');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const packageConfig = require('./package.json');

debug('packageConfig => %j', packageConfig);

module.exports = {
    entry: {
        main: './src/index.tsx',
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'docs'),
    },
    module: {
        rules: [
            {
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                test: /\.tsx?/,
                loader: 'awesome-typescript-loader',
            },
            {
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['docs']),
        new HtmlWebpackPlugin({
            title: '加减乘除',
            keywords: '加减乘除,四则运算,孩子,算术,十以内加减法',
            description: '加减乘除计算游戏',
            template: './index.html',
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    }
};
