module.exports = {
// ...
    configureWebpack: {
        // ...
        plugins: [
            new webpack.DefinePlugin({
                'process.env': require('dotenv').config().parsed
            })
        ]
    }
};