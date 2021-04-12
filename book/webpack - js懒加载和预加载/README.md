

# webpack - js懒加载和预加载

现在`src/index.html`文件中添加一个`button`

`  <button id="btn">加载文件</button>`



然后新创建`lazyload.js`文件

```
//lazyload.js
console.log('lazyload文件被加载了');

export function print() {
    console.log('我是lazyload文件');
}
```



在`src/js/index.js`文件中，加入按钮事件。

### 正常使用

```
import {print} from './lazyload'
document.getElementById('btn').addEventListener('click', function(){
  console.log('点击了加载文件按钮');
  print()
})
```

![](https://i.loli.net/2021/04/08/tU9NPVCaWs7Jrle.png)

可以看到，只要import文件就会自动加载文件。



### 懒加载

懒加载，其实就是在需要的时候在加载；

所以可以使用，`import('文件')`来实现：

```
document.getElementById('btn').addEventListener('click', function(){
  console.log('点击了加载文件按钮');
  import(/* webpackChunkName: 'lazyload' */'./lazyload').then(({print}) => {
    print();
  })
})
```

可以看见`lazyload.js`文件是在按钮点击之后，才被下载使用；

![image-20210408001657361](/Users/lee/Library/Application Support/typora-user-images/image-20210408001657361.png)



**要注意上面说的，点击按钮后才下载**



在还未按钮前，在控制台的`Network`只看js文件的下载

![image-20210408002134452](/Users/lee/Library/Application Support/typora-user-images/image-20210408002134452.png)

可以看到，并没有`lazyload.js`文件，而点击了按钮之后

![image-20210408002212745](/Users/lee/Library/Application Support/typora-user-images/image-20210408002212745.png)

才下载`lazyload.js`文件，然后使用。

**当前多次点击，也只会下载一次js文件**



### 预加载

预加载，其实就是预先加载好文件，当需要使用的时候直接使用加载的文件即可；

主要还是在`import`中加入`webpackPrefetch: true`

```
import(/* webpackChunkName: 'lazyload', webpackPrefetch: true */'./lazyload').then(({print}) => {
  print();
})
```

重新构建之后，运行，在控制台的`Network`看`all`

![image-20210408002750170](/Users/lee/Library/Application Support/typora-user-images/image-20210408002750170.png)

可以看到，在未点击按钮前，`lazyload.js`文件已经被下载。

点击按钮之后，是直接读取之前已下载的`lazyload.js`文件。

![image-20210408003036154](/Users/lee/Library/Application Support/typora-user-images/image-20210408003036154.png)

预加载和正常加载的区别：

- 正常加载可以认为是并行加载，同一个时间可以加载多个文件；
- 等其他资源加载完毕，浏览器空闲的时候，在加载；
- 目前预加载的方式只有在比较高版本的浏览器才适用；



本章结束！