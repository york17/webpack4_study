// webpack入口文件

// import '@babel/polyfill'  //全部js兼容性

import data from '../media/data.json'
console.log(data);

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