星星消除层之——移动星星[向下和向左移动]
一、内容介绍：
前两讲分别讲解了星星消除层的初始化，排列布局，寻找相同类型的星星以及消除星星，可是你会发现消除后矩阵中间是空着的，上面的星星并没有掉下来，空列右边的
列并没有向左移动。这一讲我们就来实现星星的掉落和移动。这里的移动分为:
1、向下移动[掉落]。
2、向左移动[列]。

二、向下移动：
这里我们将移动方法checkTop()放在update()方法中，用帧来实现移动。
如图一所示，其中abc方块位于同一行，cdef方块位于同一列；现在假设方块d和空白处是被消除了，然后ef方块就要执行往下掉落的操作。
当方块d消除以后，由上一讲可以知道此时df在网格中的行数将减去1，而变成e(1,2),f(2,2);然后就要检测e的y坐标是否大于e方块的大小[宽，高]
与此时的行数的乘集（e.y > e.row*48)[这里的48为方块的宽度和高度],如果满足条件，则将e方块的y坐标减小[这里给的数据一定要是被48整除的数字比如4,8等]。
这里减小的数字的大小将决定移动的速度，数字越大移动越快，当e.y <= e.row*48时移动结束。f方块移动方法相同。
//检测被移除星星上方是否还有星星,如果有则下移
checkTop:function()
{
	//遍历所有行
	for(var i = 0; i < 10; i++)
	{
		//遍历所有列
		for(var j = 0; j < 10; j++)
		{
			//网格对象必须存在且类型有效
			if(this.starObjArr[i][j] !=null && this.starObjArr[i][j].type != -1)
			{
				//移动条件
				if(this.starObjArr[i][j].y > this.starObjArr[i][j].row*48)
				{
					//向下移动
					this.starObjArr[i][j].y -= 8;
				}
			}
		}
	}
}

三、向左移动：
水平向左移动的原理跟垂直方向的移动相似，这里不同的是在竖直方向移动结束后对列是否需要向左移动的一个判断[两列之间是否有空列],如果有空列则移动，否则不移动。
第一步：checkEmptyColums()检测两列之间是否有空列。
//检测空列
checkEmptyColums:function()
{
	//临时变量，记录是否有空列存在，默认为false
	var existEmptyCol = false;
	//遍历所有列
	for(var i = 0; i < 10; i++)
	{
		if( !existEmptyCol )
		{
			//只有在消灭星星后才能检测空列
			if(this.firstTouchStar == null)
			{
				//检测每一列，当列的最下面元素为空时,说明该列为空
				if(this.starObjArr[i][0] == null || this.starObjArr[i][0].type == -1)
				{
					existEmptyCol = true;
				}
			}
		}
		//当有空列时,处理列的移动和列[col]属性的设置
		else if( existEmptyCol )
		{ 
			//遍历空列右边每列中的行
			for(var j = 0; j < 10; j++)
			{
				if(this.starObjArr[i][j] != null )
				{
					//将其列属性[col减1]
					this.starObjArr[i][j].col--;
					this.starObjArr[i-1][j] = this.starObjArr[i][j];
					this.starObjArr[i][j] = null;
				}
			}
		}
	}
}

第二步：向左移动：
水平向左移动的原理跟垂直方向的移动相似，由检测方块y坐标和行与方块大小的乘积(y>row*48),变为检测x坐标和列与方块大小的乘积(col*48)。
//检测被移除星星上方是否还有星星,如果有则下移，检测是否有空列如果有则将右侧列向左移动
checkTop:function()
{
	//needMove控制向下和向左移动的顺序，当向下移动的动作完成后才将列向左移动
	var needMove = false;
	for( var i = 0; i < 10; i++ )
	{
		for( var j = 0; j < 10; j++ )
		{
			if( this.starObjArr[i][j] !=null && this.starObjArr[i][j].type != -1 )
			{
				//向下移动[移动条件]
				if( this.starObjArr[i][j].y > this.starObjArr[i][j].row*48 ) 
				{
					this.starObjArr[i][j].y -= 8;
					needMove = true;
				}
				//向左移动[移动条件]
				if( this.starObjArr[i][j].x > this.starObjArr[i][j].col*48 )
				{
					//列中所有项向左移动
					this.starObjArr[i][j].x -= 8;
					needMove = true;
				}
			}
		}
	}
	//当有星星向下移动时,不能移动列
	if( !needMove )
	{
		//检测是否有空列[两列之间的空列],如果有则把其右边的列向左移动
		this.checkEmptyColums();
	}
},



