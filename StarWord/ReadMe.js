Cocos2d-js 之消灭星星第一讲，开发前准备
关于消灭星星游戏本身的历史和玩法就不做介绍了，这个游戏已经很普及了，如果有不是很清楚的，可以去网上下载一个试玩。
本主题主要讲解此游戏的开发过程，以及设计思路和技术分享;
一、开发前首先讲一下本人的开发环境：
1、游戏引擎及版本:Cocos2d-js cc.ENGINE_VERSION = 3.0。
2、开发工具:Cocos Code IDE 1.1.0。
3、开发平台Windows7旗舰版。
二、游戏场景简介：
该游戏在本主题中包括4个场景，分别是：
1、游戏初始化场景，及游戏菜单选择场景，可以选择新游戏、继续游戏、帮助、退出等。
2、游戏帮助场景，介绍游戏的玩法。
3、游戏过度场景，游戏开始游戏到正式游戏间的一个过度场景，告诉玩家当前关卡和通过所要达到的分数。
4、游戏主场景，及星星消除场景也是游戏最核心的场景，主要的算法逻辑都在该场景实现。
三、游戏中有部分通用的自定义组件及颜色的设定，单独写在了一个GameUtil.js的文件中；这样做的目的是方便统一管理，可以做到一对多的控制效果具体内容如下：
/*
 * 通用颜色
 */
var black = cc.color.BLACK;//黑色
var blue  = cc.color.BLUE;//蓝色
var green = cc.color.GREEN;//绿色
var orange = cc.color.ORANGE;//橙色
var pink = cc.color(255, 0, 255, 255);//粉红
var purple = cc.color(128, 64, 246, 255);//紫色
var red = cc.color.RED;//红色
var white = cc.color.WHITE;//白色
var yellow = cc.color.YELLOW;//黄色

/*
 * 通用文本组件
 */
function myText(str, color, fontSize)
{
	if ( this.constructor == myText )
	{
		var text = ccui.Text.create();
		text.setText(str);
		text.setColor(color);
		text.setFontSize(fontSize);
		text.setAnchorPoint(0, 0);
		return text;
	}
	else
	{
		return new myText(str, color, fontSize);
	}
};

/*
 * 通用图片组件
 */
function myImage(source)
{
	if ( this.constructor == myImage )
	{
		var image = ccui.ImageView.create();
		image.loadTexture(source);
		image.setAnchorPoint(0, 0);
		return image;
	}
	else
	{
		return new myImage(source);
	}
	
};

/*
 * 通用按钮组件 
 */
function myButton(texture)
{
	if ( this.constructor == myImage )
	{
		var btn = ccui.Button.create();
		btn.loadTextures(texture, "");
		btn.setAnchorPoint(0, 0);
		return btn;
	}
	else
	{
		return new myButton(texture);
	}	
};

在后面的章节中如果看到myText, myButton, myImage等可千万别说这是神马东西。
