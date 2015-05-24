
var HelloWorldLayer = cc.Layer.extend(
{
    ctor:function () 
    {
        this._super();
        var login = new Sg_Login(); 
//        var login = new Sg_Fight(); 
        this.addChild(login, 0);
        
        
        
        var card = new Sg_Card({card:"res/card/zhan_jiang_caocao.png"}, 1, this);
        card.x = 200;
        card.y = 500;
        this.addChild(card, 110);
        
        this.schedule(function()
        {
        	card.playSkillAction();
        }, 1);
        
    },
    onEnter:function()
    {
    	this._super();
    	Sg_Music.playLogin();
    },
    onExitTransitionDidStart:function()
    {
    	this._super();
    	Sg_Music.stopMusic();
    }
});

var HelloWorldScene = cc.Scene.extend(
{
    onEnter:function () 
    {
        this._super();
        var layer = new HelloWorldLayer();
        cc.director.setDisplayStats(false);
        this.addChild(layer);
    }
});

