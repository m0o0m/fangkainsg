Cocos2d-js 之消灭星星第二讲，游戏菜单选择场景:
一、场景内容：该场景是运行游戏后第一个出现在玩家眼前的场景，其中主要包含图片、文本、按钮，以及相应的特效，特效包括音效、动作、粒子。

二、场景控件及类：
1、ccui.Button:按钮组件。
2、ccui.ImageView:图片组件。
3、ccui.Text:文本组件。
4、cc.moveTo:直线移动动作类。
5、cc.EaseElasticOut:弹出动作类。
6、cc.ParticleExplosion:粒子爆炸特效类。
7、cc.textureCache:纹理缓存类，用来实例化粒子特效的贴图。
8、cc.audioEngine:音效类，播放背景音乐和音效。
9、cc.director:导演类，用于控制场景的切换。
10、cc.Scene:场景类。
11、ccui.Layout:布局类（UI控件）。
12、cc.TransitionFade：过度效果类，用于场景切换。

三、场景实现技术分析：
1、UI布局：将场景中的图片、文本、按钮、粒子放置到给定的位置。
2、动作实现：场景中将两种动作（moveTo,EaseElasticOut)结合起来使用，而不是单一的移动或弹出，这样会给玩家一种绚丽的感觉；对动作的控制可以按个人的审美调整（如：时间，坐标）。
3、粒子特效：粒子特效的贴图实现，粒子系统的实例化，以及粒子系统的位置设定；
4、定时器：设置定时器（schedule(...)来控制粒子效果的实例化，在该场景每隔一段时间就会实例化一次粒子爆炸效果，玩家视线内场景中的粒子不会完全消失；通过定时器不断的产出粒子，是游戏看起来更加绚丽。
5、音效：该场景右上角的喇叭按钮用来控制整个游戏背景音乐的播放和停止(cc.audioEngine.playMusic(...))；然后就是按钮点击的音效播放（cc.audioEngine.playEffect(...)以及粒子方法的音效。

四、游戏代码及注释：
GameInitializeScene类
/**
 * 游戏初始化场景的建立
 */
var GameInitializeScene = ccui.Layout.extend(
{
	size:null,//布局尺寸
	ctor:function()
	{
		this._super();
		this.zinit();//初始化函数
		this.setTopInfor();//顶部显示静态图片和文本等
		this.setBlinkAction();//图片及动作
		this.setGameButton();//按钮及动作
		this.setParticleSys();//粒子特效
		this.schedule(this.playExplosion, 1);//定时器、控制粒子特效的播放
	},
	//初始化函数
	zinit:function()
	{
		//设置布局大小
		this.size =Def.windowSize();
		this.setSize(this.size);
		//实例化背景图片
		var backGround = new myImage(res.mainbacktop);
		backGround.y = this.size.height - backGround.height;
		this.addChild(backGround, 0);
		var backGround1 = new myImage(res.mainbackbottom);
		this.addChild(backGround1, 0);
		this.playerGameData = playerGameData;
		this.maxScore = this.playerGameData.maxScore;//游戏最高得分
	},
	//设置游戏场景顶部显示信息(最高纪录、声音控制)
	setTopInfor:function()
	{
		var maxRecord = new myImage(res.maxrecord);
		maxRecord.x = 10;
		maxRecord.y = this.size.height - maxRecord.height - 20;
		this.addChild(maxRecord, 1);

		var maxScore = new myImage(res.maxscore);
		maxScore.x = maxRecord.x + maxRecord.width + 30;
		maxScore.y = maxRecord.y;
		this.addChild(maxScore, 1);
		//最高纪录
		var maxScoreLabel = new myText(this.maxScore.toString(), white, 26);
		maxScoreLabel.x = maxScore.x+(maxScore.width - maxScoreLabel.width)/2;
		maxScoreLabel.y = maxScore.y;
		this.addChild(maxScoreLabel, 2);
		//声音喇叭按钮
		var laba = new myButton(res.labaok);
		laba.x = this.size.width - laba.width - 5;
		laba.y = maxScore.y;
		this.addChild(laba, 1);
		laba.addTouchEventListener(this.controlLabaFunc, this);
	},
	//实例化三个Blink图片并设置其分别从屏幕左右出现动画
	setBlinkAction:function()
	{
		var blink1 = new myImage(res.blink1);
		blink1.x = -blink1.width - 20;
		blink1.y = this.size.height - blink1.height - 65;
		this.addChild(blink1, 1);
		var moveTo1 = cc.moveTo(2, cc.p((this.size.width-blink1.width)/2, blink1.y));
		//移动动作和弹出动作结合使用
		var easing01 = moveTo1.clone().easing(cc.easeElasticOut());
		blink1.runAction(easing01);

		var blink2 = new myImage(res.blink2);
		blink2.x = this.size.width + 20;
		blink2.y = blink1.y - blink2.height+40;
		this.addChild(blink2, 1);
		var moveTo2 = cc.moveTo(2, cc.p((this.size.width-blink1.width)/2 - 30, blink2.y));
		var easing02 = moveTo2.clone().easing(cc.easeElasticOut());
		blink2.runAction(easing02);

		var blink3 = new myImage(res.blink3);
		blink3.x = blink1.x;
		blink3.y = blink2.y - blink3.height+70;
		this.addChild(blink3, 1);
		var moveTo3 = cc.moveTo(2, cc.p((this.size.width-blink1.width)/2 + 50, blink3.y));
		var easing03 = moveTo3.clone().easing(cc.easeElasticOut());
		blink3.runAction(easing03);
	},
	//实例化与玩家交互的按钮(新游戏、继续游戏、帮助、退出)及动作
	setGameButton:function()
	{
		var gap = 10;
		var a = 340-50, b = 275-50, c = 210-50, d = 145-50;
		//新游戏按钮
		var newGameBtn = new myButton(res.newgame);
		var endX = this.size.width - newGameBtn.width >> 1;
		var endY = this.size.height+100;
		newGameBtn.name = "newGame";
		newGameBtn.x = endX;
		newGameBtn.y = endY;
		this.addChild(newGameBtn, 1);
		//action1
		var moveTo1 = cc.MoveTo.create(5, cc.p(endX, a));
		var easeOut1 = moveTo1.clone().easing(cc.easeElasticOut());
		newGameBtn.runAction(easeOut1);
		
		//继续游戏按钮
		var continueGameBtn = new myButton(res.resume);
		continueGameBtn.name = "continueGame";
		continueGameBtn.x = endX;
		continueGameBtn.y = endY
		this.addChild(continueGameBtn, 1);
		//action2
		var moveTo2 = cc.MoveTo.create(4, cc.p(endX, b));
		var easeOut2 = moveTo2.clone().easing(cc.easeElasticOut());
		continueGameBtn.runAction(easeOut2);
		
		
		//帮助按钮
		var helpGameBtn = new myButton(res.help);
		helpGameBtn.name = "helpGame";
		helpGameBtn.x = endX;
		helpGameBtn.y = endY;
		this.addChild(helpGameBtn, 1);
		//action3
		var moveTo3 = cc.MoveTo.create(3, cc.p(endX, c));
		var easeOut3 = moveTo3.clone().easing(cc.easeElasticOut());
		helpGameBtn.runAction(easeOut3);
		
		//退出按钮
		var exitGameBtn = new myButton(res.exit);
		exitGameBtn.name = "exitGame";
		exitGameBtn.x = endX;
		exitGameBtn.y = endY;
		this.addChild(exitGameBtn, 1);
		//action4
		var moveTo4 = cc.MoveTo.create(2, cc.p(endX, d));
		var easeOut4 = moveTo4.clone().easing(cc.easeElasticOut());
		exitGameBtn.runAction(easeOut4);
		
		newGameBtn.addTouchEventListener(this.btnControlGameFunc, this);
		continueGameBtn.addTouchEventListener(this.btnControlGameFunc, this);
		helpGameBtn.addTouchEventListener(this.btnControlGameFunc, this);
		exitGameBtn.addTouchEventListener(this.btnControlGameFunc, this);
	},
	//按钮监听函数
	btnControlGameFunc:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_BEGAN )
		{
			//播放按钮选中音效
			Music.playSelected();
		}
		if( state === ccui.Widget.TOUCH_ENDED )//当手指松开时响应
		{
			switch (target.name)
			{
				case "newGame"://进入新游戏
					var newGameScene = TransitionScene.createScene(true);
					cc.director.runScene(cc.TransitionFade.create(1, newGameScene));
					cc.log("newGame");
					break;
				case "continueGame"://继续游戏
					var newGameScene = TransitionScene.createScene(false);
					cc.director.runScene(cc.TransitionFade.create(1, newGameScene));
					break;
				case "helpGame"://游戏帮助
					var helpScene = GameHelpLayout.createScene();
					cc.director.runScene(cc.TransitionFade.create(1, helpScene));
					break;
				case "exitGame"://退出游戏
					cc.director.end();
					break;
			}
		}
	},
	//喇叭监听函数，控制游戏背景音乐
	controlLabaFunc:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_BEGAN )
		{
			//播放按钮选中音效
			Music.playSelected();
		}
		if( state === ccui.Widget.TOUCH_ENDED )
		{
			if( !Music.isMusic )
			{
				//开启系统音效
				Music.isMusic = true;
				Music.playFire();
				target.loadTextures(res.labaok, "");
			}
			else	//播放音乐
			{
				//关闭所有音效
				target.loadTextures(res.labano, "");
				Music.stopMusic();
				Music.isMusic = false;
			}
		}
	},
	//添加粒子特效是游戏更炫丽
	setParticleSys:function()
	{
		this.playExplosion();
	},
	//粒子系统爆炸效果
	playExplosion:function()
	{
		//随机设置粒子特效的位置，大概在场景的上半部分出现
		var xx = (Math.random()*this.width - 40) + 20, yy = (Math.random()*this.height - 20) + this.height/3, type = Math.floor(Math.random()*5);
		var sys = this.addExplosion(xx, yy, type, 80, 200);
		this.addChild(sys, 100);
		//这里一次实例化两个，看起来更加合理，更加不同审美可以自由设定一次性实例化数量
		var xx = (Math.random()*this.width - 40) + 20, yy = (Math.random()*this.height - 20) + this.height/3, type = Math.floor(Math.random()*5);
		var sys = this.addExplosion(xx, yy, type, 80, 200);
		this.addChild(sys, 100);
	},
	/**
	 * 粒子系统爆炸效果
	 * @param xx:X轴坐标
	 * @param yy:Y轴坐标
	 * @param type:星星类型
	 * @param num:粒子数量（默认为50个）可选参数
	 * @param gravity:粒子重力（默认为300）可选参数
	 * @returns
	 */
	addExplosion:function(xx, yy, type, num, gravity)
	{
		//实例化一个带粒子数量的爆炸效果的粒子特效
		var el = cc.ParticleExplosion.createWithTotalParticles((num ? num : 50));
		gravity = gravity ? gravity : 300;
		//生成粒子贴图纹理
		switch ( type) 
		{
		case 0:
			var textureCache = cc.textureCache.addImage(res.sp1);
			break;

		case 1:
			var textureCache = cc.textureCache.addImage(res.sp2);
			break;
			
		case 2:
			var textureCache = cc.textureCache.addImage(res.sp3);
			break;
			
		case 3:
			var textureCache = cc.textureCache.addImage(res.sp4);
			break;
			
		case 4:
			var textureCache = cc.textureCache.addImage(res.sp5);
			break;
			
		default:
			var textureCache = cc.textureCache.addImage(res.sp4);
			break;
		}
		//为粒子设置贴图纹理
		el.setTexture(textureCache);
		//设置粒子重力
		el.setGravity(cc.p(0,-gravity));
		//设置粒子移动速度
		el.setSpeed(200);
		el.setPosition(cc.p(xx + 24,yy + 24));
		return el;
	},
	//进入
	onEnter:function()
	{
		this._super();
		//播放爆竹音效
		Music.playFire();
	},
	//预备离开
	onExitTransitionDidStart:function()
	{
		this._super();
		//关闭音效
		Music.stopMusic();
	}
});

//实例化场景
GameInitializeScene.createScene = function()
{
	var scene = cc.Scene.create();
	var layout = new GameInitializeScene();
	scene.addChild(layout);
	return scene;
};
