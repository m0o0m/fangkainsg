
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
		var bgm = [
		           "res/audio/bgm/music01.mp3",
		           "res/audio/bgm/music02.mp3",
		           "res/audio/bgm/music03.mp3",
		           "res/audio/bgm/music04.mp3",
		           "res/audio/bgm/music05.mp3",
		           "res/audio/bgm/music06.mp3",
		           "res/audio/bgm/music07.mp3",
		           "res/audio/bgm/music08.mp3",
		           "res/audio/bgm/music09.mp3",
		           "res/audio/bgm/music10.mp3",
		           "res/audio/bgm/music11.mp3",
		           "res/audio/bgm/music12.mp3",
		           "res/audio/bgm/music13.mp3",
		           "res/audio/bgm/music14.mp3",
		           "res/audio/bgm/music15.mp3",
		           "res/audio/bgm/music16.mp3",
		           "res/audio/fight.mp3"
		           ];
		var mm = Math.floor(Math.random()*bgm.length);
		cc.audioEngine.playMusic(bgm[mm], true);
	},
	playWalk:function()
	{
		cc.audioEngine.playEffect("res/audio/effect/walk01.mp3",false);
	},
	playAttack:function()
	{
		cc.audioEngine.playEffect("res/audio/effect/bullet_2.mp3", false);
	},
	playDead:function()
	{
		cc.audioEngine.playEffect("res/audio/overture/saveme.mp3", false);
	},
	playThunder:function()
	{
		cc.audioEngine.playEffect("res/audio/effect/bullet_5.mp3", false);
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


