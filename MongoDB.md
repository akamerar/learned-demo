# MongoDB 学习入门

## 非关系型数据库

- noSQL 意思是不仅仅是SQL c++编写

- 不需要设计表结构，没有结构性这么一说

- MongoDB是长得最像关系型数据库的非关系型数据库


## 启动
- 在mongodb所在文件根目录进入命令行
- 输入`mongodb`
- 第一次启动需要在目录建立`data\db`存储目录
- 修改默认存储路径

  + `mongod --dbpath=文件所在路径`


## 停止
- `ctrl+c` 或 退出命令行界面


## 控制台连接
- 连接前一定要保证服务开启
- 在打开一个控制台
 + 输入 `mongo` 即可连接本机数据库


## 退出连接
- `exit`


## 基本命令
- `show dbs` 显示所有数据库(有数据的数据库才会显示)
- `use 数据库名称` 切换到指定数据库(如果没有会新建)
- `db` 查看当前连接的数据库
- `db.students.insertOne({"name":"jack"})` 插入数据
- `show collections` 显示当前数据库所有集合
- `db.students.find()` 查询所有students中的数据

## MongoDB 数据库基本概念

- 数据库
- 集合(相当于关系数据库的表)
- 文档 
- `mongoose` 所有API都支持 `Promise`

```javascript
{
    //qq数据库
    qq:{
        //集合（数组）
        users[
            //对象文档 没有结构性 不要求一样
            {
                "name" : "yt",
                "age" : 21,
            },
            {
                "name" : "wb",
                "age" : 22,
                "hobbies" : "画画"
            }
        ],
        products[
            
        ],
        ...
    },
    taobao,{
    	        
    }
}
```

## nodeJs 连接操作MongoDB数据库



### 使用官方MongoDB包操作
[官方MongoDB包](https://github/mongodb/ndoe-mongodb-native)



### 第三方mongoose 来操作MongoDB 数据库

[mongoosejs官网](mongoosejs.com)

- 如何使用:

  ```javascript
  //引入mongoose包
  const mongoose = require('mongoose');
  
  //连接MongoDB数据库 test数据库 不用存在 有数据时自动创建
  mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true
  });
  
  //创建一个模型
  //就是在设计数据库 设计模型结构
  //动态的，非常灵活，只需要在代码中设计你的数据库就可以了
  //mongoose这个包可以让你的设计编写过程变得非常简单
  const Cat = mongoose.model('Cat', {
    name: String
  });
  
  //实例化Cat模型 一个模型就是一个类似表
  for (var i = 0; i < 100; i++) {
    const kitty = new Cat({
      name: 'ytCat'+i
    });
  
    //持久化保存kitty实例
    kitty.save().then(function () {
      //成功输出meow
      console.log('meow')
      
    });
  }
  ```

- 设计集合（数组）结构
```javascript
var Schema = mongoose.Schema
var userSchema = new Schema({
    username : {
        type : String,   //设置数据类型
        required : ture  //必有
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String
    }
})
```

- 将文档结构发布为模型
```javascript
var User = mongoose.moder('User',userSchema)
```

- 完成数据建立实例：
```javascript
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')

var Schema = mongoose.Schema

var userSchem = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
})

//通过规定好的Schema发布模型
var User = mongoose.model('User', userSchem)

//新建模型实例
new User({
    username: "yt",
    password: "9922",
    email: "1913505273@qq.com"
}).save(function (err, ret) {
    if(err)
        console.log('fail!')
    //ret返回插入的数据
    console.log('ok!', ret)
})
```



### 查询数据

- 查询所有

  ```javascript
  User.find(function(err, ret){
  	if(err)
          console.log('查询失败！')
      //其中ret返回的是一个数组，就算只有一条数据也会放进数组中
      console.log('查询成功', ret)
  })
  ```

- 条件查询

- 可以给定条件

  ```JavaScript
  {
      age: {
          $gte: 18 // age >= 18
      }
  }
  /*
  枚举
  enum : ['男','女']
  条件符号
  $or或关系
  $nor或关系取反
  $gt大于
  $gte大于等于
  $lt小于
  $lte小于等于
  $ne不等于
  $in在多个值范围内
  $nin不在多个值范围内
  $all匹配数组中多个值
  $regex正则，用于模糊查询
  $size匹配数组大小
  $maxDistance范围查询，距离（基于LBS）
  $mod取模运算
  $near邻域查询，查询附近的位置（基于LBS）
  $exists字段是否存在
  $elemMatch匹配内数组内的元素
  $within范围查询（ 基于LBS）
  $box范围查询，矩形范围（基于LBS）
  $center范围醒询，圆形范围（基于LBS）
  $centerSphere范围查询，球形范围（基于LBS）　
  $slice查询字段集合中的元素（比如从第几个之后，第N到第M个元素）
  */
  ```

  ```javascript
  User.find({
      username : 'yt' //可以是正则
  }, function(err, ret){
  	if(err)
          console.log('查询失败！')
      //其中ret返回的是一个数组，就算只有一条数据也会放进数组中
      console.log('查询成功', ret)
  })
  ```

- 查询一个

  ```javascript
  User.findOne({
      username : 'wb' //若没有第一个参数默认返回第一个数据
  },function(err, ret){
      if(err)
          console.log(err)
      //此时返回的ret是一个json数据而不是数组
      console.log(ret)
  })
  ```

- 通过id查询
  `User.findById(_id,callback)`

- 分页查询

  ```JavaScript
  let findCondition = {}; // 查询条件
  let pageSize = 10; // 每页多少条
  let currPage = 5; // 当前是多少页
  let skipNum = (currPage-1)*pageSize; // 跳过条数。比如现在是第5页，就跳过前4页乘以每页10条。
  let sort = {
      age: -1 // 按age降序排序
  }
  Kitten.find(findCondition,{_id:0,age:1,name:1})
          .skip(skipNum)
          .limit(pageSize)
          .sort(sort)
          .exec((err,result)=>{});
  ```

### 删除数据

- remove() 同查询！返回的ret不是删除的对象

  ```javascript
  User.remove({
      username : "wb"
  },function(err, ret){
      if(err)
          console.log('删除失败', err)
      console.log('删除成功')
  })
  ```


### 修改数据

- 修改一个

  ```javascript
  User.findOneAndUpdate(/*{查询条件}*/,{/*修改内容*/}, function(err, ret){})
  ```

- 全部修改

  ```javascript
  User.update({/*查询条件*/},{/*更改项目*/},{},(err,res)=>{})
  ```

### 其他

- Model.deleteMany()
- Model.deleteOne()
- Model.findById()
- Model.findByIdAndDelete()
- Model.findByIdAndRemove()
- Model.findByIdAndUpdate() 
- Model.findOneAndDelete()
- Model.findOneAndRemove()
- Model.findOneAndUpdate()
- Model.replaceOne()
- Model.updateMany()
- Model.updateOne()