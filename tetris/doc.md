> DIR
> LEFT TOP RIGHT BOTTOM

> SHAPES

shapeStatus 0 -> 3

I J L O S T Z

picture
https://codegolf.stackexchange.com/questions/90255/given-a-list-of-tetris-moves-return-the-number-of-completed-lines

每一个层次的操作状态设置的时候需要注意一下边界条件，比如，要更新的坐标必须为有效值。

Block
每一个形状用一个二维数组表示，数组中的值为 1 或者 0，1 代表有值，0 代表没有值。

Shape
游戏中具体的形状，I O T L J Z S，在代码中以单列呈现。

Points
每一个 Shape 在面板中用一系列 points 表示，其中，每个 point 通过 shape 和 当前的横纵坐标计算得到。
transform 更新 point 的值
updateVertical 纵坐标更新
updateHorizontal 横坐标更新
addUp 向上移动
addDown 向下移动
addLeft 向左移动
addRight 向左移动
getLeftmostSide 获取最左边的点
getRightmostSide 获取最右边的点
getBottommostSide 获取最下边的点
transpose 将当前的 points 顺时针旋转 90 度

Positions
游戏面板中每一个点的抽象表示，每个 position 的 left 在 0 和 最大列数之间，top 在 0 和 最大行数之间。position 和 point 是一一对应的
updateFlag 更新相应 positions 的  flag
getFlaggedLines 获取所有 flagged 的行，返回对应 flag 的 position
getFlaged 根据对应的 positions 获取 flags
hasFlagged 判断 flags 中是否有 flagged

Flag
flagged
unFlagged
isFlagged

行为
变换：以当前形状的坐标为原点，将当前的形状顺时针旋转 90 度。

BLOCK
每一个 block 用一组 points 表示，其中 point 表示 对应  shape 中每一点的具体坐标。block 还具有 宽度 和 高度

CELLS
全局单元格用二维数组表示，每一个 cell 用数组的横坐标和纵坐标表示
