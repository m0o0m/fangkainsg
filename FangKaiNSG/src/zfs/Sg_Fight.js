
var Sg_Fight = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.variable();
		this.zinit();
		this.addCard();
		this.addControlButton();
		this.addTopLayout();
	},
	variable:function()
	{
		this.map = null;
		this.cardArr = [
		                {card:"res/card/zhan_jiang_caocao.png"},
		                {card:"res/card/zhan_jiang_guojia.png"},
		                {card:"res/card/zhan_jiang_huangyueying.png"},
		                {card:"res/card/zhan_jiang_huatuo.png"},
		                {card:"res/card/zhan_jiang_jiangwei.png"},
		                {card:"res/card/zhan_jiang_liubei.png"},
		                {card:"res/card/zhan_jiang_machao.png"},
		                {card:"res/card/zhan_jiang_sunquan.png"},
		                {card:"res/card/zhan_jiang_yuji.png"},
		                {card:"res/card/zhan_jiang_zhangfei.png"},
		                {card:"res/card/zhan_jiang_zhangjiao.png"},
		                {card:"res/card/zhan_jiang_zhouyu.png"}
		                ];
		this.cardA = [];
		this.cardB = [];
		this.cardC = [];
		this.isFirst  = true;
		this.isFight = true;
		this.m = this.n = 0;
		
		this.skill = new Sg_Skill();
	},
	zinit:function()
	{
		this.setSize(Default.windowSize());
		this.map = new Sg_Map();
		this.map.map_gongdian();
		this.addChild(this.map, 0);
		
		this.cardLayout = ccui.Layout.create();
		this.cardLayout.setSize(Default.windowSize());
		this.addChild(this.cardLayout, 10);
		this.scheduleOnce(function(){this.play_move(this.height/2);}, 1.5);
	},
	addControlButton:function()
	{
		var jumpOut = ccui.Button.create("res/fight/icon_skip_n.png","res/fight/icon_skip_h.png");
		jumpOut.setAnchorPoint(1, 0);
		jumpOut.setPosition(this.width, 0);
		this.addChild(jumpOut, 10);
		
		var speed = ccui.Button.create("res/fight/btn_speed1_n.png","res/fight/btn_speed1_d.png");
		speed.setAnchorPoint(0, 0);
		speed.setPosition(0, 0);
		this.addChild(speed, 10);
		speed.addTouchEventListener(this.controlSpeedEvent, this);
	},
	addTopLayout:function()
	{
		var layout = ccui.Layout.create();
		layout.setSize(cc.size(this.width, 50));
		layout.setPosition(0, this.height- layout.height);
		this.addChild(layout);
		
		var laC = cc.LayerColor.create();
		laC.setColor(cc.color(0, 0, 0, 100));
		laC.setContentSize(layout.getSize());
		layout.addChild(laC, 0);
		
		var foodImg = ccui.ImageView.create("res/fight/icon_piece.png");
		foodImg.setPosition(foodImg.width, layout.height/2);
		layout.addChild(foodImg, 1);
		var foodTxt = ccui.Text.create();
		foodTxt.setFontSize(24);
		foodTxt.setAnchorPoint(0, 0.5);
		foodTxt.setText(999);
		foodTxt.setPosition(foodImg.x + foodImg.width, foodImg.y);
		layout.addChild(foodTxt, 1);
		
		var soulImg = ccui.ImageView.create("res/fight/icon_soul.png");
		soulImg.setPosition(190, layout.height/2);
		layout.addChild(soulImg, 1);
		var soulTxt = ccui.Text.create();
		soulTxt.setFontSize(24);
		soulTxt.setAnchorPoint(0, 0.5);
		soulTxt.setText(999);
		soulTxt.setPosition(soulImg.x + soulImg.width, soulImg.y);
		layout.addChild(soulTxt, 1);
		
		var moneyImg = ccui.ImageView.create("res/fight/icon_money.png");
		moneyImg.setPosition(360, layout.height/2);
		layout.addChild(moneyImg, 1);
		var moneyTxt = ccui.Text.create();
		moneyTxt.setFontSize(24);
		moneyTxt.setAnchorPoint(0, 0.5);
		moneyTxt.setText(999);
		moneyTxt.setPosition(moneyImg.x + moneyImg.width, moneyImg.y);
		layout.addChild(moneyTxt, 1);
		
		var huiheTxt = ccui.Text.create();
		huiheTxt.setFontSize(24);
		huiheTxt.setAnchorPoint(1, 0.5);
		huiheTxt.setText("回合：0/30");
		huiheTxt.setPosition(this.width-20, moneyImg.y);
		layout.addChild(huiheTxt, 1);
	},
	addFightBtn:function()
	{
		var fightBtn = ccui.Button.create("res/fight/btn_start_n.png","res/fight/btn_start_d.png");
		fightBtn.setPosition(this.width/2, this.height/2 + fightBtn.height/4);
		this.addChild(fightBtn, 20);
		fightBtn.addTouchEventListener(this.startFightEvent, this);
		
		fightBtn.scaleX = this.width/fightBtn.width;
		fightBtn.scaleY = 0;
		var scaleTo = cc.scaleTo(0.5, 1, 1);
		var ease = cc.EaseElasticOut.create(scaleTo, 0.25);
		fightBtn.runAction(ease);
		
	},
	startFightEvent:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_BEGAN )
		{
			Sg_Music.playButtonEffect();
		}
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			this.schedule(this.startFight, 0.3);
			target.removeFromParent();
		}
	},
	addCard:function()
	{
		var gap = 40;
		for ( var i = 0; i < 6; i++ )
		{
			var card = new Sg_Card(this.cardArr[i], 1, this);
			card.x = (this.width - 3*(card.width+20)>>1) + (card.width + 30)*(i%3);
			card.y = gap + (card.height + gap)*Math.floor(i/3);
			this.cardLayout.addChild(card, 0);
			this.cardA.push(card);
		}
		//first
		for ( var i = 0; i < 6; i++ )
		{
			var card = new Sg_Card(this.cardArr[this.cardArr.length-i-1], 2, this);
			card.x = (this.width - 3*(card.width+20)>>1) + (card.width + 30)*(i%3);
			card.y = this.map.height/2 + (card.height + gap)*Math.floor(i/3);
			this.map.addChild(card, 0);
			this.cardB.push(card);
		}
		//last
		for ( var i = 0; i < 6; i++ )
		{
			var card = new Sg_Card(this.cardArr[this.cardArr.length-i-1], 2, this);
			card.x = (this.width - 3*(card.width+20)>>1) + (card.width + 30)*(i%3);
			card.y = this.map.height-card.height-gap*2 + (card.height + gap)*Math.floor(i/3);
			this.map.addChild(card, 0);
			this.cardC.push(card);
		}
	},
	play_move:function(distance)
	{ 
		var moveTo = cc.moveTo(3, cc.p(0, -distance));
		var callFunc = cc.callFunc(function()
		{
			this.stopWalk();
		}, this);
		var sequence = cc.sequence(moveTo, callFunc);
		this.map.runAction(sequence);
		this.controlPlayerCardWalk();
	},
	controlPlayerCardWalk:function()
	{
		for ( var i = 0; i < this.cardA.length; i++ )
		{
			this.cardA[i].playWalkAction();
		}
		this.schedule(this.playWalkMusic, 0.6);
	},
	playWalkMusic:function()
	{
		Sg_Music.playWalk();
	},
	stopWalk:function()
	{
//		Sg_Music.stopEffect(Sg_Music.playWalk());
		this.unschedule(this.playWalkMusic);
		for ( var i = 0; i < this.cardA.length; i++ )
		{
			this.cardA[i].stopWalkAction();
		}
		this.addFightBtn();
	},
	startFight:function()//TODO
	{
		if ( this.isFight )
		{
			this.isFight = false;
			this.m++; this.n++;
			this.jugementMN();
			this.cardA[this.m].playAttackAction();
			if ( this.cardB.length < 1)
			{
				this.cardC[this.n].setBloodParent();
			}
			else
			{
				this.cardB[this.n].setBloodParent();
			}
			
		}
		else
		{
			this.isFight = true;
			this.jugementMN();
			this.cardA[this.m].setBloodParent();
			if ( this.cardB.length < 1)
			{
				this.cardC[this.n].playAttackAction();
			}
			else
			{
				this.cardB[this.n].playAttackAction();
			}
		}
	},
	checkClear:function(currenttarget)
	{
		for ( var i = 0; i < this.cardA.length; i++ )
		{ 
			if ( this.cardA[i] == currenttarget )
			{
				this.cardA.splice(i, 1);
			}
		}
		for ( var i = 0; i < this.cardB.length; i++ )
		{
			if ( this.cardB[i] == currenttarget )
			{
				this.cardB.splice(i, 1);
			}
		}
		for ( var i = 0; i < this.cardC.length; i++ )
		{
			if ( this.cardC[i] == currenttarget )
			{
				this.cardC.splice(i, 1);
			}
		}
		if ( this.cardB.length < 1 && this.isFirst)
		{
			this.fightNext();
			this.isFirst = false
			Sg_Music.playDead();
		}
		if ( this.cardC.length < 1 || this.cardA.length < 1 )
		{
			this.overGame();
			Sg_Music.playDead();
		}
	},
	fightNext:function()
	{
		this.unschedule(this.startFight);
		for ( var i = 0; i < this.cardA.length; i++ )
		{ 
			this.cardA[i].stopWalkAction();
		}
		this.play_move(this.map.height - this.height);
	},
	overGame:function()
	{
		this.unschedule(this.startFight);
//		cc.director.runScene(cc.TransitionFade.create(1, new HelloWorldScene()));
		cc.director.runScene(cc.TransitionProgressRadialCW.create(1,Sg_Fight.createScene()));
	},
	jugementMN:function()
	{
		if ( this.m > this.cardA.length - 1 )
		{
			this.m = 0;
		}
		if ( this.cardB.length > 0)
		{
			if ( this.n > this.cardB.length - 1 )
			{
				this.n = 0;
			}
		}
		else
		{
			if ( this.n > this.cardC.length - 1 )
			{
				this.n = 0;
			}
		}
	},
	controlSpeedEvent:function()
	{
		cc.director.end();
	},
	onEnterTransitionDidFinish:function()  
	{
		this._super();
		Sg_Music.playFight();
	},
	onExitTransitionDidStart:function()
	{
		this._super();
		Sg_Music.stopMusic();
	}
});

Sg_Fight.createScene = function()
{
	var scene = cc.Scene.create();
	var layout = new Sg_Fight();
	scene.addChild(layout);
	return scene;
};










