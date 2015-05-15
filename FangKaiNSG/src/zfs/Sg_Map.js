var Sg_Map = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit();
	},
	zinit:function()
	{
		this.setSize(cc.size(Default.windowWidth(), 2400));
	},
	map_gongdian:function()
	{
		var map = ccui.ImageView.create("res/map/gongdiannei_0.jpg");
		map.setAnchorPoint(0, 0);
		this.addChild(map, 0);
		
		var map1 = ccui.ImageView.create("res/map/gongdiannei_1.jpg");
		map1.setAnchorPoint(0, 0);
		map1.setPosition(0, map.height);
		this.addChild(map1, 0);
	}
});