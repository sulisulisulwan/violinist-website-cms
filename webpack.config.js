import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default (env) => {

  return {
    mode: env.MODE,
    entry: __dirname + '/src/index.tsx',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader"
          ]
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body'
      }),
      new MiniCssExtractPlugin({
        filename:"main.css",
      })
    ],
    output: {
      path: path.resolve(__dirname, "dist"),
      // publicPath: path.resolve(__dirname, "./dist/"),  <--- this is for the path of the js and css links within the html
    },
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts"]
    },
  }
}




