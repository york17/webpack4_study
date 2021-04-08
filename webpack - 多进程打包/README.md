# webpack - 多进程打包

可以通过`thread-loader`进行多线程打包。



**注意：并不是开启多线程打包就更快，有时候会更慢**

- 进程启动大概需要600ms，并且进程间通信也需要一定的开销；
- 只有消耗时间比较长，才需要多进程打包；



就目前的项目，可以在`babel-loader`中使用多线程打包，进行测试；



安装`npm install thread-loader -D`



在`webpack.config.js`文件中加入多线程打包



```
          // 添加js兼容性
          {
            test: /.js$/,
            exclude: /node_modules/,
            use: [
              // 开启多线程打包
              'thread-loader',
              {
                loader: 'babel-loader',
                options: {
                  // 预设babel要做哪种兼容，目前使用的是 @babel/preset-env
                  presets: [
                    [
                      '@babel/preset-env',
                      // 按需加载兼容性
                      {
                        // 按需加载
                        useBuiltIns: 'usage',
                        // 指定core-js版本
                        corejs: {
                          version: 3
                        },
                        // 兼容哪些浏览器
                        targets: {
                          ie: '9',
                          chrome: '50',
                          // ...
                        }
                      }
                    ]
                  ],
                  // 开启babel缓存
                  cacheDirectory: true,
                }
              }
            ]
          },
```



测试：

- 未开启多线程

![](https://i.loli.net/2021/04/08/CtJ9fKoQXSDLcPd.png)

- 开启多线程

  ![image-20210408142828403](/Users/onlyou/Library/Application Support/typora-user-images/image-20210408142828403.png)





也可以指定`thread-loader`可以指定几个进程。

```
{
  loader: 'thread-loader',
  options: {
    workers: 2,  //2个进程
  }
},
```



**是否开启多进程打包，具体看情况，千万不要滥用**



本章结束！



