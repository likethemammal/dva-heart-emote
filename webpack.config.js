const path = require('path')

const plugins = [

]

const css_loader = {
    loader: 'css-loader',
    options: {
        modules: true,
        localIdentName: '[name].[local]',
    },
}

const postcss_loader = {
    loader: 'postcss-loader',
    options: {
        plugins: function () {
            return [

            ]
        }
    }
}

const config = {

    context: path.resolve(__dirname, './src'),

    entry: {
        bundle: './index.js',
    },

    output: {
        filename: '[name].js',
        path:  path.resolve(__dirname, './lib'),
        publicPath: '/',

        library: 'OverwatchSideNav',
        libraryTarget: 'umd',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    'babel-loader',
                    'source-map-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    css_loader,
                    postcss_loader,
                ],
            },
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    css_loader,
                    postcss_loader,
                    'less-loader',
                ],
            },
            {
                test: /\.(svg)$/,
                use: ['raw-loader'],
                // exclude: /(node_modules)/,
            },
        ]

    },
    plugins,
}

module.exports = config
