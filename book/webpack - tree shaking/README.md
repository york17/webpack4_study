# webpack - tree shaking

> 移除 JavaScript 上下文中的未引用代码，减少代码体积

前提：

- 必须使用ES6模块化；
- 开启prodution环境；



注意：

任何导入的文件都会收到tree shaking的影响，所以一些导入时会执行特殊行为的代码，它们不是仅仅暴露一个export或多个export。

比如polyfill，就会被tree shaking给删除。

另外，css文件，也会因为这种原因被tree shaking删除。

为了避免这种无意的删除，就需要在package.json中对sideEffects选项进行设置：

```
  "sideEffects": [
    "@babel/polyfill",
    "*.css"
  ]
```



**如果`sideEffects`的值为false，那么代码都没有**副作用**，都可以进行`tree shaking`。**



本章结束！



