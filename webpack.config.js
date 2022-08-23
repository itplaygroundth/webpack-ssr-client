const path = require('path')
const dist  = path.join(__dirname,'dist')
const  pkg = require('./package.json')
const isDebug=true
module.exports= [
    {
        name: 'client',
        mode: 'development',
        target:'web',
        entry: './src/client',
        output:{
            path: dist,
            filename: 'client.js'
        },
        module:{
            rules:[
                {
                    test: /\.css$/,
                    use: [
                      'isomorphic-style-loader',
                      {
                        loader: 'css-loader',
                        options: {
                          importLoaders: 1,
                          modules: false,
                          esModule: false,
                        }
                      },
                      {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, './tools/postcss.config.js'),
                            }
                        },
                      },
                    ]
                },
                {
                    test: /\.js?$/,
                    include: [path.resolve(__dirname, "../src")],
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                          cacheDirectory: true,
                          babelrc: false,
                          presets: [
                            [
                              "@babel/preset-env",
                              {
                                targets: {
                                  browsers: pkg.browserslist,
                                },
                                modules: false,
                                useBuiltIns: false,
                                debug: false,
                              },
                            ],
                            "@babel/preset-react",
                          ],
                        },
                      },
                },
               {
                    test: /\.js$/,
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'jsx',  // Remove this if you're not using JSX
                        target: 'es2015'  // Syntax to compile to (see options below for possible values)
                        }
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                  },
                {
                    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                    loader: 'file-loader',
                    options: {
                        name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
                    }
                },
           
            ]
        },
        devtool: 'source-map'
    },
    {
        name: 'server',
        mode: 'development',
        target: 'node',
        entry: './src/express/server',
        output:{
            path:dist,
            filename:'server.js',
            libraryTarget:'commonjs2'
        },
        module:{
            rules:[
                {
                    test: /\.css$/,
                    use: [
                      'isomorphic-style-loader',
                      {
                        loader: 'css-loader',
                        options: {
                          importLoaders: 1,
                          modules: false,
                          esModule: false,
                        }
                      },
                      {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, './tools/postcss.config.js'),
                            }
                        },
                      },
                    ]
                },
                {
                    test: /\.js?$/,
                    include: [path.resolve(__dirname, "../src")],
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                          cacheDirectory: true,
                          babelrc: false,
                          presets: [
                            [
                              "@babel/preset-env",
                              {
                                targets: {
                                  browsers: pkg.browserslist,
                                },
                                modules: false,
                                useBuiltIns: false,
                                debug: false,
                              },
                            ],
                            "@babel/preset-react",
                          ],
                        },
                      },
                },
               {
                    test: /\.js$/,
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'jsx',  // Remove this if you're not using JSX
                        target: 'es2015'  // Syntax to compile to (see options below for possible values)
                        }
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                  },
                {
                    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                    loader: 'file-loader',
                    options: {
                        name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
                    }
                },
                 
            ]
        },
        devtool: 'source-map'
    }
]