# webpack是个什么东西

![webpack 概述](https://webpack.html.cn/img/webpack.png)



> 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包工具。


任何时候，一个文件依赖于另一个文件，webpack 就把此视为文件之间有 依赖关系。这使得 webpack 可以接收非代码资源(non-code asset)（例如 images 或 web fonts），并且可以把它们作为 _依赖_ 提供给你的应用程序。

它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。