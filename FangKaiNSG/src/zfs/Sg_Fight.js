
var Sg_Fight = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.variable();
		this.zinit();
		this.addCard();
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
		
		var fightBtn = ccui.Button.create("res/fight/btn_start_n.png","res/fight/btn_start_d.png");
		fightBtn.setPosition(this.width/2, this.height/2);
		this.addChild(fightBtn, 20);
		fightBtn.addTouchEventListener(this.startFightEvent, this);
	},
	addCard:function()
	{
		var gap = 40;
		for ( var i = 0; i < 6; i++ )
		{
			var card = new Sg_Card(this.cardArr[i]);
			card.x = (this.width - 3*(card.width+20)>>1) + (card.width + 30)*(i%3);
			card.y = gap + (card.height + gap)*Math.floor(i/3);
			this.cardLayout.addChild(card, 0);
		}
		
		for ( var i = 0; i < 6; i++ )
		{
			var card = new Sg_Card(this.cardArr[this.cardArr.length-i-1]);
			card.x = (this.width - 3*(card.width+20)>>1) + (card.width + 30)*(i%3);
			card.y = this.height/1.8 + (card.height + gap)*Math.floor(i/3);
			this.cardLayout.addChild(card, 0);
		}
	},
	play_move:function(distance)
	{
		var moveTo = cc.moveTo(10, cc.p(0, -distance));
		var callFunc = cc.callFunc(function()
		{
			Sg_Music.stopEffect(Sg_Music.playWalk());
			this.startFight();
		}, this);
		var sequence = cc.sequence(moveTo, callFunc);
		this.map.runAction(sequence);
	},
	startFight:function()
	{
		var child = this.cardLayout.getChildren();
		for ( var i = 0; i < child.length; i++ )
		{
			child[i].stopWalkAction();
			child[i].scale = 1;
		}
	},
	startFightEvent:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_BEGAN )
		{
			Sg_Music.playButtonEffect();
		}
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			this.play_move(this.map.height - this.height);
			target.removeFromParent();
		}
	},
	onEnter:function()
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










