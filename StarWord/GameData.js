数据持久化：
一、内容说明：
数据持久化就是将内存中的数据模型转换为存储模型,以及将存储模型转换为内存中的数据模型的统称，cocos2d-js中封装了数据持久化的类，及sys.localStorage。该类有几个数据处理的方法，及写入sys.localStorage.setItem(param)，读出sys.localStorage.getItem()，删除sys.localStorage.removeItem(param)。其中具体的用法请参考官网API。在星星消除中用到了数据持久化，用来保存玩家的游戏数据。在本案例中玩家的数据结构为{level:1, score:0, mScore:0}，及关卡，游戏得分，游戏最高得分。

二、游戏代码：
/**
 * 玩家游戏数据结构
 */
var PlayerDate = {level:1, score:0, mScore:0};

/**
 * win7下本地存储玩家的数据
 */
var PlayerLocalData = {};
/**
 * 玩家数据结构
 */
var playerData111 = function()
{
	var playerD = 
	   {
		   //关卡
		   level:1,			
		   //游戏得分
		   score:0,			
		   //游戏最高得分
		   mScore:0			
	   };
	return playerD;
};
/**
 * 写入数据,将玩家数据保存在本地
 * @param jsonName传入的json数据结构的名字
 */
PlayerLocalData.setItem = function(jsonName)
{
	//将json数据结构转换成字符串结构
	var playerDD= JSON.stringify(PlayerDate);
	//写入数据
	sys.localStorage.setItem("playerData",playerDD);
};

/**
 * 读取玩家数据,还回json数据格式(数组)
 */
PlayerLocalData.getItem = function()
{
	if(!sys.localStorage.getItem("playerDataExist"))
	{
		var playerData1 = JSON.stringify(playerData111());
		//只有第一次玩家进入游戏才会写入初始玩家数据[类似单例模式]
		sys.localStorage.setItem("playerDataExist", "playerDataExist");
		sys.localStorage.setItem("playerData", playerData1);
	}
	//从本地读取数据
	var playerDataa = sys.localStorage.getItem("playerData");	
	//将字符串结构转换成json数据结构
	var playerDatab = JSON.parse(playerDataa);	
	return playerDatab;
};

/**
 * 删除数据,将玩家数据清空
 */
PlayerLocalData.deleteItem = function()
{
	sys.localStorage.removeItem("playerData");
	sys.localStorage.removeItem("playerDataExist");
};




