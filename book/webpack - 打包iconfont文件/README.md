# webpack - 打包iconfont文件

直接到[iconfont](https://www.iconfont.cn/home/index?spm=a313x.7781069.1998910419.2)官网下载

随便选择几张icon，下载。

![image-20210401172031518](https://tva1.sinaimg.cn/large/008eGmZEly1gp4d7tvvkbj305t062q31.jpg)

使用方式直接打开，`demo-index.html`



![image-20210401172114298](https://tva1.sinaimg.cn/large/008eGmZEly1gp4d8k2potj30mh0po41g.jpg)

直接使用 `font-class`方式引用。

将`iconfont.css`、`iconfont.eot`、`iconfont.svg`、`iconfont.ttf`、`iconfont.woff`拷贝到 `src`目录下，这些文件具体看`iconfont.css`

![image-20210401172459945](https://tva1.sinaimg.cn/large/008eGmZEly1gp4dcgzpnsj30oy08gdi5.jpg)



然后在`index.js`中引入`iconfont.css`，在`index.html`中加入使用。

```
    <span class="iconfont icon-banquan"></span>
    <span class="iconfont icon-anquanyinsi"></span>
    <span class="iconfont icon-dicengjiagou"></span>
    <span class="iconfont icon-cangchucangku"></span>
```



打包其他资源我们使用`file-loader`，之前已经装过，所以直接在`webpack.config.js`中写配置。

```
{
  // exclude：排除 css,js,html, json, less文件
  exclude: /\.(css|js|html|json|less)$/,
  loader: 'file-loader',
}
```



**注意：exclude会排除文件，所以将你需要排除的文件都加入，不然构建会有问题**



构建打包后



![image-20210401173642533](https://tva1.sinaimg.cn/large/008eGmZEly1gp4dono7l7j30af06pgma.jpg)

可以看到 iconfont的用到的资源全部已经加入，直接运行`dist/index.html`，就可以看到效果。



同样如果要修改文件名

```
{
  // exclude：排除 css,js,html, json, less文件
  exclude: /\.(css|js|html|json|less)$/,
  loader: 'file-loader',
  options: {
    name: '[hash:10].[ext]'
  }
},
```



`file-loader`适用任何你要拷贝到构建目录的功能。



本章结束！

