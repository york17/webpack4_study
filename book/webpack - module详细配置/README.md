# webpack - module详细配置



主要是概括一些知识点：

- loader加载顺序是 **从右到左，从下到上**；

- loader的使用方式：

  - 单个loader，不做配置，可以用对象；

    ```
    {
    	loader: 'eslint-loader',
    	options: {}
    }
    ```

  - 多个loader，不需要做配置，可以用数组，里面是字符串

    ```
    use: ['style-loader', 'css-loader']
    ```

  - 多个loader，需要做配置，可以用数组

    ```
    use: ['style-loader', 
    {
    	loader: 'css-loader',
    }]
    ```

- 通过设置 `exclude`或者`include`，可以缩小匹配的范围；

- 如果要匹配的文件，会对应多个loader，那么可以指定`enforce`的值来指定loader的顺序;

  | **参数** | 说明                     |
  | :------: | ------------------------ |
  |   pre    | 优先处理                 |
  |  normal  | 正常处理（默认，可不写） |
  |  inline  | 其次处理                 |
  |   post   | 最后处理                 |

  

- oneOf可以提升打包效率，当适用于某些loader后，就不在往后进行匹配；



```
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/,
        // 多个loader用use
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        // 排除node_modules下的js文件
        exclude: /node_modules/,
        // 只检查 src 下的js文件
        include: resolve(__dirname, 'src'),
        // 优先执行
        enforce: 'pre',
        // 单个loader用loader
        loader: 'eslint-loader',
        options: {}
      },
      {
        // 以下配置只会生效一个
        oneOf: []
      }
    ]
  },
```



本章结束！