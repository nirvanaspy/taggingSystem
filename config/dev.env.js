'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  /*BASE_API: '"http://172.20.10.7:8080"',*/
  // BASE_API: '"http://192.168.10.1:8080"',  // 陆工大
  /*BASE_API: '"http://192.168.50.211:8080"',*/ //二十八所
  BASE_API: '"http://192.168.0.124:8080"',
})
