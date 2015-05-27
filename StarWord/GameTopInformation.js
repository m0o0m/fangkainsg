主场景顶部显示信息层
一、内容：
该层包含显示游戏信息的得分和背景图，游戏中的得分相关信息都在该层实现，比如，玩家在游戏中的最高的分，当前关卡，通过目标分数以及每次成功消除后
游戏得分更新并显示。

二、控件：
1、ccui.ImageView图片控件。
2、ccui.Text文本控件。
3、ccui.Button按钮控件。
4、cc.moveTo移动动作类。
5、cc.scaleTo缩放动作类。
6、cc.spawn并行播放动作。
7、cc.callFunc动作播放结束回调动作。
8、cc.sequence顺序播放动作。

三、技术分析：
本层实现起来相对简单，实现成功消除游戏得分更新，以及消除后得分文本的特效动作实现。

四、游戏代码及注释：
GameTopInformation类
/**
 * 游戏主场景顶部显示信息
 */
var GAMETOP;//对本层的引用
var GameTopInformation = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.setVariable();//属性初始化
		this.zinit();//初始化
		this.setInformation();//信息设置
	},
	//属性初始化
	setVariable:function()
	{
		GAMETOP = this;//对本层的引用
		this.size = cc.size(480, 300);//布局尺寸
		this.level = PlayerDate.level;//当前关卡
		this.score = PlayerDate.score;//当前得分
		this.mScore = PlayerDate.mScore;//当前最高得分
		this.isPause = false;//是否暂停
		this.isPassed = false;//是否达到目标分数，过关
		//获得当前关卡的目标分数
		for(var i = 0; i < levelData.length; i++)
		{
			if(this.level == levelData[i].level)
			{
				this.sScore = levelData[i].standards;//目标分数
				break;
			}
		}
	},
	//初始化
	zinit:function()
	{
		//布局尺寸
		this.setSize(this.size);
	},
	//信息设置及布局
	setInformation:function()
	{
		//最高纪录图片
		var maxRecord = new myImage(res.maxrecord);
		maxRecord.x = 10;
		maxRecord.y = this.size.height - maxRecord.height - 20;
		this.addChild(maxRecord, 1);

		//最高纪录图片
		var maxScore = new myImage(res.maxscore);
		maxScore.x = maxRecord.x + maxRecord.width + 30;
		maxScore.y = maxRecord.y;
		this.addChild(maxScore, 1);

		//最高得分
		this.maxScoreLabel = new myText(this.mScore.toString(), white, 26);
		this.maxScoreLabel.x = maxScore.x+(maxScore.width - this.maxScoreLabel.width)/2;
		this.maxScoreLabel.y = maxScore.y;
		this.addChild(this.maxScoreLabel, 2);
		//暂停和继续游戏控制按钮
		var pauseGameBtn = new myButton(res.pause);
		pauseGameBtn.x = this.size.width - pauseGameBtn.width - 10;
		pauseGameBtn.y = this.maxScoreLabel.y;
		this.addChild(pauseGameBtn, 1);
		pauseGameBtn.addTouchEventListener(this.pauseGameBtnFunc, this);
		//过关text
		var guoguanImg = new myImage(res.guoguan);
		guoguanImg.x = 0;
		guoguanImg.y = maxRecord.y - guoguanImg.height - 20;
		this.addChild(guoguanImg, 1);
		//当前关卡背景图
		var currentLevelImg = new myImage(res.level);
		currentLevelImg.x = guoguanImg.x + guoguanImg.width;
		currentLevelImg.y = guoguanImg.y;
		this.addChild(currentLevelImg, 1);
		//当前关卡
		this.currentLevel = new myText(this.level.toString(), white, 24);
		this.currentLevel.x = currentLevelImg.x + (currentLevelImg.width -this.currentLevel.width)/2
		this.currentLevel.y = currentLevelImg.y;
		this.addChild(this.currentLevel, 1);
		//目标分数图
		var targetImg = new myImage(res.target);
		targetImg.x = currentLevelImg.x + currentLevelImg.width + 20;
		targetImg.y = currentLevelImg.y;
		this.addChild(targetImg, 1);
		//目标分数背景图
		var targetImgbg = new myImage(res.targetBar);
		targetImgbg.x = this.size.width - targetImgbg.width - 10;
		targetImgbg.y = targetImg.y;
		this.addChild(targetImgbg, 1);
		//目标分数
		var targetScore = new myText(this.sScore.toString(), white, 25);
		targetScore.x = targetImgbg.x +(targetImgbg.width - targetScore.width)/2;
		targetScore.y = targetImgbg.y;
		this.addChild(targetScore, 1);
		//得分图
		var getScore = new myImage(res.defen);
		getScore.x = this.size.width - getScore.width >> 1;
		getScore.y = targetScore.y - getScore.height - 10;
		this.addChild(getScore, 1);
		//登封背景图
		var getScoreBg = new myImage(res.defenBar);
		getScoreBg.x = this.size.width - getScoreBg.width >> 1;
		getScoreBg.y = getScore.y - getScoreBg.height - 10;
		this.addChild(getScoreBg, 1);
		//当前得分
		this.getScoreNum = new myText(this.score.toFixed(0), white, 25);
		this.getScoreNum.setAnchorPoint(0.5, 0);
		this.getScoreNum.x = this.size.width/2;
		this.getScoreNum.y = getScoreBg.y;
		this.addChild(this.getScoreNum, 1);
	},
	//暂停和继续游戏控制按钮监听器
	pauseGameBtnFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			Music.playSelected();
			if(!this.isPause)
			{
				target.setOpacity(255);
				this.isPause = true;
				//调用星星消除层结束游戏方法，判断是否结束游戏
				GAMESTARLAYOUT.endGame();
			}
		}
	},
	//更新游戏得分[在星星消除层成功消除时调用此方法]
	updateGameScore:function(starList)
	{
		//消除星星的个数
		var num = starList.length;
		this.tempScore = 5*num*num;	
		//一次性获得一定分数的特效显示
		this.effectOn();
		//获得分数特效0.5秒
		var score = new myText("+"+this.tempScore, red, 30);
		score.setPosition(cc.p(starList[0].x, starList[0].y));
		score.scale = 0.5;
		this.parent.addChild(score, 10);
		var scaleTo = cc.scaleTo(0.5, 2.2, 2.2);//放大
		var moveTo = cc.moveTo(0.5, cc.p(240, 600));//移动
		//动作播放完成的回调函数
		var callFunc = cc.CallFunc.create(function()
		{
			this.score += this.tempScore;
			PlayerDate.score = this.score;
			this.getScoreNum.setText(this.score);
			score.removeFromParent();
			//判断是否过关
			this.jugementOverLevel();
		}, this);
		var spawn = cc.Spawn.create(scaleTo, moveTo);//同时播放动作
		var sequence = cc.Sequence.create(spawn, callFunc);//按顺序播放动作
		score.runAction(sequence);
		//检测游戏是否结束，当没有可以消除的星星时游戏宣布结束
		GAMESTARLAYOUT.checkGameOver();
	},
	//判断是否过关
	jugementOverLevel:function()
	{
		//过关
		if( this.score >= this.sScore )
		{
			if( !this.isPassed )
			{
				this.isPassed = true;
				this.passedLevelEffect(res.win);
				PlayerDate.level += 1;
			}
			else
			{
				return;
			}
		}
	},
	//过关特效显示
	passedLevelEffect:function(str)
	{
		//播放通过关卡音效
		Music.playWin();
		var win = new myImage(str);
		win.setAnchorPoint(0.5, 0.5);
		win.setPosition(cc.p(Def.windowWidth()/2, 820));
		this.parent.addChild(win, 30);
		var moveTo = cc.moveTo(1,cc.p(240, 400)), scaleTo = cc.scaleTo(1, 1.3, 1.3),easeOut = moveTo.clone().easing(cc.easeInOut(1.0));
		var sparn = cc.spawn(easeOut, scaleTo);
		var fadeIn = cc.FadeOut.create(1);
		//动作播放结束回调动作
		var callFunc = cc.callFunc(function(){win.removeFromParent()}, this);
		var sequenct = cc.sequence(sparn, fadeIn , callFunc);
		win.runAction(sequenct);
	},
	//一次性获得一定分数的特效显示
	effectOn:function()
	{
		var imgArr = [res.bang, res.geili, res.ku, res.niu];
		//随机取一张鼓励的图
		var random = Math.floor(Math.random()*imgArr.length);
		var currentImg = imgArr[random];
		//一次性消除分数达到180
		if( this.tempScore >= 180 )
		{
			var effect = new myImage(currentImg);
			effect.setAnchorPoint(0.5, 0.5);
			effect.setPosition(cc.p(Def.windowWidth()/2, 800/2));
			effect.setOpacity(0);
			this.parent.addChild(effect, 20);
			
			var fadeIn = cc.FadeIn.create(1);
			var scaleTo = cc.scaleTo(1, 1.2, 1.2);
			var spawn = cc.spawn(fadeIn, scaleTo);
			var fadeOut = cc.FadeOut.create(1.2);
			//动作播放结束回调动作
			var callFunc = cc.CallFunc.create(function(){effect.removeFromParent()}, this);
			var sequence = cc.sequence(spawn, fadeOut, callFunc);
			effect.runAction(sequence);
		}
	},
	//保存数据
	onExitt:function()
	{
		//如果当前得分大于玩家最高得分，则更新最高得分
		if ( this.score > PlayerDate.mScore )
		{
			PlayerDate.mScore = this.score;
		}
		//本地保存玩家数据
		PlayerLocalData.setItem();
	}
});