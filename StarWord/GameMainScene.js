Cocos2d-js 之 主场景

一、场景内容：主场景由两部分组成（顶部得分信息和底部星星消除层），该场景做的事情是将组成该场景的两部分加载进来，并确定场景的尺寸，重要的实现逻辑
分别在顶部和底部层中实现，该场景起到一个容器的作用。

二、场景控件：
三、场景实现技术分析：

四、游戏代码及注释：
GameMainScene类
/**
 * 游戏主场景
 */
var GameMainScene = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit();
		this.setTopInfor();//游戏主场景顶部显示信息
		this.addStarLayout();//将星星层添加到主场景
	},
	//初始化
	zinit:function()
	{
		//设置布局大小
		this.size = Def.windowSize();
		this.setSize(this.size);
		//实例化背景图片
		var backGround = new myImage(res.mainbacktop);
		backGround.y = this.size.height - backGround.height;
		this.addChild(backGround, 0);
		var backGround1 = new myImage(res.mainbackbottom);
		this.addChild(backGround1, 0);
	},
	//游戏主场景顶部显示信息
	setTopInfor:function()
	{
		var gameTopInfo = new GameTopInformation();
		gameTopInfo.y = this.size.height - gameTopInfo.height;
		this.addChild(gameTopInfo, 1);
	},
	//将星星层添加到主场景
	addStarLayout:function()
	{
		var starLayout = GameStarLayout.createLayout();
		this.addChild(starLayout, 1);
	}
});

//实例化场景
GameMainScene.createScene = function()
{
	var gameLayout = new GameMainScene();
	var scene = cc.Scene.create();
	scene.addChild(gameLayout);
	return scene;
};

