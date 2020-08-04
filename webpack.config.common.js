const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin= require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const outputDirectory = 'public';

module.exports = {
	entry: {
		babel: '@babel/polyfill',
		'ic-tech': './src/index.js',
		'signin': './src/signin.js',
		'verify': './src/verify.js',
		'reset': './src/reset.js',
		'contact': './src/message.js',
	},
	output: {
		path: path.join(__dirname, outputDirectory),
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'file-loader?name=assets/[name].[ext]&limit=100000'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	devServer: {
		port: 3000,
		open: false
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'IC-Tech',
			template: './src/public/index.html',
			filename: 'index.html',
			chunks: ['ic-tech', 'babel', 'vendor'],
			favicon: './src/public/favicon.ico'
		}),
		new HtmlWebpackPlugin({
			title: 'IC-Tech',
			template: './src/public/index.html',
			filename: 'signin.html',
			chunks: ['signin', 'babel', 'vendor'],
			favicon: './src/public/favicon.ico'
		}),
		new HtmlWebpackPlugin({
			title: 'IC-Tech',
			template: './src/public/index.html',
			filename: 'verify.html',
			chunks: ['verify', 'babel', 'vendor'],
			favicon: './src/public/favicon.ico'
		}),
		new HtmlWebpackPlugin({
			title: 'IC-Tech',
			template: './src/public/index.html',
			filename: 'reset.html',
			chunks: ['reset', 'babel', 'vendor'],
			favicon: './src/public/favicon.ico'
		}),
		new HtmlWebpackPlugin({
			template: './src/index-new.html',
			filename: 'contact.html',
			chunks: ['contact', 'babel', 'vendor'],
		}),
		new CopyPlugin([
			{
				from: 'src/public',
				to: './'
			}
		]),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.__IC_DEV__': process.env.WEBPACK_DEV_SERVER == 'true' ? 'true' : 'false'
		})
	]
};
