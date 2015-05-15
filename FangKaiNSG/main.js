cc.game.onStart = function(){
	var ww = Default.windowWidth();
	var hh = Default.windowHeight();
	cc.view.setDesignResolutionSize(ww, hh, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
    	cc.director.runScene(cc.TransitionFade.create(1, new HelloWorldScene()));
    }, this);
};
cc.game.run();