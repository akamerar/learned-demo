# bootstrap4学习

## flex start

传统的布局：围绕盒子模型（border、margin、padding）   定位（position）、浮动（float）等。

flex布局又叫弹性布局 ， 主要内容包括两大部分有： 容器（父元素）的六个属性和项目（子元素）的六个属性

 

基本概念：采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。

主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

 

### 容器的六个属性：

1、flex-direction属性：决定主轴的方向，有四个属性值  row | row-reverse | column | column-reverse;

row：默认，主轴为水平方向，起点在左端；

row-reverse：主轴在水平方向，起点在右端；

column：主轴在垂直方向，起点在上边；

column-reverse：主轴在垂直方向，起点在下边；

 

2、flex-wrap属性：决定当一条轴线排不下所有的项目时，是否换行，有三个属性值：nowrap | wrap | wrap-reverse;

nowrap:默认，不换行，当排不下时，会按项目的flex-shrink属性（见下，项目的缩小比例，默认为1）的值来对项目进行缩小；

wrap：换行，第一行在上方；

wrap-reverse：换行，第一行在下方；

 

3、flex-flow属性：是flex-direction属性和flex-wrap属性的简写形式，默认值为 row nowrap

 

4、justify-content属性：定义了项目在主轴上的对齐方式，有五个属性值：flex-start | flex-end | center | space-between | space-around

flex-start：默认值，主轴上起点对齐；

flex-end：主轴上终点对齐；

center：在主轴上居中；

space-between：两端（起点和终点）对齐，项目之间的间隔都相等；

space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍

  具体的视觉上的对齐方式与主轴的方向有关，在主轴方向为默认情况下（主轴为水平方向，起点在左端）：

flex-start：左对齐；

flex-end：右对齐；

center：水平居中；

space-between：两端（左右两边）对齐，项目之间的间隔都相等；

space-around：每个项目两侧（左右两侧）的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍；

 

5、align-items属性：定义项目在交叉轴上的对齐方式，有五个属性值：flex-start | flex-end | center | baseline | stretch;

flex-start：默认值，交叉轴上起点对齐；

flex-end：交叉轴上终点对齐；

center：在交叉轴上居中；

baseline：

stretch：

 

6、align-content属性：定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用，有六个属性值，flex-start | flex-end | center | space-between | space-around |stretch

stretch（默认值）：轴线占满整个交叉轴。

flex-start：与交叉轴的起点对齐。

flex-end：与交叉轴的终点对齐。

center：与交叉轴的中点对齐。

space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。

space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。

 

### 项目的属性

1、order属性：定义项目的排列顺序，数值越小排列越靠前，默认为0，

order：整数

 

2、flex-grow属性：定义项目的放大比例，当有剩余空间时即会根据该值进行放大，默认为0，即有剩余空间时也不放大

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

 

3、flex-shrink属性：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小

 

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效

 

4、flex-basis属性：定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

 

5、flex属性：是flex-grow,flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)

 

6、align-self属性：允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch

有六个属性值：auto | flex-start | flex-end | center | baseline | stretch



7、use margin-right:auto can make line like float

## 布局容器

`.container` 固定宽度 支持响应式布局

`.container-fluid` 100%宽度，占据全部视口的宽度

二者都有自己的padding，且不能嵌套

## 栅格系统

Bootstrap 提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。它包含了易于使用的[预定义类](https://v3.bootcss.com/css/#grid-example-basic)，还有强大的[mixin 用于生成更具语义的布局](https://v3.bootcss.com/css/#grid-less)。Bootstrap 提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。它包含了易于使用的[预定义类](https://v3.bootcss.com/css/#grid-example-basic)，还有强大的[mixin 用于生成更具语义的布局](https://v3.bootcss.com/css/#grid-less)。

### 简介

- 被划分为12份
- 默认堆叠
- 一般只设置col和col-md（区分手机端和电脑端）
- 每个.col-*必须被.row包裹
- 可以设置padding使得.container .row .col-*对齐
- <768px .col-  >=576 .col-sm iphone   >=768px .col-md平板电脑      >=992px .col-lg       >=1200px .col-xl
- 只设置col类可以平分宽度
  - 使用.w-100使得一个row中分行
- 大于12份的最后一列会另起一行
- col-*-auto 根据内容自动调整宽度

### 垂直水平对齐

在row类中设置align-items-*-start|center|end

在row类中设置justify-content-*-center

### w-* h-*

表示占父元素宽高百分比

### p m l r t b x y

x:l r  y:t b

如pl-rem

pl-3  pl-md-3 px-auto



### 显示与消失

`.d-none`display：none

`.d-md-block` 在md时候display：block

###  响应式列重置

某些列比别的列高，在阈值处添加.clearfix和响应式工具

```html
<div class="clearfix visible-xs-block"></div>
```

### 列偏移

`.col-md-offset-*`实际上是设置margin值

### 列嵌套

`.row`中嵌套`.row`

### 列排序

`.col-md-push-*`往后移动几份

`.col-md-pull-*`往前移动几份

`.order-*-1|2|3...`设置列顺序

### 图片自适应铺满显示

`.img-fluid`

## 排版

### 标题 h1~h6

为h1~h6设置了字体大小 在bootstrap4中推荐使用display-*（1234）

### 副标题 small

 可以在内部使用`small`标签或者`.small`类设置副标题

```html
<h1>h1. Bootstrap heading <small>Secondary text</small></h1>
<h2>h2. Bootstrap heading <small>Secondary text</small></h2>
<h3>h3. Bootstrap heading <small>Secondary text</small></h3>
<h4>h4. Bootstrap heading <small>Secondary text</small></h4>
<h5>h5. Bootstrap heading <small>Secondary text</small></h5>
<h6>h6. Bootstrap heading <small>Secondary text</small></h6>
```

### 页面主题P

段落与段落之间默认有margin外边距

#### 中心内容lead 高亮mark删除del无用s 插入ins（下划线）

`.lead`为段落突触显示

### 文本对齐

`.text-left .text-center .text-right .text-justify .text-nowrap `

#### 改变大小写

`.text-uppercase .text-lowercase .text-capitalize`

#### 字体粗细

`.font-weight-normal`

#### 字体禁言

`.text-muted`

### 引用样式 blockquote

p标签正文，footer标明来源来源名称放在cite标签中

```html
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>
```

通过赋予 `.blockquote-reverse` 类可以让引用呈现内容右对齐的效果。

```html
<blockquote class="blockquote-reverse">
  ...
</blockquote>
```

![1541582671290](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1541582671290.png)

### 列表

`.list-unstyled`设置list-style:none

`.list-inline`设置列表为list-style:none, inline-block，设置适当padding  bootstrap3

`.dl-horizontal`可以让dl列表中的 dt dd元素一行显示，在xs和sm中堆叠显示

## 代码

### 内联代码

通过 `<code>` 标签包裹内联样式的代码片段。

For example, `<section>` should be wrapped as inline.

```html
For example, <code>&lt;section&gt;</code> should be wrapped as inline.
```

### 用户输入

通过 `<kbd>` 标签标记用户通过键盘输入的内容。

To switch directories, type cd followed by the name of the directory.
To edit settings, press ctrl + ,

```html
To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br>
To edit settings, press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd>
```

### 代码块

多行代码可以使用 `<pre>` 标签。为了正确的展示代码，注意将尖括号做转义处理。

```html
<p>Sample text here...</p>
<pre>&lt;p&gt;Sample text here...&lt;/p&gt;</pre>
```

还可以使用 `.pre-scrollable` 类，其作用是设置 max-height 为 350px ，并在垂直方向展示滚动条。

### 变量

通过 `<var>` 标签标记变量。

y = mx + b

```html
<var>y</var> = <var>m</var><var>x</var> + <var>b</var>
```

### 程序输出

通过 `<samp>` 标签来标记程序输出的内容。

This text is meant to be treated as sample output from a computer program.

```html
<samp>This text is meant to be treated as sample output from a computer program.</samp>
```

## 按钮

`.btn .btn-primary .btn-lg|sm .btn-ontline-primary`

## 表格

`.table .table-striped .table-hover .table-condensed .table-bordered`

##  制作tab菜单

ul添加类`nav nav-tabs|pills`

li添加类`nav-item` 里面的a连接添加类`nav-link`以及属性`data-toggle="tab"` 添加内容对应锚点 为激活tab添加`.avtive`

显示内容用`.tab-content`包裹

各个内容添加类`tab-pane`为激活内容添加`.active`和对应锚点id

## 制作提示框Tooltip

```html
<p>我的名字是<span class="text-primary font-weight-bold" data-toggle="tooltip" data-placement="top" title="是个大帅哥">杨桐</span></p>
<script>
    $(function(){
        $('[data-toggle="tooltip"]').tooltip()
    })
</script>
```



## 制作导航条

```html
<nav class="navbar navbar-expand-md navbar-light">
    <a class="navbar-brand" href="#">YtYt弹幕视频网</a>
    <button class="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true"
                   aria-expanded="false">Dropdown</a>
                <div class="dropdown-menu" aria-labelledby="dropdownId">
                    <a class="dropdown-item" href="#">Action 1</a>
                    <a class="dropdown-item" href="#">Action 2</a>
                </div>
            </li>
        </ul>
        <form class="form-inline">
            <input class="form-control mr-sm-2" type="text" placeholder="Search">
            <button class="btn btn-success" type="submit">Search</button>
        </form>
    </div>
</nav>
```

## 提示栏

```html
<div class="alert text-center alert-warning alert-dismissible fade show" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    <strong>密码错误</strong> 
</div>
<script>
    $(".alert").alert();
</script>
```

