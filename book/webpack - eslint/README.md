# webpack - eslint

> eslint : 它的目标是提供一个插件化的javascript代码检测工具。



需要安装的库

- eslint
- eslint-loader
- eslint-config-airbnb-base : 我们选用的检测标准为 airbnb 公司的规范。
- eslint-plugin-import

![](https://i.loli.net/2021/04/03/XfilwRCtbpsFcvu.png)



`npm install eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import -D`



开始配置。

其中几个注意点：

- 只检查js文件，并且是自己写的代码，无需检查`node_modules`中的js文件；
- 需要在`package.json`或`.eslintrc`中添加`eslintConfig`,来设置检查规则；



`webpack.config.js`添加loader

```
  // 添加eslint
  {
    // 只检查js文件
    test: /.js$/,
    loader: 'eslint-loader',
    // 只需要检查自己写的代码，不需要检查node_modules
    exclude: /node_modules/,
    options: {}
  }
```



`package.json`添加`eslintConfig`相关设置，具体设置：[eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)

```
  "eslintConfig":{
    "extends": "airbnb-base"
  }
```



直接构建，会看到构建出错了。

![eslint-error](https://i.loli.net/2021/04/03/6QmPJIhgoycNbSq.png)

可以看到，都是eslint的规则报错了。



错误1：

`Expected linebreaks to be 'LF' but found 'CRLF'`如果也同样出现这个错误，我们可以在`eslintConfig`中添加`rules`

```
  "eslintConfig":{
    "extends": "airbnb-base",
    "rules": {
      "linebreak-style": ["off", "windows"]
    }
  }
```



重新构建，就可以看到 少了 刚才的错误。

其余的错误就根据具体错误，具体处理即可。



也可以通过设置`fix`进行自动修复

```
// 添加eslint
{
  // 只检查js文件
  test: /.js$/,
  loader: 'eslint-loader',
  // 只需要检查自己写的代码，不需要检查node_modules
  exclude: /node_modules/,
  options: {
    fix: true,
  }
},
```



**注意：后续的工程会先将`eslint`屏蔽掉**



eslint有两种方式可以屏蔽校验：

- eslint-disable-next-line：忽略下面一行代码的校验；
- eslint-disable：忽略该文件中的所有校验警告；

另外，如果需要配置规则，就在`eslintConfig的中rules`设置即可。具体可以参考[eslint rules](https://cloud.tencent.com/developer/chapter/12618)。



本章结束！





