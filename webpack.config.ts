import path from 'path';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const config: webpack.Configuration = {
	entry: './src/index.tsx',
	mode: 'development',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(t|j)sx?$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript',
						],
					},
				},
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
	resolve: { 
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
	},
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		compress: true,
		hotOnly: true,
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin({
			async: false,
			eslint: {
				files: './src/**/*',
			},
		}),
	],
};

export default config;

