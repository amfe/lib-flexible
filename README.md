#lib.tbm

含reset、grid、rem基准计算、全局字体等

## 最新版本

**0.1.3**

## 安装依赖

运行 `npm install`，来安装所需的依赖模块。关于NPM的知识，请参见[nodejs](http://nodejs.org/);

## 用Grunt打包

运行 `grunt`，来对项目进行打包。关于Grunt的知识，请参见[gruntjs](http://gruntjs.com/);

## 手机淘宝栅格系统
[设计规范地址](http://demo.alibaba-inc.com/categories/2075/projects/7370/vds/56075)、[demo地址](http://groups.alidemo.cn/tbc/m-base/)
![](http://gtms01.alicdn.com/tps/i1/T16vvjFMVXXXcxUGDM-687-343.png)
该栅格系统不管设备的物理宽度和分辨率，将整个屏幕均为160份，即总宽度160a（[故a为总宽度的160分之一](http://gitlab.alibaba-inc.com/mtb/lib-tbm/wikis/unit-a)），在此之上应用12列栅格而来；宽640时，a=4px，1a=0.1rem，1rem=40px


### 栅格使用方法
#### 第一步：引入tbm.css和tbm.js
    
    <!-- tbm.css含reset/grid/global三部分 -->
    <!-- tbm.js为单位rem的计算，视觉稿上的1a=0.1rem -->
    <script src="http://g.tbcdn.cn/mtb/lib-tbm/{{version}}/tbm.js"></script>
    <link href="http://g.tbcdn.cn/mtb/lib-tbm/{{version}}/tbm.css" rel="styleSheet" type="text/css"/>
    

#### 第二步：根据视觉设计，选择栅格
选择其中一种[栅格](http://groups.alidemo.cn/tbc/m-base/)，grid/grid-thin/grid-fat，它们定义的槽宽列宽不一样，以适应不同产品的不同模块，一般为[grid](http://demo.alibaba-inc.com/categories/2075/projects/7370/vds/56075)
![](http://gtms02.alicdn.com/tps/i2/T1IJq.FPlbXXbk1_b6-471-42.png)
如选择grid三栏布局，一栏跨4列，则由3个col-4组成，[点此查看grid-thin完整栅格](http://groups.alidemo.cn/tbc/m-base/#grid-thin)

    <!-- .col-*的父节点要为.grid* -->
    <div class="grid">
        <div class="col-4"></div>
        <div class="col-4"></div>
        <div class="col-4"></div>
    </div>

![](http://gtms03.alicdn.com/tps/i3/T1qP6dFS8XXXbhtPf9-479-45.png)
如选择grid-thin两栏布局，一栏跨6列，则由2个col-6组成，[点此查看grid完整栅格](http://groups.alidemo.cn/tbc/m-base/#grid)

    <div class="grid-thin">
        <div class="col-6"></div>
        <div class="col-6"></div>
    </div>

![](http://gtms02.alicdn.com/tps/i2/TB1_b6iFFXXXXaPXXXXR7aVSVXX-455-40.png)
如选择grid-fat四栏布局，一栏跨3列，则由4个col-3组成，[点此查看grid-fat完整栅格](http://groups.alidemo.cn/tbc/m-base/#grid-fat)

    <div class="grid-fat">
        <div class="col-3"></div>
        <div class="col-3"></div>
        <div class="col-3"></div>
        <div class="col-3"></div>
    </div>


## 视觉单位a使用方法
视觉稿上一般会用a（屏幕宽度的160分之一）作为单位标记宽度等信息，1a相当于0.1rem，如：
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

在body上会有一个属性`data-dpr`，值为当前网页的dpr实际值，包括1和2，未来可能有1.5和3。

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

### 单位a的可能实现方式，为什么选择用rem实现？
[相关讨论](http://gitlab.alibaba-inc.com/mtb/lib-tbm/wikis/unit-a)

### 为什么1a=0.1rem，而不是1a=1rem？
1rem=1a; a=320/160=2px; 意味着html节点的font-size等于2px，在chrome(含mobile版chrome)下面会被重置为最小字号12px；为了解决这个问题，扩大10倍，1rem=10a；这样html的font-size都能大于12px，所以a=0.1rem。

### 栅格系统 VS 图片？
正在申请符合手机淘宝栅格系统的图片尺寸，[相关讨论](http://gitlab.alibaba-inc.com/mtb/lib-tbm/issues/1)
