游戏帮助场景
一、场景内容：该场景是运行游戏后点击帮助按钮所切换到的场景，此场景包括一张带有游戏玩法说明文字的图像，和一个换回
的按钮，简单的说就是告诉玩家怎么玩；

二、场景控件：
1、ccui.Button:按钮组件。
2、ccui.ImageView:图片组件。

三、场景实现技术分析：

四、游戏代码及注释：
GameHelpLayout类
/**
 * @游戏帮助说明,该帮助场景只包含一张附有说明文字的背景图和一个还回按钮
 */
var GameHelpLayout = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit();
		this.setBackButton();
	},
	//还回按钮
	setBackButton:function()
	{
		var backButton = new myButton(res.returnBtn);
		backButton.x = 480 - backButton.width - 10;
		backButton.y = 10;
		this.addChild(backButton, 1);
		backButton.addTouchEventListener(this.backButtonFunc, this);
	},
	//按钮监听器
	backButtonFunc:function(target,state)
	{
		if ( state === ccui.Widget.TOUCH_BEGAN )
		{
			Music.playSelected();
		}
		if( state === ccui.Widget.TOUCH_ENDED )
		{
			var newGameScene = GameInitializeScene.createScene();
			cc.director.runScene(cc.TransitionFade.create(1, newGameScene));
		}
	},
	zinit:function()
	{
		this.setSize(Def.windowSize());
		var bg = new myImage(res.helpbg);
		this.addChild(bg, 0);
	}
});
//实例化场景
GameHelpLayout.createScene = function()
{
	var layout = new GameHelpLayout();
	var scene = cc.Scene.create();
	scene.addChild(layout);
	return scene;
}