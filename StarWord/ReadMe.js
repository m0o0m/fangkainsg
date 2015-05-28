Cocos2d-js 之消灭星星第一讲，开发前准备
关于消灭星星游戏本身的历史和玩法就不做介绍了，这个游戏已经很普及了，如果有不是很清楚的，可以去网上下载一个试玩。
本主题主要讲解此游戏的开发过程，以及设计思路和技术分享;

一、开发前首先讲一下本人的开发环境：
1、游戏引擎及版本:Cocos2d-js cc.ENGINE_VERSION = 3.0。
2、开发工具:Cocos Code IDE 1.0.1。
3、开发平台Windows7旗舰版。

二、游戏场景简介：
该游戏在本主题中包括4个场景，分别是：
1、游戏初始化场景，及游戏菜单选择场景，可以选择新游戏、继续游戏、帮助、退出等。
2、游戏帮助场景，介绍游戏的玩法。
3、游戏过度场景，游戏开始到正式游戏间的一个过度场景，告诉玩家当前关卡和通过该关卡所要达到的分数。
4、游戏主场景，及星星消除场景也是游戏最核心的场景，主要的算法逻辑都在该场景实现。

三、讲解思路：
由于本主题是一个完整的游戏项目，所以讲解是以类为单位，按照游戏的操作流程逐步推进的，有些类里面有少量代码穿插了
后续章节的代码，所以在当前类里找不到该代码的出处也是正常的，这就需要将
后续章节都学习了才能前后连贯起来；如果不喜欢这样，觉得这样耦合太过严密了，也不用担心；因为每一个类既是与其他类耦合
起来的，同时与本类也是相对独立的；只要将耦合其他类的接口注释掉就可以了；每一个类的功能都可以单独的测试，整套主题将
按照游戏的流程来讲解。

四、游戏中有部分通用的自定义组件及颜色的设定等，单独写在了一个GameUtil.js的文件中；这样做的目的是方便统一管理，
可以做到一对多的控制效果，为各个js文件调用提供统一接口，具体内容如下：
GameUtil类
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

/**
 * 通用文本组件
 */
function myText(str, color, fontSize)
{
	//作用域安全的构造函数，使得this指针始终指向myText；这样写的目的是防止在使用构造函数的时候忘记了使用new关键字
	//如果没有使用new,this指向的不是myText，而是全局，会导致不可预料的bug；
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

/**
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

/**
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


/**
 * 游戏音效
 */
function Music(){};
Music.isMusic = true;
/**
 * 爆竹声
 */
Music.playFire = function()
{
	if ( !this.isMusic ){return;}
	cc.audioEngine.playMusic("music/fire.mp3", true);
};

/**
 * 破碎声,消除同色星星时播放
 */
Music.playBroken = function()
{
	if ( !this.isMusic ){return;}
	cc.audioEngine.playEffect("music/broken.mp3", false);
};

/**
 * 按钮音效
 */
Music.playClick = function()
{
	if ( !this.isMusic ){return;}
	cc.audioEngine.playEffect("music/click.mp3", false);
};

/**
 * 选中音效
 */
Music.playSelected = function()
{
	if ( !this.isMusic ){return;}
	cc.audioEngine.playEffect("music/select.mp3", false);
};

/**
 * 全部消除音效
 */
Music.playStageClear = function()
{
	if ( !this.isMusic ){return;}
	cc.audioEngine.playEffect("music/stageclear.mp3", false);
};

/**
 * 过关音效
 */
Music.playWin = function()
{
	if ( !this.isMusic ){return;}
	cc.audioEngine.playEffect("music/win.mp3", false);
};

/**
 * 停止播放
 */
Music.stopMusic = function()
{
	cc.audioEngine.stopMusic();
};

/**
 * 控制游戏窗口尺寸
 */
var Def = {
	windowWidth:function(){//基础窗口宽度	int
		return 480; 
	},	
	windowHeight:function(){//基础窗口高度800	int
		return 800; 
	},	
	windowSize:function(){ //窗口大小	cc.size
		return cc.size(Def.windowWidth(), Def.windowHeight());
	},
	platform:function(){ //获取平台编号 cc.sys.OS_ANDROID		string	
		return cc.sys.os;
	}
};


在后面的章节中如果看到myText, myButton, myImage等可千万别说这是神马东西。
