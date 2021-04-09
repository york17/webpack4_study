// webpack入口文件
// import '@babel/polyfill'  //全部js兼容性

// import data from '../media/data.json'
// console.log(data);

// import {hmr} from './hmr'
// hmr()

// import '../css/index.css'
// import '../css/index.less'
// import '../css/iconfont.css'

// function add(x, y) {
//   console.log(x + y);
// }

// console.log(add(1, 2))();
// console.log(add(2, 2));

// const name = "lee";

// const promise = new Promise((resolve, reject) => {
//   resolve('hello webpack')
// })

// 通过判断 module.hot ，看是否有开启HMR功能
// if (module.hot) {
//   module.hot.accept('./hmr.js', function(){
//     // 一旦当hmr.js文件发生变化，会执行这里的回调函数
//     // 其他的模块不会重新打包构建
//     hmr();
//   })
// }

// import _ from 'lodash'
// console.log(_);

// import $ from './jquery'
// console.log($);

// 将other_entrance.js 单独成一个chunk
// import(/* webpackChunkName: 'test' */'./other_entrance').then(res => {
//   console.log('other_entrance.js 文件加载成功', res);
// }).catch(err => {
//   console.log('other_entrance.js 文件加载失败', err);
// })

// 懒加载与预加载
// import {print} from './lazyload'
// document.getElementById('btn').addEventListener('click', function(){
//   console.log('点击了加载文件按钮');
//   // print()
//   // import(/* webpackChunkName: 'lazyload' */'./lazyload').then(({print}) => {
//   //   print();
//   // })
//   import(/* webpackChunkName: 'lazyload', webpackPrefetch: true */'./lazyload').then(({print}) => {
//     print();
//   })
// })

// externals
// import _ from 'lodash';

// console.log('index.js文件被加载了');

// runtimeChunk测试
import('./other_entrance.js').then(({print})=>{
  print();
}).catch(err => {});
