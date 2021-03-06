const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    // TODO: Explain Source Map
    devtool: 'inline-source-map',
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [[
                            '@babel/preset-env', {
                                targets: {
                                    esmodules: true
                                }
                            }],
                            '@babel/preset-react']
                    }
                }
            },
            {
                test: [/\.s[ac]ss$/i, /\.css$/i],
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(gif|png|jpe?g)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'assets/images/'
                    }
                  }
                ]
              },
        ]
    },
    plugins: [new Dotenv({
        path: './.env',
        safe: true,
        systemvars: true,
        silent: true,
        defaults: false
    })],
    resolve: {
        extensions: ['.js'],
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'build', 'js'),
    },
};