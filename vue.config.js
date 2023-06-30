const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack:{
    resolve:{
      fallback:{
        fs:false,
         "path": require.resolve("path-browserify"),
         "stream": require.resolve("stream-browserify"),
         "constants": require.resolve("constants-browserify"),
         "assert": require.resolve("assert/"),
         "crypto": require.resolve("crypto-browserify")
        }
      }
  }
})

// const CopyWebpackPlugin = require('copy-webpack-plugin');
// plugins: [
//       new CopyWebpackPlugin([
//             {
//               from: "./src/assets/mupdf-wasm.wasm",
//               to  : ".//js/sig_handler.wasm"
//             },
//         ])
//     ]