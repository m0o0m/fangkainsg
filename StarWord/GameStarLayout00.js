星星消除层之——排兵布阵
一、总体实现思路：星星消除首先是按矩阵的方式排列出来，然后就是对星星的操作了，这里面的难点在于如何查找颜色类型相同的星星，消除后如何将上面的星星向下移动以及列向左移动，
什么时候移动？后面将一一分部讲解，这里按照游戏源码书写函数的步骤以及方法名来梳理一下大概的思路。
1、setVariable()属性初始化。
2、zinit()层初始化。
3、layoutStar()将星星按10*10的矩阵排列出来。
4、addTouchEventListener()给每个星星注册监听器。选中星星的时候有个表现逻辑，当第一次选中时呈现选中状态，并将其保存在firstTouchStar中。当第二次选择时
有几种情况：
	1、选中同色星星长度大于1.
		1、选中本身，将其还原为未选中状态，并将firstTouchStar赋值null。
		2、选中与firstTouchStar类型相同并且相连的星星，执行消除动作[resetStarRow()]，并将firstTouchStar赋值null。
		3、选中的是与firstTouchStar类型不同的星星，将其赋值给firstTouchStar，并将之前选中的星星还原为未选中状态。
	2、选中的同色星星长度等于1.
		1、选中本身，将其还原为未选中状态，并将firstTouchStar赋值null。
		2、选中其它任何星星，将其赋值给firstTouchStar，并将之前选中的星星还原为未选中状态。
5、findSameColorStar()寻找相连在一起同色的星星。
6、resetStarRow()消除星星。
7、checkMove()移动星星[向下和向左移动]。
	1、水平方向checkTop()。
	2、竖直方向checkEmptyColums()[检测是否存在空列]。

二、排列星星：
layoutStar()将星星按10*10的矩阵排列出来。
layoutStar:function()
{
	for( var i = 0; i < 10; i++ )
	{
		for( var j = 0; j < 10; j++ )	
		{
			//随机从5种不同颜色的星星中选择一个[共五种类型的星星]
			var randomNumber = Math.floor(Math.random()*this.starNum);
			var starResource = this.starArr[randomNumber];
			//实例化星星[参数说明见GameCreateStar类]
			var star = new GameCreateStar(starResource.normal, starResource.id,starResource.selected, i, j);
			//将其添加到层上
			this.addChild(star, 0);
			//星星出现的动画
			var moveTo = cc.moveTo(i/10, cc.p(star.width*i, star.height*j));
			star.runAction(moveTo);
			//将星星装到数组中,在初始化函数中starObjArr的长度已经设定好了（10），并且每一个元素都是一个空数组，这里直接给数组赋值；
			//当需要访问数组的时候可以arr[i][j]的形式来访问，这样在后边方法检测星星类型，以及消除逻辑的实现
			this.starObjArr[i][j] = star;
			//给每一个星星注册j监听器听器
			star.addTouchEventListener(this.onTouchStarFunc, this);
		}
	}
}

三、点击事件监听器：
onTouchStarFunc();
addTouchEventListener()给每个星星注册监听器。选中星星的时候有个表现逻辑，当第一次选中时呈现选中状态，并将其保存在firstTouchStar中。当第二次选择时
有几种情况：
	1、选中同色星星长度大于1.
		1、选中本身，将其还原为未选中状态，并将firstTouchStar赋值null。
		2、选中与firstTouchStar类型相同并且相连的星星，执行消除动作[resetStarRow()]，并将firstTouchStar赋值null。
		3、选中的是与firstTouchStar类型不同的星星，将其赋值给firstTouchStar，并将之前选中的星星还原为未选中状态。
	2、选中的同色星星长度等于1.
		1、选中本身，将其还原为未选中状态，并将firstTouchStar赋值null。
		2、选中其它任何星星，将其赋值给firstTouchStar，并将之前选中的星星还原为未选中状态。
onTouchStarFunc:function(target, state)
{
	if( state == ccui.Widget.TOUCH_ENDED )
	{
		if( !this.firstTouchStar )
		{
			//如果第一次选择的星星为空,则将当前星星赋给它[后续]
			this.firstTouchStar = target;
			//寻找相连在一起同色的星星[后续]
			this.findSameColorStar(target);
			//播放选中时的音效
			Music.playClick();
		}
		else 	
		{
			//确保相连同色星星列表不为空,代码才会向下执行
			if(this.starList.length <1){return;} 
			if( this.starList[0].count != target.count ) 
			{
				//第二次点击的不是上一次选择的星星,如果两次选择的星星类型不一致，则将列表中的星星type还原[后续]
				this.setStarListItemToNomal(this.starList);
				//寻找当前选中星星，相连在一起同色的星星[后续]
				this.findSameColorStar(target);
				Music.playClick();
			}
			else	
			{
				//第二次选中相连同色星星列表中的星星，则将其消除
				if( this.starList.length >1 )
				{
					this.firstTouchStar = null;
					//消除并获得积分[后续]
					this.getScore();
					//当消灭星星后,如果上方还有星星存在,则要重新设置他们的row值,用于向下移动星星[后续]
					this.resetStarRow();
					//播放消除时的音效
					Music.playBroken();
				}
			}
		}
	}
}