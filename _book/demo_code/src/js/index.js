// webpack入口文件

// import '@babel/polyfill'  //全部js兼容性

import data from '../media/data.json'
console.log(data);

import {hmr} from './hmr'
hmr()

import '../css/index.css'
import '../css/index.less'
import '../css/iconfont.css'

function add(x, y) {
  console.log(x + y);
}

console.log(add(1, 2));
console.log(add(2, 2));

const name = "lee";

const promise = new Promise((resolve, reject) => {
  resolve('hello webpack')
})

// 通过判断 module.hot ，看是否有开启HMR功能
if (module.hot) {
  module.hot.accept('./hmr.js', function(){
    // 一旦当hmr.js文件发生变化，会执行这里的回调函数
    // 其他的模块不会重新打包构建
    hmr();
  })
}