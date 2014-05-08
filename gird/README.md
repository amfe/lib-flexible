# km-base kimi UI基础库
含reset、grid、rem基准计算、全局字体等

## 手机淘宝栅格系统
[设计规范地址](http://demo.alibaba-inc.com/categories/2075/projects/7370/vds/56075)、[demo地址](http://groups.alidemo.cn/tbc/m-base/)
![](http://gtms01.alicdn.com/tps/i1/T16vvjFMVXXXcxUGDM-687-343.png)
该栅格系统不管设备的物理宽度和分辨率，将整个屏幕均为160份，即总宽度160a（[故a为总宽度的160分之一](http://gitlab.alibaba-inc.com/mtb/lib-tbm/wikis/unit-a)），在此之上应用12列栅格而来；宽640时，a=4px，1a=0.1rem，1rem=40px


### 栅格使用方法
#### 第一步：引入base.css和base.js
	<!-- base.css含reset/grid/global三部分 -->
	<!-- base.js为单位rem的计算，视觉稿上的1a=0.1rem -->
	<link href="http://g.tbcdn.cn/tbc/m-base/0.0.5/index-min.css" rel="styleSheet" type="text/css"/>
    <script src="http://g.tbcdn.cn/tbc/m-base/0.0.5/index-min.js"></script>

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
## 常见疑问

* 单位a的可能实现方式，为什么选择用rem实现？
[相关讨论](http://gitlab.alibaba-inc.com/mtb/lib-tbm/wikis/unit-a)

* 为什么1a=0.1rem，而不是1a=1rem？
1rem=1a; a=320/160=2px; 意味着html节点的font-size等于2px，在chrome(含mobile版chrome)下面会被重置为最小字号12px；为了解决这个问题，扩大10倍，1rem=10a；这样html的font-size都能大于12px，所以a=0.1rem。

* 栅格系统 VS 图片？
正在申请符合手机淘宝栅格系统的图片尺寸，[相关讨论](http://gitlab.alibaba-inc.com/mtb/lib-tbm/issues/1)
