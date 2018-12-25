# node.js 入门介绍  



## 特性：

  + 事件驱动
  + 非阻塞IO模型
  + 不是平台也不是框架 而是运行时环境
  + 没有BOM 和 DOM
  + 拥有文件操作api
  + 包含`EmcaScript`语法
  + 创建`http`服务的功能



## 升级npm

  `npm i npm -g`  



  ### 常用命令

  + `npm init [-y快速生成]`
  + `npm i 包名 [-S] [-g]`
  + `npm un/rm 包名 删除包 有依赖依然保存`
  + `npm un/rm 包名 -S  连依赖一起删`
  + `npm help 查看帮助`
  + `npm uninstall -h 查看指定命令的帮助`
  + `npm install`



### 文件加载 fs



  #### 所有文件操作API都是异步的！

  ```var fs = require('fs')```
  + `.readFile` 读文件
    - 路径可以省略`./` 第二个参数可选 `'utf8'` 填后得到的data不用toString()
  + `.writeFile` 写文件
  + `.mkdir` 创建目录
  + `.unlink` 删文件
  + `.readdir` 读取目录
    - 参数 err files(数组)



### 服务器操作 http

  ```var http = require('http')```
  + `.on` 监听请求 req & res
    - res.setHeader('Content-Type','text/plain|html; charset=utf-8') 定义信息编码以及渲染方式plain普通文本或html网页文本
      - 不同类型的Content-Type
    - `res.end()` 发送响应数据
    - 服务器重定向：
      * `res.statusCode = 302` 设置状态码302重定向
        301永久重定向（浏览器下次就不请求直接跳转） 302临时重定向
        `res.setHeader('Location','/')`
        `res.end()`
  + `.listen` 设置端口`



### 操作系统 os

  `var os = require('os')`
  + `.cpus` cpu信息
  + `.totalmen` 内存信息



### 操作处理路径 path

  `var path = require('path')`
  + `.extname` 扩展名
  + `.basename('路径', '.js/*去掉后缀名.js*/')`  获取文件名
  + `.path.dirname('路径')` 得到文件夹路径（不包含文件）
  + `.isAbsolute(path)` 判断是否绝对路径
  + `.parse(path)` 返回一个json 包含所有以上目录信息
  + `.join(Path, path)` 路径拼接



### url处理模块

  + `var url = require('url')`
  + `var parseObj = url.parse(req.url,true)`
  + `var query = parseObj.query`
  + `var url = parseObj.pathname`



## 模块系统

  1. 核心模块
  + 以及被加入二进制代码中，直接调用模块即可
  2. 自己写的模块
  + `./`  `../`  `绝对路径`（不用）
    * 重复模块不会重复加载 优先从缓存加载
  3. 第三方模块
  + 必须通过npm下载
  + 使用时通过require('包名')来使用
  + 特殊变量成员
      + `require`
      + `exprots`
      + `__dirname` 动态获取当前文件模块所属目录
      + `__filename` 动态获取当前文件的绝对路径（包含文件名）
          + 在文件操作中使用相对路径是不可靠的，因为在Node中文件操作路径被设计成为相对执行命令node命令所处的路径（不是BUG，这样设计是由场景的）
          + 为了解决这个问题，就要相对路径替换成绝对路径`__dirname`和`__filename`不受文件和执行位置影响
          + 所以以后所有文件操作，使用动态的绝对路径`path.join(__dirname, 'path')`  因此`fs`和`path`经常成对引入
          + 模块中的路径标识不受影响，就是相对于当前文件



## require 方法就是来加载模块的

  + 核心模块 fs os path http等
  + 自己编写的文件模块
    相对路径必须加./或../ 可以省略后缀名（优先级自动搜索）
    在node中，没有全局作用域，只有模块作用域，不会相互影响，如相同变量不会覆盖，方法无法跨模块调用
  + 那么模块如何通信呢？
    - 加载与导出
      * exports导出（默认是个空对象）把所有需要被外部访问的成员挂载到exports对象中
      * 如果一个模块需要直接导出而不是挂载的方式，则用module.exports = add,这样require的exports对象就是
      这个add函数，而不用.add调用
      * 也可以用此方法导出多个成员：
      ```javascript
        module.exports = {
          foo : 'bar',
          add (x, y){
            return x + y
          },
          arr : [1, 2, 3],
          str : '',
          obj : {
            name : 'yt'
          }
        }
      ```
      * `exports === module.exports`



## 模板引擎

+ 浏览器中使用
  1. 安装所在目录 命令行输入 `npm i art-template`
  2. 浏览器中使用
  ```JavaScript
  <script src="node_modules/art-template/lib/template-web.js"></script>
  ```
  标签
  3. 具体使用：
  ```JavaScript
  <script src="node_modules/art-template/lib/template-web.js"></script>
  <script type="text/template" id="tpl">
    hello {{ name }}
    my age is {{ age }}
    hobbies:{{ each hobbies }} {{ $value }} {{ /each }}
  </script>
  <script>
    var ret = template('tpl',{
      name:'yt',
      age:21,
      hobbies:['画画','写代码','唱歌']
    })
    console.log(ret)
  </script>
  ```

+ 在node中使用
  ```JavaScript
var template = require('art-template')
var fs = require('fs')
/*
    var str = `
      hello {{ name }}
      my age is {{ age }}
      hobbies:{{ each hobbies }}{{ $value }} {{ /each }}
    `
    */
fs.readFile('./template.html', function (err, data) {
    if(err){
        return console.log('read file fail.')
    }
    var ret = template.render(data.toString(), {
        title:'template',
        name: 'YT',
        age: 21,
        hobbies: ['唱歌', '画画', '打游戏']
    })
    console.log(ret)
})
  ```
- 如何使用继承模板引擎

  模板 layout.html：

  ```html
  <!-- layout.html 模板内容 -->
  <!DOCTYPE html>
  <html>
      <head>
          <script src="/node_modules/jquery/dist/jquery.min.js"></script>
          {{ block 'head' }}{{ /block }}  //给子模板填坑位置
      </head>
      <body>
          <div class="header">
              这是header
          </div>
          
      	{{ block 'connent' }}
          <h2>如果子模板不填 默认内容</h2>
          {{ /block }}
          
          <div class="footer">
              这是footer
          </div>
          
          {{ block 'foot-script' }}{{ /block }}
      </body>
  </html>
  ```

  子模板 login.html 调用：

  ```html
  <!-- login.html 子模板内容 -->
  {{ extend './layout.html' }}
  
  {{ block 'head' }}
  <style>
      body{
          background-color:#f60
      }
  </style>
  {{ /block }}
  
  {{ block 'connent' }}
  <h2>我是login.html</h2>
  {{ /block }}
  
  {{ block 'foot-script' }}
  <script>
      window.alert('我是login.html自己添加的js脚本')
  </script>
  {{ /block }}
  ```



## express模块



  ### 基本使用demo

  ```javascript
var express = require('express')
//创建服务器
var app = express()
//监听到‘/’访问
app.get|post('/', function (req, res) {
    res.send('hello express!')
})
app.get('/about', function (req, res) {
    res.json({
        name : 'yt'  //.json方法自动将参数中的json转换成字符串发送
    })
})

app.listen(3000, function () {
    console.log('server is running!')
})
//send()方法中的数据要传字符串才能自动识别数据类型，添加正确的Content-Type
  ```


### 如何修改代码自动重启服务器

   - 第三方命名工具: `nodemon`
   - `npm i nodemon -g`
   - `nodemon app.js`启动服务器即可



### 具体使用

  + 原来http的API依然可以用

  + 会自动添加Content-Type



  #### 公开指定目录

    `app.use('/public/',express.static('./public/'))`
    
    - 当省略第一个参数时:
       `app.use(express.static('./public/'))`
       ​    则开放资源同时，要不带public路由请求才能访问，如：127.0.0.1:3000/img.png
       ​    其中img.png属于public文件夹
    - `app.user('/public/',express.static(path.join(__dirname, './public/')))`
       转化成绝对路径



  #### 处理get请求

  - `req.query` 直接得到get请求参数
  - `res.redirect(301/302,'/')` 重定向



  #### 处理post请求   body-parser 中间件

  - 获取数据
    res.query只能得到get数据
    需要安装中间件`npm i body-parser`
    使用：

    ```javascript
    //引用模块
    var express = require('express')
    var bodyParser = reqiure('body-parser')
    
    var app = express()
    
    //配置app
    //parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended:false }))
    //parser application/json
    app.use(bodyParser.json())
    
    app.post('/post',function(req, res)(){
             //此时req会多一个body方法
             //可以得到post的json数据
             req.body()
    })
    
    app.listen(3000)
    ```



  #### 使用 `cookie` 和`session`

  + 保存当前用户登录状态

  + 安装 `npm i express-session`

  + 使用

    ```javascript
    //导入包
    var express = require('express')
    var session = require('express-session')
    
    //配置
    var app = express()
    
    app.use(session({
        secret : 'ytsecret',  //用于cookie加密字符串
        resave : false,
        //是否未使用就配置cookie 默认是 也就是箱子里没东西也给你一个钥匙的意思
        saveUninitialized : true 
    }))
    ```

  + 如何读取使用数据

    ```javascript
    //添加数据
    req.session.foo = 'bar'
    //获取数据
    req.session.foo
    //删除session
    delete req.session.foo
    ```

  + 默认服务器重启会删除session数据，可以存进数据库，也有对应



  #### 模板引擎

  ```javascript
  //表示渲染以html结尾的文件时，使用art-template 模板引擎
  app.engine('html',require('express-art-template'))
  //使用后，express为res提供一个render方法
  res.render('html模板名',{模板数据})
  //第一个参数不能写路径，会自动去views目录查找模板文件
  //约定：将所有html文件放到views文件中
  //如果要修改app.set('views',render函数默认路径)
  //可以不传模板数据，相当于传网页
  ```


  #### 路由分离

  - 将路由分离 在app中只保存express-art-template、body-parser、开放静态资源use信息

  - 新建router.js文件 导入`express` `fs`包
    * ```javascript
        //注册router
        var router = express.Router()
        //将所有app.get/post改成router.
        router.get('/',function(){...})
        //...
        //在文件最后导出router
        module.exprots = router
        ```
      ```javascript
    //导入router.js
    var router = require('./router')
    //在app.js中添加如下，载入router即可
    app.use(router)
      ```



#### 中间件

- 概念

  - 可以理解成处理自来水的流程

  - 每个处理过程的`req`都是相同的

    * 如在上一个中间件中添加`req.body={"foo" : "bar"}`

      则在下一个中间件中可以调用`req.body.foo`得到键值`bar`

- 分类
  - 应用级别中间件

  ```javascript
  app.use(function (req, res, next){
      //全局响应
  })
  app.use('/', function (req, res, next){
      //响应'/'请求
  })
  ```

  + 路由级别中间件

  ```javascript
  app.get('/', function(req, res, next){
      //响应'/'的get请求
  })
  app.post('/', function(req, res, next){
      //响应'/'的post请求
  })
  ```

  - 第三方中间件

  ```javascript
  //parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended:false }))
  //parser application/json
  app.use(bodyParser.json())
  ```

- 流程

  ```javascript
  //从上往下匹配 进入后若没有调用 next() 则不会跳出
  
  //全局匹配，所有请求都会通过这个中间件
  app.use(function (res, req, next){
      console.log('我进入了一个全局中间件')
      
      next() //若无next，则不会走出这个中间件往下匹配
  })
  
  app.get('/', function (req, res, next){
      //匹配'/'的get请求，满足则进入
      console.log('得到了/的get请求！')
      
      //进入之后由于没有调用next()，因此不会进入下面的全局中间件了
  })
  
  //不会进入
  app.use(function (req, res, next){
      console.log('进入第二个全局中间件')
  })
  ```

- 应用   统一处理某些错误

  - 处理无效路径请求

    ```javascript
    //在处理无效路径可以同一回应404.html页面
    
    //前面是一些有效路由 或 app.use(router)
    app.get('/',function (req, res){...})
    app.get('/a',function (req, res){...})
    app.post('/b',function (req, res){...})
    app.get('/c',function (req, res){...})
    ...
    
    //处理无效请求路径、因为如果进入这条说明已经不满足所有路由了
    app.use(function (req, res, next){
        res.render('404.html') //使用模板引擎渲染404.html
    })
    ```

  - 处理文件读取等内部错误

    ```javascript
    //文件读取出错
    app.get('/book', function (req, res, next){
        fs.readFile('book.txt', function(err, data){
            if(err)
                //如果出错则只行next(err)
                //注意这里next有参数，若有参数，则是往下一条
                //中间件匹配，而是直接匹配四个参数的中间件
                return next(err)
            res.send(data)
        })
    })
    
    //会直接跳转到这里，因为这里有四个参数（缺一不可）
    app.use(function (err, req, res, next){
        //这里统一处理错误
        res.send('app error handler')
    })
    ```


## 异步编程



  ### 使用callback回调函数处理异步操作，得到异步数据！



  ### Promise

  - `callback hell` 回调地狱
    + 多个异步程序如多个fs调用文件，无法保证顺序
    + 为了保证顺序，使用"回调嵌套"保证顺序
    + 但是，嵌套过深无法维护
    + 如何解决？
      解决方式：
      * ES6中新增API `Promise` 构造函数
      ```javascript
      //创建Promise容器 容器本事不是异步的
      //一旦容器创建就执行容器中的异步任务代码
      var p1 = new Promise(function(resolve, reject){
        fs.readFile('./data/a.text','utf8',function(err, data){
          if(err){
            //容器中的任务失败了
            //改变容器状态为失败
            reject(err)
          }else{
            //容器中的任务失败了
            //改变容器状态为成功
            resolve(data)
          }
        })
      })
      var p2 = new Promise(function(resolve, reject){
        fs.readFile('./data/b.js', 'utf8', function(err, data){
          if(err){
            reject(err)
          }else{
            resolve(data)
          }
        })
      })

      var p3 = new Promise(function(resolve, reject){
        fs.readFile('./data/c.js', 'utf8', function(err, data){
          if(err){
            reject(err)
          }else{
            resolve(data)
          }
        })
      })

      //当p1成功了，then()执行然后操作
      //没有return下一个then接收的就是undefined
      p1
      .then(function(data){
        //data就是成功时resolve中的data
        //其实resolve()就是执行的这个then()
        console.log(data)
        return p2
      },function(err){
        //就是执行失败的reject
        console.log(err)
      }) 
      .then(function(data){
        console.log(data)
        return p3
      })
      .then(function(data){
        console.log(data)
        return //像这样一直then下去就可以顺序执行了
      })
      ```
      * 因此我们可以控制p1，p2，p3执行顺序，并且可以使得代码更加清晰



## package-lock.json 功能

  - 加快下载速度
  - 锁定版本



## nodeJs 操作MySQL数据库

- 安装包
  + `npm i mysql`
  ```javascript
    var mysql = require('mysql')

    //创建连接
    var connection = mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : '722007',
      database : 'my_db'
    })

    //开始连接
    connection.connect()

    //执行数据操作 所有增删改查都在这里写
    connection.query('',function(err, ret, fields{
      if(err) throw err
      console.log('结果为：', ret[0].solution)
    })

    //关闭连接
    connection.end()
  ```
