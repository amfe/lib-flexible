#lib.flexible

含reset、grid、rem基准计算、全局字体等

## 最新版本

**0.2.1**

## 安装依赖

运行 `npm install`，来安装所需的依赖模块。关于NPM的知识，请参见[nodejs](http://nodejs.org/);

## 用Grunt打包

运行 `grunt`，来对项目进行打包。关于Grunt的知识，请参见[gruntjs](http://gruntjs.com/);

## 栅格系统
![](http://gtms01.alicdn.com/tps/i1/T16vvjFMVXXXcxUGDM-687-343.png)

栅格系统不管设备的物理宽度和分辨率，将整个屏幕均为160份，即总宽度160a（[故a为总宽度的160分之一](http://gitlab.alibaba-inc.com/mtb/lib-tbm/wikis/unit-a)），在此之上应用12列栅格而来；宽640时，a=4px，1a=0.1rem，1rem=40px


### 栅格使用方法

#### 第一步：引入flexible.css和flexible.js
    
    <!-- 第一步：引入flexible.css含reset/grid/global三部分 -->
    <!-- css和flexible.js为单位rem的计算-->
    <script src="http://g.tbcdn.cn/mtb/lib-flexible/{{version}}/flexible.js"></script>
    <link href="http://g.tbcdn.cn/mtb/lib-flexible/{{version}}/flexible.css" rel="styleSheet" type="text/css"/>
    

#### 第二步：根据视觉设计，选择栅格

选择其中一种grid/grid-thin/grid-fat，它们定义的槽宽列宽不一样，以适应不同产品的不同模块，一般为[grid]
![](http://gtms02.alicdn.com/tps/i2/T1IJq.FPlbXXbk1_b6-471-42.png)
如选择grid三栏布局，一栏跨4列，则由3个col-4组成。

    <!-- .col-*的父节点要为.grid* -->
    <div class="grid">
        <div class="col-4"></div>
        <div class="col-4"></div>
        <div class="col-4"></div>
    </div>

![](http://gtms03.alicdn.com/tps/i3/T1qP6dFS8XXXbhtPf9-479-45.png)
如选择grid-thin两栏布局，一栏跨6列，则由2个col-6组成。

    <div class="grid-thin">
        <div class="col-6"></div>
        <div class="col-6"></div>
    </div>

![](http://gtms02.alicdn.com/tps/i2/TB1_b6iFFXXXXaPXXXXR7aVSVXX-455-40.png)
如选择grid-fat四栏布局，一栏跨3列，则由4个col-3组成。

    <div class="grid-fat">
        <div class="col-3"></div>
        <div class="col-3"></div>
        <div class="col-3"></div>
        <div class="col-3"></div>
    </div>


## 视觉单位a使用方法

把屏幕宽度的160分之一作为单位标记宽度等信息，每一份相当于0.1rem，如：
![](http://gtms02.alicdn.com/tps/i2/T1QyYjFPNXXXbAvxbX-665-131.png)

大致实现如下：

    <div class="grid-fat">
        <div class="col-6"><div class="list">列表</div></div>
        <div class="col-6"><div class="info">信息</div></div>
    </div>
    <style>
    .list {
        padding-left: 0.2rem
    }
    .info {
        padding-right: 0.2rem;
    }
    </style>

## 字体不使用rem的方法

在body上会有一个属性`data-dpr`，值为当前网页的dpr实际值，包括1和2。

字体的大小不能用rem作为单位，仍旧采用px为单位。所以对于字体的设置，需要用data-dpr属性来区分不同dpr的大小。例如：

    div {
        width: 1rem; 
        height: 0.4rem;
    }
    [data-dpr="1"] div {
        font-size: 12px;
    }
    [data-dpr="2"] div {
        font-size: 24px;
    }

## 常见疑问

### 如何手动配置dpr

只需要在引入`flexible.js`之前，输出meta标签即可，例如：

    <meta name="flexible" data-dpr="2" />
    <script src="http://g.tbcdn.cn/mtb/lib-flexible/{{version}}/flexible.js"></script>

### 强制设置rem单位的方法

输出css样式

    html {font-size: 60px!important;}

即可