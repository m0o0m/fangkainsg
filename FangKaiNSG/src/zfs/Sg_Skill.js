
var Sg_Skill = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.addResource();
	},
	addResource:function()
	{
		cc.spriteFrameCache.addSpriteFrames("res/skill/skill_dd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/skill/skill_th.plist");
	},
	//点击
	getTrailSkill:function()
	{
		var anim = [], animation, animate, callF, sequence, card;
		card = cc.Sprite.createWithSpriteFrameName("trail_0001.png");
		for ( var i = 1; i < 11; i++ )
		{
			var str = "trail_000" + i + ".png";
			if ( i > 9 )
			{
				str = "trail_00" + i + ".png";
			}
			var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
			anim.push(spriteFrame);
		}
		animation = cc.Animation.create(anim, 0.1);
		animate	  = cc.Animate.create(animation);
		callF = cc.callFunc(function()
		{
			card.removeFromParent();
		}, this);
		sequence = cc.sequence(animate, callF);
		card.runAction(sequence);
		return card;
	},
	//风暴
	getFullSkill:function()
	{
		var anim = [], animation, animate, callF, sequence, card;
		card = cc.Sprite.createWithSpriteFrameName("full_0001.png");
		for ( var i = 1; i < 14; i++ )
		{
			var str = "full_000" + i + ".png";
			if ( i > 9 )
			{
				str = "full_00" + i + ".png";
			}
			var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
			anim.push(spriteFrame);
		}
		animation = cc.Animation.create(anim, 0.1);
		animate	  = cc.Animate.create(animation);
		callF = cc.callFunc(function()
		{
			card.removeFromParent();
		}, this);
		sequence = cc.sequence(animate, callF);
		card.runAction(sequence);
		return card;
	},
	onExit:function()
	{
		this._super();
	}
});

















