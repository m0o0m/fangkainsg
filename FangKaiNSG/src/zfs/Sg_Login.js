var Sg_Login = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit();
	},
	zinit:function()
	{
		this.setSize(Default.windowSize());
		
		var bg = ccui.ImageView.create("res/login/bg.jpg");
		bg.setPosition(Default.windowWidth()/2, Default.windowHeight()/2);
		this.addChild(bg);
		
		var bg = ccui.ImageView.create("res/login/bg3.png");
		bg.setPosition(Default.windowWidth()/2, Default.windowHeight()/2);
		this.addChild(bg);
		
		var bg = ccui.ImageView.create("res/login/hot.png");
		bg.setPosition(Default.windowWidth()/2, Default.windowHeight()/6);
		this.addChild(bg, 10);
		
		var bg = ccui.ImageView.create("res/login/skill_bg_h.png");
		bg.scaleX = 2;
		bg.setPosition(Default.windowWidth()/2, Default.windowHeight()/4);
		this.addChild(bg, 10);
		var nameT = ccui.Text.create();
		nameT.setPosition(bg.getPosition());
		nameT.setText("小润哒哒哒");
		nameT.setFontSize(24);
		this.addChild(nameT, 11);
		
		var bg = ccui.ImageView.create("res/login/skill_bg_h.png");
		bg.setAnchorPoint(1, 0.5);
		bg.setPosition(Default.windowWidth()/2, Default.windowHeight()/6);
		this.addChild(bg);
		var server =  ccui.Text.create();
		server.setAnchorPoint(1, 0.5);
		server.setPosition(bg.getPosition().x-20 ,bg.getPosition().y);
		server.setText("NT1299393");
		server.setFontSize(20);
		this.addChild(server, 11);
		
		var bg = ccui.ImageView.create("res/login/skill_bg.png");
		bg.setAnchorPoint(0, 0.5);
		bg.setPosition(Default.windowWidth()/2, Default.windowHeight()/6);
		this.addChild(bg);
		
		var ssbtn = ccui.Button.create("res/login/select_server_s.png","res/login/select_server_b.png");
		ssbtn.setAnchorPoint(0, 0.5);
		ssbtn.setPosition(Default.windowWidth()/2+30, Default.windowHeight()/6);
		this.addChild(ssbtn, 10);
		ssbtn.addTouchEventListener(this.selectServerEvent, this);
		
		var enter = ccui.Button.create("res/login/enter_n.png","res/login/enter_h.png");
		enter.setPosition(Default.windowWidth()/2, Default.windowHeight()/12);
		this.addChild(enter, 10);
		enter.addTouchEventListener(this.enterGameEvent, this);
		
	},
	selectServerEvent:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_BEGAN )
		{
			Sg_Music.playButtonEffect();
		}
	},
	enterGameEvent:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			var scene = Sg_Fight.createScene();
			cc.director.runScene(cc.TransitionFadeBL.create(1, scene));
		}
		else if ( state === ccui.Widget.TOUCH_BEGAN )
		{
			Sg_Music.playButtonEffect();
		}
	},
});












