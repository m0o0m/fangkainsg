星星构造类

一、内容：该类是星星构造器，游戏中所有星星的实例化都在这里；在构造星星的时候给它设置了一些属性和方法，这些属性和
方法在游戏消除和排列时要用到。

二、控件：
2、ccui.ImageView:图片组件。

三、实现技术分析：
本类通过对图片组件的扩张，为星星设置了一些游戏消除相关的属性和方法，这些属性和方法的作用将会在下面的游戏代码中
做详细的讲解。这里把星星单独写成一个类，而不是在用到的时候直接以一个图片组件的形式实例化，这样做的好处是建立游
戏松散耦合，能够更方便的系统管理，这也符合实际开发应用思想。

四、游戏代码及注释：
GameCreateStar类
/*
 * 创建星星类(所有的星星都在这里创建,星星拥有的所有性都在这里实现)
 */
var GameCreateStar = ccui.ImageView.extend(
{
	type:0,//星星的类型(不同数字代表不同颜色的星星);
	normalType:null,//初始星星的类型(不同数字代表不同颜色的星星);主要作用是当两次选择的星星列表不一样时,还原初始type值,扮演一个中介者的角色
	isSelected:false,//是否选中
	col:null,//水平方向排列位置(0-9)
	row:null,//竖直方向排列位置(0-9)
	normal:null,//未选中状态图片纹理
	selected:null,//选中状态图片纹理
	count:0,//纪录当前星星选中次数,如果第一次选中的同色星星数大于1，则在一次点击就消除
	ctor:function(normal, type, selected, col, row)
	{
		this.type = type;
		this.normalType = type;
		this._super();
		this.col = col;
		this.row = row;
		this.normal = normal;
		this.selected = selected;
		this.loadTexture(normal);
		this.setAnchorPoint(0, 0);
	},
	//当点击星星的时候,加载不同状态的图片纹理
	updateTexture:function()
	{
		if(this.isSelected)
		{
			//加载选中状态图片纹理
			this.loadTexture(this.selected);
		}
		else
		{
			//加载未选中状态图片纹理
			this.loadTexture(this.normal);
		}
	}
});