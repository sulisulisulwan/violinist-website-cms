import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import MiniCssExtractPlugin from "mini-css-extract-plugin"

const __dirname = dirname(fileURLToPath(import.meta.url))

import.meta

export default {
  mode: 'development',
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
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: path.resolve(__dirname, "./dist/"),
  
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"]
  },
}



