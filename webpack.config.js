var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: ["./js/transform.js","./js/main.js"],
	output: {
		path: path.join(__dirname , "js"),
		filename: "app.js"
	},
	resolve: {
        extensions: ['', '.js', '.jsx'],
		alias:{
			jquery: "./require/jquery-2.2.0.min.js"
		}
    },
	module: {
		loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            }
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			// Automtically detect jQuery and $ as free var in modules
			// and inject the jquery library
			// This is required by many jquery plugins
			jQuery: "jquery",
			$: "jquery"
		})
	]
};

module.exports.hello = "hello";
