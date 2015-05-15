
var HelloWorldLayer = cc.Layer.extend(
{
    ctor:function () 
    {
        this._super();
        var login = new Sg_Login(); 
        this.addChild(login, 0);
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

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        cc.director.setDisplayStats(false);
        this.addChild(layer);
    }
});

