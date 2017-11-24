/*
* @Author: askMeWhy
* @Date:   2017-09-22 10:04:20
* @Last Modified by:   bigWave
* @Last Modified time: 2017-11-06 15:06:30
*/

cnpm i --save axios qs swiper@3.4.2 vee-validate moment mo-js vuex photoswipe
cnpm i --save-dev es6-promise node-sass sass-loader 

修改 /build/webpack.base.config.js 
line:25==>add==>  '@core':resolve('src/components/core')

修改 /build/webpack.prod.config.js
line:54==>add==> favicon: 'favicon.ico'

修改 /build/webpack.dev.config.js
line:30==>add==> favicon: 'favicon.ico'

`
如果需要用vue制作doc或者api描述性文档
use: vue-markdown-loader,
地址: https://github.com/QingWei-Li/vue-markdown-loader,
vue-markdown-loader的配置文件可以参考: vue-blu(https://github.com/chenz24/vue-blu)

`