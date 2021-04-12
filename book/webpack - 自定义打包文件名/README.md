# webpack - 自定义打包文件名

在之前我们构建打包之后，可以看到文件的名称为

![image-20210401164743273](https://tva1.sinaimg.cn/large/008eGmZEly1gp4c9orq12j30bm067wew.jpg)

默认图片的名称，是该文件的hash值，我们可以通过设置来修改构建的文件名称。



```
{
  // 处理相关图片资源
  test: /.(jpg|png|gif)$/,
  // 如果只用到一个loader，可以直接这样写
  loader: 'url-loader',
  options: {
    // 图片大小于8Kb，会被转成base64  12Kb以下都是适合的，更大的话就不建议
    limit: 8 * 1024,
    // 关闭url-loader的es6模块
    esModule: false,
    // 给图片重命名，
    name: '[hash:10].name.[ext]',
  }
},
```



其中用到了

- hash - 文件的hash值，其中在后面加入数字`hash:10`，表示截取原本hash值的前10位；
- name - 原本的文件名称；
- ext - 原本文件的后缀名；



另外webpack中还会有另外的hash值：



- hash

  每次修改任何一个文件，所有文件名的hash值都将改变。所以一旦修改了任何一个文件，整个项目的文件缓存都将失效；

  

- chunkhash

  根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的hash值；

  

- contenthash

contenthash表示由文件内容产生的hash值，内容不同产生的contenthash值也不一样；