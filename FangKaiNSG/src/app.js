
var HelloWorldLayer = cc.Layer.extend(
{
    ctor:function () 
    {
        this._super();
        var img = cc.Sprite.create("res/map/chuan_1.jpg");
        img.ignoreAnchorPointForPosition(true);
        this.addChild(img, 0);
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

