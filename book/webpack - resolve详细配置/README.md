# webpack - resolve详细配置

> 配置模块的相关解析策略



- alias：通过别名来把原导入路径映射成一个新的导入路径；

  ```
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    }
  ```

  使用的时候可以：

  `import '@/css/index.css'`

  可以设置多个别名；

  

- extensions：配置省略文件路径的后缀名，默认省略js和json；

  ```
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', 'json', 'vue'],
    }
  ```

  在引用文件的时候，就可以省略相应的文件类型；

  **注意：同一个目录有不同类型的同名文件，只会匹配第一个**

-

- modules：配置webpack去哪些目录下寻找第三方模块， 默认情况下，只会在 node_modules下寻找，一般不做任何设置；

  可以指定多个目录，进行第三方库的寻找；



整的一段配置代码:

```
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', 'json', 'vue'],
    modules: ['node_modules']
  }
```



本章结束！