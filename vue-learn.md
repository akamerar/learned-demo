# Vue 学习入门

## nrm安装

### 安装和使用

- 安装 `npm i nrm -g`
- 使用 `nrm ls`列出地址
- 使用地址`nrm use 名字`

## webpack

### 网页常见静态资源

- .js
  -  .js ,jsx .coffee .ts(TypeScript)
- .css
  - .css .less .scss
- images
  - .svg .ttf .eot .woff .woff2 .png .jpg .bmp

### 什么是webpack

- 基于nodeJs的一个项目构建工具，解析依赖关系

### 安装

`npm i webpack -g` 全局安装

### 基本使用

- 打包文件：`webpack entryName outputName`

- 在根目录建立 `webpack.config.js`文件

  ```javascript
  var path = require('path')
  //通过模块操作暴露一个配置对象
  module.exports = {
    //入口文件
    entry : path.join(__dirname, 'src/main.js'),
    //出口文件
    output : {
      //输出文件文件夹
      path : path.join(__dirname, 'dist'),
      //输出文件名称
      filename : 'bundle.js'
    }
  }
  ```

  创建并配置后就可以直接输入`webpack`自动打包

#### 使用webpack-dev-server实现JS保存自动打包

`	npm i webpack-dev-server`

+ 由于是在项目本地安装的，所以无法把他当做脚本命令，只有全局安装的才能在终端中执行
+ 用法和webpack用法完全一样
+ 使用这个工具，需要在本地文件中也安装webpack和webpack-cli

- 在packge.json中配置

  ```json
  {
    "name": "vue-demo1",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      //配置webpack-dev-server脚本 并运行后自动打开浏览器 并且打开端口为3000 并且设置根目录为src 并且以热补丁方式更新，减少不必要的浪费
      "dev" : "webpack-dev-server --open --port 3000 contentBase src --hot" 
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "jquery": "^3.3.1",
      "webpack": "^4.23.1",
      "webpack-dev-server": "^3.1.10"
    },
    "devDependencies": {
      "webpack-cli": "^3.1.2"
    }
  }
  ```

+ 在命令行输入`npm run dev`执行脚本
  + 执行过后webpack-dev-server会建立一个服务器localhost:8080
  + 该项目文件会挂载到这个服务器上
  + 此时会生成一个的动态打包文件bundle.js存放在服务器根目录上（存放在内存中，为了快，因为放进硬盘太慢了）
  + 这个打包的bundle.js并不会存放到我们的dist中！而是以一种虚拟形式托管到项目根目录中，只不过我们看不见
  + 注意！要使用请在html文件引用`/bundle.js`而不是dist里面的bundle.js 否则无法刷新

#### 使页面也映射到内存中去 html-webpack-plugin

`npm i html-webpack-plugin`

- 在webpack-config.js中导入插件

  ```javascript
  var htmlWebpackPlugin = require('html-webpack-plugin')
  
  module.exports = {
    //入口文件
    entry : path.join(__dirname, 'src/main.js'),
    //出口文件
    output : {
      //输出文件文件夹
      path : path.join(__dirname, 'dist'),
      //输出文件名称
      filename : 'bundle.js'
    },
    mode : 'development', //开发模式
    plugins : [
        //--------------导入插件
      new htmlWebpackPlugin({
        //指定模板页面
        template : path.join(__dirname, './src/index.html'),
        //指定内存中生成的页面名字
        filename : 'index.html'
      })
    ]
  }
  ```

- 这样重启服务后就加载的是内存中生成的html了，而且也不用引用bundel.js了，生成的html会自动添加script脚本

#### 处理css文件

- 在main.js里引用css文件

  `import ‘./css/index.css’`

- 默认无法处理非JS文件，我们需要装插件

  `npm i style-loader css-loader -D` 

- 在webpack.config.js中增加module节点。

- module节点用来配置所有处理非js文件的第三方包的匹配规则

  ```javascript
  module : {
  //所有第三方模块的匹配规则
  	rules : [
  	//处理css文件的匹配规则
      //调用规则是从右向左 先用css-loader再style-loader
  		{ test : /\.css$/, use : ['style-loader', 'css-loader'] }
  	]
  }
  ```

- 处理less文件
  - `npm i less-loader less -D`这两个加载器
  - `{ test : /\.less$/, use : {'style-loader', 'css-loader', 'less-loader'}}`

- 处理sass文件
  - `npm i sass-loader node-sass -D`
  - `{ test : /\.scss$/, use : {'style-loader', 'css-loader', 'sass-loader'}}`

- 处理css样式里面的图片url（默认webpack处理不了这种）

  - `npm i url-loader file-loader -D `

  - `{ test : /\.(jpg|png|bmp|jpeg)$/, use : 'url-loader'}`

  - 处理后的url会自动转为base64格式

  - 可以在loader后用？传参数，标识转为base64的最大大小

    `use : url-loader?limit=7631&name=[hash:8]-[name].[ext]` 表示<7631字节的图片会转化成base64，而>=的还是url地址,且生成的图片名为hash前八位加原文件名和后缀

+ 处理字体图标

  - `cnpm i bootstrap` 下载bootstrap包(cnpm下载 npm下的没有字体包)
  - `{ test : /\.(ttf|svg|eot|woff|woff2)$/, use : 'url-loader'}`

+ 处理高级语法 ES6+

  ​	转换器

  + `cnpm i babel-core@6.26.3 babel-loader@7.1.5 babel-plugin-transform-runtime -D `

    语法包

  + `cnpm i babel-preset-env babel-preset-stage-0 -D`

  + 打开webpack配置文件 添加新匹配规则

    + `{ test : /\.js$/, use : 'babel-loader', exclude:/node_modules/} //注意要把node_modules排除`

  + 在项目根目录中新建.babelrc 的babel配置文件

    `{`

    ​	“presets” : [“env”, “stage-0”],

    ​	“plugins” : [“transfrom-runtime”]

    `}`

## Vue-render

- 在页面使用render函数渲染组件

```javascript
var login = {
    template : `
    <h1>login</h1>
    `
}
var vm = new Vue({
    el : '#app',
    render(createElement){
        return createElement(login)
    }
})
```

- 渲染出的页面会完全替换vue中el绑定的元素，整个app会被替换

- 因此一个app中只能渲染这一个组件，而components注册的可以放多个

## 如何在webpack项目中使用Vue开发项目

- `import Vue from 'vue'`这样导入的vue包是不完整的vue包，只有runtime-only方式，并没有提供网页那样的方式

* 因此需要在webpack.config.js中如下修改

  ```javascript
  resolve : {
      alias : {
          //设置vue导入时的默认路径
          'vue$' : './node_modules/vue/dist/vue.js'
      }
  }
  ```

## webpack中使用组件

### 使用.vue文件定义组件

- 安装vue的加载器`npm i vue-loader vue-template-compiler -D`

- 在webpack.config.js中注册

  ```javascript
  var VueLoaderPlugin = require('vue-loader/lib/plugin');
  
  plugins : [
    new VueLoaderPlugin()
  ]
  ```

### 使用render渲染到页面

```javascript
import Vue from 'vue'

//导入login组件
import login from './login.vue'

var vm = new Vue({
    el : '#app',
    data : {
        msg : 'my name is yt'
    },
    render : c => c(login)
})
```

- .vue模板

  ```vue
  <template>
      <div>
          <h1>这是.vue文件定义出的login</h1>
      </div>
  </template>
  
  <script>
      export default {
          data(){
              return {
                  msg : '我的名字是杨桐'
              }
          },
          methods : {
              show(){
                  console.log('调用了login.vue中的show方法')
              }
          }
      }
  </script>
  
  <style>
  
  </style>
  
  ```


### webpack中的模块导入导出规则

```javascript
//1.默认导出行为
export default{
	foo : 'bar',
    name : 'yt'
}
//此导出方法用下面这种导出方式导出
import 自定义名字 from '文件路径'

//2.选择性导出，一个js只能有一个export default导出，而可以有多个export导出
export var foo = 'bar'
export var name = 'yt'
//此方法导入用
import { foo, name } from '文件路径'
//注意此时导入名字和导出要一致，若要新命名，则用as取别名，{foo as newname }

//3.导入路径后export default是默认导入的，而export内容需要{}导入，如果不想导入则不要写{}导入
import m1, { foo, name } from './m1.js'
```

### webpack中vue路由及嵌套

- 下载并导入包`npm i vue-router`

  ```javascript
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  
  //导入App主组件
  import App from './App.vue'
  //导入路由组件
  import account from './main/Account.vue'
  import goodlist from './main/GoodsList.vue'
  //导入子组件
  import login from './main/subcom/login.vue'
  import register from './main/subcom/register.vue'
  
  
  //手动载入vue-router
  Vue.use(VueRouter)
  
  var router = new VueRouter({
    routes : [
      { path : '/', redirect : '/account'},
      { 
        path : '/account', 
        component : account, 
        children : [
          { path : 'login', component : login },
          { path : 'register', component : register }
        ]
      },
      { path : '/goodslist', component : goodlist}
    ]
  })
  ```

  - account组件内部嵌套组件

    ```vue
    <!-- App组件 -->
    <template>
    <div>
        <h1>这是App组件</h1>
    
        <router-link to="/account">account</router-link>
        <router-link to="/goodslist">goodlist</router-link>
    
        <router-view></router-view>
        </div>
    </template>
    
    <script>
        export default{
            data(){
                return {
    
                }
            },
            methods:{
    
            }
        }
    </script>
    
    <style>
    
    </style>
    
    
    
    <!--account组件-->
    <template>
    <div>
        <h1>这是Account组件</h1>
        <router-link to="/account/login">login</router-link>
        <router-link to="/account/register">register</router-link>
        <router-view></router-view>
        </div>
    </template>
    
    <script>
        export default{
            data(){
                return {
    
                }
            },
            methods:{
    
            }
        }
    </script>
    
    <style>
    
    </style>
    ```


## Mint UI 

### 介绍 

- 是由vue.js封装的组件库

### 引用方式

`npm i mint-ui`

## 缩略图组件

`cnpm i vue-preview -S`