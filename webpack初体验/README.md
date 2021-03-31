# webpack初体验

### 创建项目

项目使用到的库，以及安装的版本，有的库最新版本不兼容旧的webpack。

新建一个项目

- npm init -y
- 安装webpack 和 webpack-cli

`npm install webpack@^4.0.0 webpack-cli@^3.3.10 -D`

- 创建webpack.config.js文件，注意：如果不用webpack文件的话，可以使用命令进行 js文件的构建；

  `./node_modules/.bin/webpack ./src/index.js -o ./dist/bundle.js --mode=development`

  由于webpack没有全局安装，所以直接使用node_modules中的webpack;

  

项目，目录如下：

![image-20210331161932386](https://tva1.sinaimg.cn/large/008eGmZEly1gp35u3n1ymj30a006xt92.jpg)



构建完成后，可以在 dist目录下，看到 `bundle.js` 中存在：

![image-20210331162555345](https://tva1.sinaimg.cn/large/008eGmZEly1gp360qb1c5j30x20av75q.jpg)



将`src/index.js`中代码构建完成；

如果是要生产环境，那么就需要将命令中的 mode的值改成 `production`即可。



### 创建index.html

在`dist`文件夹下面，创建index.html，验证js文件是否正常。



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webpack</title>
</head>
<body>
  <script src="./bundle.js"></script>
</body>
</html>
```



运行index.html即可看到 控制台输出 `3`



### webpack自身打包哪些资源

其中webpack自身只能打包js、json资源。接下来将验证 json资源和css资源为例；



##### json资源

在`src目录下`创建`data.json`文件

```json
{
  "name": "lee",
  "study": "webapck"
}
```

 

然后在入口文件`index.js` import  json文件，重新构建后，在`bundle.js`中会出现data.json的内容；

![image-20210331164755294](https://tva1.sinaimg.cn/large/008eGmZEly1gp36nmb4vqj30t30fwgod.jpg)



#### css资源

在`src目录下`创建`index.css`文件

```css
html, body {
  padding: 0;
  margin: 0;
  background-color: blue;
}
```

然后在入口文件`index.js` import  `index.css`文件，重新构建，构建打包会报错。

![image-20210331165317457](https://tva1.sinaimg.cn/large/008eGmZEly1gp36t7l6qdj30w207fta0.jpg)



简易webpack项目 到此结束！！！