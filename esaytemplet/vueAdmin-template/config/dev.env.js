'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://easy-mock.com/mock/5ab8c435ca39d01d844c0c34/ybe"',
  PAAS_API: '"http://phpmyadmin.test.03in.com:8080/v1/projects/1a5/"',
  //BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  
})
