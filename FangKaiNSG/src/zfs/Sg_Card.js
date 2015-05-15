var Sg_Card = ccui.Layout.extend(
{
	ctor:function(data)
	{
		this._super();
		this.zinit(data);
		this.setCard();
		this.playWalkAction();
	},
	zinit:function(data)
	{
		this.setSize(cc.size(132,165));
		this.bloodSlider = null;
		this.data = data;
	},
	setCard:function()
	{
		var bg = ccui.ImageView.create("res/fight/card_shadow.png");
		bg.setPosition(this.getSize().width/2, this.getSize().height/2);
		this.addChild(bg, 0);

		var cbg = ccui.ImageView.create("res/fight/card_5_2.png");
		cbg.setPosition(this.getSize().width/2, this.height/2+(this.height-cbg.height>>2));
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
		this.bloodSlider.setPercent(80);
		this.bloodSlider.setPosition(bg.width/2, this.bloodSlider.height);
		bg.addChild(this.bloodSlider, 0);
		
		var card = ccui.ImageView.create();
		card.loadTexture(this.data.card);
		card.setAnchorPoint(0.5, 0);
		card.setPosition(cbg.width/2, 25);
		cbg.addChild(card, 10);
		
		for ( var i = 0; i < 4; i++ )
		{
			var anger = ccui.ImageView.create();
			anger.loadTexture("res/fight/anger.png");
			anger.setPosition(13 + (anger.width-1)*i, anger.height/2+3);
			cbg.addChild(anger, 1);
		}
	},
	playWalkAction:function()
	{
		var scaleN = 1.05;
		var scale = cc.scaleTo(0.3, scaleN, scaleN);
		var scale_n = cc.scaleTo(0.3, 1, 1);
		var sequence = cc.sequence(scale, scale_n);
		this.runAction(sequence.repeatForever());
		
		Sg_Music.playWalk();
	},
	stopWalkAction:function()
	{
		this.stopAllActions();
	}
});


//虚胖打油诗
//







