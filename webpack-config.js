module.exports = {
    entry: "./src/index.js",
    output: {
      path: "C:\\code\\TyreSwing\\src\\js",
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        // Additional configuration to handle *.css files
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    // Other remaining configuration
  };