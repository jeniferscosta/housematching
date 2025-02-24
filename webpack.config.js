const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.web.js',
  output: {
	path: path.resolve(__dirname, 'dist'),
	filename: 'bundle.js',
  },
  resolve: {
	alias: {
	  'react-native$': 'react-native-web',
	},
	extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
	rules: [
	  {
		test: /\.(js|jsx|ts|tsx)$/,
		exclude: /node_modules/,
		use: {
		  loader: 'babel-loader',
		},
	  },
	  {
		test: /\.(png|jpe?g|gif|svg)$/,
		use: {
		  loader: 'file-loader',
		  options: {
			name: '[name].[ext]',
			outputPath: 'assets/',
		  },
		},
	  },
	],
  },
  plugins: [
	new HtmlWebpackPlugin({
	  template: 'index.html',
	}),
  ],
  devServer: {
    static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
  },
};