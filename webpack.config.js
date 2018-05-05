var webpack = require('webpack');

var config = {
    watch: true,
    context: __dirname + '/src',
    entry: ['./js/main.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'main.js',
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }]
    }
};

module.exports = config;


