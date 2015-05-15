
var Sg_Music = 
{
	playLogin:function()
	{
		cc.audioEngine.playMusic("res/audio/login.mp3", true);
	//		cc.audioEngine.playMusic("res/audio/main.mp3", true);
	},
	playButtonEffect:function()
	{
		cc.audioEngine.playEffect("res/audio/button_01.mp3", false);
	},
	playFight:function()
	{
		cc.audioEngine.playEffect("res/audio/fight.mp3", true);
	},
	playWalk:function()
	{
		return cc.audioEngine.playEffect("res/audio/effect/walk01.mp3",true);
	},
	stopEffect:function(id)
	{
		cc.audioEngine.stopEffect(id);
	},
	stopMusic:function()
	{
		cc.audioEngine.stopMusic();
	}
};


