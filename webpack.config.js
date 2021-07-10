const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//Estos para optimizar
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js", //Archivo principal
  output: {
    path: path.resolve(__dirname, "dist"), // Donde vamos a guardar todo el final
    filename: "[name].[contenthash].js", // Para generarlos con hasd :3
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"], // Que extensiones vamos a tener :3
    alias: {
      //Creamos alias :3
      "@components": path.resolve(__dirname, "src/components"),
      "@styles": path.resolve(__dirname, "src/styles/"),
    },
  },
  mode: "production",
  module: {
    //Nuestras Reglas
    rules: [
      {
        test: /\.(js|jsx)$/, // Lee los archivos js y jsx
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", //Babel :V
        },
      },
      {
        test: /\.html$/, // Para trabajar con HTML :3,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], //Para CSS y SASS
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body", // INYECTA EL BUNDLE AL TEMPLATE HTML puede ser en el body o header :V
      template: "./public/index.html", // Donde esta
      filename: "./index.html", // y como se llamara al final
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", //Nombre del archivo final con hasd :D
    }),
    new CleanWebpackPlugin(), // Para limpiar basura generada en el dist xD
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(), //Para optimizar Css
      new TerserWebpackPlugin(), // Para opmimizar JS
    ],
  },
};
