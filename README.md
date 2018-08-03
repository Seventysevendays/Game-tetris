# 俄罗斯方块

------

原生JavaScript、面向对象、中介者模式

> * 开始游戏
> * 暂停游戏，继续游戏
> * 背景音乐、动画音效
> * 积分模式、难度升级
> * 砖块坠落提示
> * 游戏结束，重新开始
> * Css3应用
### 项目总结
原理：简单说，就是一个定时器控制一个表格染色。表格是地图，砖块就是不同行列组合并染上颜色，砖块运动就是定时器通过时间间隔一次又一次地对地图进行染色，砖块停靠和清空就是通过条件改变染色的行和列。
#### index.html
> * 游戏布局
> * 引入js, css
> * 只有一条Js语句：new Game()
#### Game.js: 中介者，统领全局
> * this.b = new Block(this)，this.m = new Map(this)，让Game类拥有Block.js模块、Map.js模块的所有资源，同时将this传入也使得其他模块可以使用Game类的资源
> * Game.prototype.init：渲染游戏界面
> * Game.prototype.start：设置定时器、难度升级、操作控制
> * Game.prototype.setClass：单个表格染色的方法
> * Game.prototype.died：将不能移动的表格传给map
> * Game.prototype.canDown、Game.prototype.canLeft、Game.prototype.canRight、Game.prototype.canRotate：判断砖块的运动
> * Game.prototype.bindEvent：给游戏绑定操作事件，下、左右、旋转
> * Game.prototype.over：判断游戏结束，清空定时器
> * Game.prototype.shadow：砖块坠落阴影
> * Game.prototype.disppear：消行
#### Block.js: 生成砖块，砖块上色
> * this.game = game，接收Game类资源方法
> * 随机形状、方向
> * Block.prototype.render：利用Game类的setClass方法给方块上色
> * Block.prototype.update：控制砖块的列，在定时器中使用该方法实现砖块下落
#### Map.js: 地图数组，地图上色
> * this.game = game，接收Game类资源方法
> * this.map = 地图数组，当Game类判定砖块不能移动时将更新这个数组，从而实现移动的转块向死亡的砖块的过渡
> * Map.prototype.render ：利用Game类的setClass方法给地图上色
> * Map.prototype.clear：游戏开始和结束时清空地图的方法
#### blocktypes.js: 不同形状、不同方向砖块数组的罗列
> * {
      L : [L1 , L2 , L3 , L4],
      J : [J1 , J2 , J3 , J4],
      Z : [S1 , S2],
      S : [Z1 , Z2],
      T : [T1 , T2 , T3 , T4],
      O : [O1],
      I : [I1 , I2]
    }
### 游戏展示
#### 游戏中
![游戏中](https://github.com/Seventysevendays/Game-tetris/blob/master/captures/play.png)

#### 游戏暂停
![暂停](https://github.com/Seventysevendays/Game-tetris/blob/master/captures/pause.png)
