'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.0.117:8080"',
  /*BASE_API: '"http://192.168.10.1:8080"',*/
})
