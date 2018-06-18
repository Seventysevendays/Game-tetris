function Block(game){
    var typeArr = ['L','J','S','Z','T','O','I'];
    this.typeNum = parseInt(Math.random() * typeArr.length);//形状号
    this.typeShape = typeArr[this.typeNum];//形状
    this.typeLength = blocktypes[this.typeShape].length;//形状形态号
    this.direction = parseInt(this.typeLength * Math.random());//形状形态号
    this.typeCode = blocktypes[this.typeShape][this.direction];//形状码
    this.game = game;
    this.row = 0;
    this.col = 4;
}
Block.prototype.render = function(){//上色
    for(var i = 0; i < 4; i ++){
        for(var j = 0; j < 4; j ++){
            var m = this.typeCode[i][j];
            if(m != 0){//** 
                this.game.setClass(i + this.row, j + this.col, "c" + m);
            }
        }
    }
}
Block.prototype.update = function(){//运动
    this.row ++;
}
