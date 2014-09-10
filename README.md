# 可伸缩布局方案

## 最新版本

**1.0rc1**

## 依赖

无

## 原理

在页面加载之初，判断当前系统以及其`device pixel ratio`，把文档宽度除以16作为文档的字体大小。在之后的样式中通过`rem`单位来实现元素的尺寸等设置，以便确保元素是可伸缩且自适应的。并且配合meta的scale缩放，来达到高清适配的目的。

## 栅格使用方法

如选择grid三栏布局，一栏跨4列，则由3个col-4组成

    <!-- .col-*的父节点要为.grid* -->
    <div class="grid">
        <div class="col-4"></div>
        <div class="col-4"></div>
        <div class="col-4"></div>
    </div>

如选择grid-thin两栏布局，一栏跨6列，则由2个col-6组成

    <div class="grid-thin">
        <div class="col-6"></div>
        <div class="col-6"></div>
    </div>

如选择grid-fat四栏布局，一栏跨3列，则由4个col-3组成

    <div class="grid-fat">
        <div class="col-3"></div>
        <div class="col-3"></div>
        <div class="col-3"></div>
        <div class="col-3"></div>
    </div>


## 单位rem使用方法

对于320宽度来设计的视觉稿，只需要把视觉稿上的尺寸除以20，即可得出rem单位的数值。如果是以640宽度来设计的视觉稿，则除以40即可，依次类推。

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

在document上会有一个属性`data-dpr`，值为当前网页的dpr实际值，包括1和2，未来可能有1.5和3。

字体的大小不能用rem作为单位，仍旧采用px为单位。所以对于字体的设置，需要用data-dpr属性来区分不同dpr的大小。例如：

    div {
        width: 1rem; 
        height: 0.4rem;
        font-size: 12px;
    }
    [data-dpr="1"] div {
        font-size: 12px;
    }
    [data-dpr="2"] div {
        font-size: 24px;
    }

## 如何在高清屏上展示1px的边框

一般边框或者分割线需要精确的以1px的视觉展示出来，普通的方案无法满足要求。在高清方案下，所有的1px线都能完美重现视觉稿。

div {
    border: 1px solid #ECECEC;
    width: 8rem;
    height: 5rem;
    border-radius: 0.2rem;
}

## 常见问题

* 目前安卓机器的scale缩放存在兼容性问题，所以安卓机器都以标清的方案输出。
* 如遇到加载时页面从大到小等闪烁时，可能需要在页面中内敛代码。