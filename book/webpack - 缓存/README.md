# webpack - 缓存

### babel缓存 

在配置的loader的时候，加入`cacheDirectory`即可。

```
  // 添加js兼容性
  {
    test: /.js$/,
    exclude: /node_modules/,
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
  },
```





### 文件资源缓存

- hash，每次webpack构建的时候都会生成一个唯一hash值；

  缺点：重新打包后，会生成新的hash值，就会导致未修改的文件的缓存也失效。

  

- chunkhash，根据chunk生成的hash值，如果构建来至于同一个chunk，那么hash值就相同；

  缺点：chunk中会同时包含js或者css，如果只修改了css文件，但是js还是会失去原本的缓存。

  

- contenthash，根据文件内容生成hash值，不同文件的hash值不一样。

所以要去除文件资源缓存，建议使用`contenthash`。



本章结束！





