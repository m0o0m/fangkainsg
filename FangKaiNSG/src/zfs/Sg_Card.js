var Sg_Card = ccui.Layout.extend(
{
	/**
	 * 
	 * @param data
	 * @param type:int 1玩家 2敌人
	 */
	ctor:function(data, type, that)
	{
		this._super();
		this.zinit(data, type, that);
		this.setCard(); 
		this.setAnchor();
	},
	zinit:function(data, type, that)
	{
		this.setSize(cc.size(132,165));
		this.bloodSlider = null;
		this.card = null;
		this.data = data;
		this.type = type;
		this.that = that;
		this.angerValue = 0;//怒气值
		this.cbg = null;
		this.angerArr = [];
	},
	setCard:function()
	{
		var bg = ccui.ImageView.create("res/fight/card_shadow.png");
		bg.setPosition(this.getSize().width/2, this.getSize().height/2);
		this.addChild(bg, 0);

		var cbg = ccui.ImageView.create("res/fight/card_5_2.png");
		cbg.setPosition(this.getSize().width/2, this.height/2+(this.height-cbg.height>>2));
		this.cbg = cbg;
		this.addChild(cbg, 1);
		
		var ctop = ccui.ImageView.create("res/fight/card_5_top.png");
		ctop.setAnchorPoint(0, 1);
		ctop.setPosition(0, cbg.height);
		cbg.addChild(ctop, 0);
		
		var ctop_r = ccui.ImageView.create("res/fight/card_5_top.png");
		ctop_r.setAnchorPoint(1, 1);
		ctop_r.setRotation(90);
		ctop_r.setPosition(cbg.width, cbg.height-ctop_r.height);
		cbg.addChild(ctop_r, 0);
		
		this.bloodSlider = ccui.Slider.create();
		this.bloodSlider.loadBarTexture("res/fight/hpline_bg.png");
		this.bloodSlider.loadProgressBarTexture("res/fight/hpline.png");
		this.bloodSlider.setPercent(100);
		this.bloodSlider.setPosition(bg.width/2, this.bloodSlider.height);
		bg.addChild(this.bloodSlider, 0);
		
		var card = ccui.ImageView.create();
		card.loadTexture(this.data.card);
		card.setAnchorPoint(0.5, 0);
		card.setPosition(cbg.width/2, 25);
		cbg.addChild(card, 10);
		this.card = card;
		
	},
	playWalkAction:function()
	{
		var scaleN = 1.05;
		var scale = cc.scaleTo(0.3, scaleN, scaleN);
		var scale_n = cc.scaleTo(0.3, 1, 1);
		var sequence = cc.sequence(scale, scale_n);
		this.runAction(sequence.repeatForever());
	},
	playAttackAction:function() 
	{
//		if ( this.angerValue >= 75 )
//		{
//			this.playSkill();
//			return;
//		}
		var scaleN = 1.1;
		var rotate01 = cc.rotateTo(0.1,-20);
		var rotate02 = cc.rotateBy(0.1,30);
		var rotate03 = cc.rotateBy(0,-10);
	
		var scale01  = cc.scaleTo(0.1, scaleN, scaleN);
		var scale02  = cc.scaleTo(0.1, 1, 1);
	
		var spw01	 = cc.spawn(rotate01, scale01);
		var spw02	 = cc.spawn(rotate02, scale02);
	
		var sequence = cc.sequence(spw01, spw02,rotate03);
		var elastic  = cc.EaseElasticOut.create(sequence, 3);
		this.runAction(elastic);
		Sg_Music.playAttack();
	},
	playSkill:function()
	{
		if ( this.type === 1 )
		{
			this.playSkill01();
		}
		else
		{
			this.playSkill02();
		}
	},
	playSkill01:function()
	{
		var skill = this.that.skill.getTrailSkill();
		skill.setAnchorPoint(0.5, 1);
		skill.setRotation(180);
		skill.setPosition(this.width/2, this.height/2);
		this.addChild(skill, 100);
	},
	playSkill02:function(point)
	{
	},
	stopWalkAction:function()
	{
		this.stopAllActions();
		var scale = cc.scaleTo(0.1, 1, 1);
		this.runAction(scale);
	},
	setAnchor:function()
	{
		if ( this.type === 2 )
		{
			this.setAnchorPoint(0, 1);
		}
	},
	setBloodParent:function()
	{
		var blood = this.bloodSlider.getPercent()-Math.random()*50;
		this.bloodSlider.setPercent(blood);
		if ( this.bloodSlider.getPercent() <= 0 )
		{
			var scaleTo = cc.scaleTo(0.3, 0, 0);
			var fadeOut = cc.rotateTo(0.3, 720*2, 720*2);
			var spaw	= cc.spawn(scaleTo, fadeOut);
			var callF	= cc.callFunc(function()
			{
				this.that.checkClear(this);
				this.removeFromParent();
			}, this);
			var sequence = cc.sequence(spaw, callF);
			this.runAction(sequence);
			return;
		}
		this.card.setColor(cc.color.RED);
		var scaleTo01 = cc.scaleTo(0.1, 1.1);
		var scaleTo02 = cc.scaleTo(0.1, 1);
		var callF	= cc.callFunc(function()
		{
			this.card.setColor(cc.color(255, 255, 255, 255));
		}, this);
		var sequence = cc.sequence(scaleTo01, scaleTo02, callF);
		this.runAction(sequence);
		//提高怒气值
		this.angerValue += Math.random()*100;
		this.refreshAngerValue();
	},
	refreshAngerValue:function()
	{
		for( var i = 0; i < this.angerArr.length; i++ )
		{
			this.angerArr[i].removeFromParent();
			this.angerArr.splice(i, 1);
		}
		var percent = this.angerValue, angerNum = 0;
		if ( percent < 25 && percent > 10 )
		{
			angerNum = 1;
		}
		else if ( percent >= 25 && percent < 50 )
		{
			angerNum = 2;
		}
		else if ( percent >= 50 && percent < 75 )
		{
			angerNum = 3;
		}
		else if ( percent >75 )
		{
			angerNum = 4;
		}
		for ( var i = 0; i < angerNum; i++ )
		{
			var anger = ccui.ImageView.create();
			anger.loadTexture("res/fight/anger.png");
			anger.setPosition(13 + (anger.width-1)*i, anger.height/2+3);
			this.cbg.addChild(anger, 1);
			this.angerArr.push(anger);
		}
	}
});





