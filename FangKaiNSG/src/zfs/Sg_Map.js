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
		this.map = [
		            {bom:"res/map/gongdiannei_0.jpg", top:"res/map/gongdiannei_1.jpg"},
		            {bom:"res/map/chuan_0.jpg", top:"res/map/chuan_1.jpg"},
		            {bom:"res/map/chengqiang_0.jpg", top:"res/map/chengqiang_1.jpg"},
		            {bom:"res/map/chengmen2_0.jpg", top:"res/map/chengmen2_1.jpg"},
		            {bom:"res/map/daohuacun_0.jpg", top:"res/map/daohuacun_1.jpg"},
		            {bom:"res/map/ducheng_0.jpg", top:"res/map/ducheng_1.jpg"},
		            {bom:"res/map/huangye_0.jpg", top:"res/map/huangye_1.jpg"}
		            ];
	},
	map_gongdian:function()
	{
		var m = Math.floor(Math.random()*this.map.length);
		var map = ccui.ImageView.create(this.map[m].bom);
		map.setAnchorPoint(0, 0);
		this.addChild(map, 0);
		
		var map1 = ccui.ImageView.create(this.map[m].top);
		map1.setAnchorPoint(0, 0);
		map1.setPosition(0, map.height);
		this.addChild(map1, 0);
	}
});