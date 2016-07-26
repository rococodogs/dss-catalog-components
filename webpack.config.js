var webpack = require('webpack')

module.exports = {
	entry: [
		'./src'
	],

	module: {
		loaders: [
      {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, './'),
          exclude: /node_modules/,
          loader: 'babel',
          query: {
              presets: ['es2015', 'react'],
          }
      },
      {
          test: /\.json$/,
          include: path.resolve(__dirname, './'),
          exclude: /node_modules/,
          loader: 'json',
      },
		]
	}
}
