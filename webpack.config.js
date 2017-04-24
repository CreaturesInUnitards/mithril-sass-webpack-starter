var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: path.resolve(__dirname, './src/index.js'),
	module: {
		rules: [
			{
				test: /\.sass$/,
				use: [
					{
						loader: 'style-loader' 
					},
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: true }
					}
				]
			},
			{
				test: /\.html$/,
				use: [
					'raw-loader'
				]
			},
			{
				test: /\.png$/,
				use: [
					'raw-loader',
					'img-loader'
				]
			}
		]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './build')
	},
	devtool: 'source-map',
	watch: true,
	plugins: [
		new HtmlWebpackPlugin({template: './template.ejs'}),
		new CopyWebpackPlugin([{from: 'src/images', to: 'images/'}])
	]
}