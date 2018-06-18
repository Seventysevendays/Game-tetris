var oShow = document.getElementsByClassName('show');
var timer = null;
function Game(){
    this.scoreNum = 0;
    this.f = 0;
    this.range = 25;
    this.base = 1;
    this.b = new Block(this);
    this.m = new Map(this);
    var self = this;
    this.init();
    start.addEventListener('click',function(e){ 
        // e.preventDefalt();
        oShow[1].style.display = "none";
        for(var i = 0; i < 20; i ++){
            for(var j = 0; j < 12; j ++){
                self.setClass(i , j , '');
                self.m.map[i][j + 5] = 0;
            }
        }
        self.range = 25;
        self.base = 1;
        self.scoreNum = 0;             
        self.start();
        paused.style.display = "block";
        score.style.display = "block";   
    })
    paused.addEventListener('click',function(){
        clearInterval(timer);
        oShow[0].style.display = 'block';
        bgm.pause();
    })
    goon.addEventListener('click',function(){        
        self.start();
        oShow[0].style.display = 'none'; 
        bgm.paly();
    })
    restart.addEventListener('click',function(){ 
        self.range = 25;
        self.base = 1;
        self.scoreNum = 0; 
        oShow[1].style.display = "none";                             
        self.start();
    })
}             


Game.prototype.init = function(){//创建表格
    var oDiv = document.getElementsByClassName('wrapper')[0];
    this.dom = document.createElement('table');
    oDiv.appendChild(this.dom);
    for(var i = 0;i < 20; i ++){
        var tr = document.createElement('tr');
        for(var j = 0;j < 12 ; j ++){
            var td = document.createElement('td');
            tr.appendChild(td);
        }
        this.dom.appendChild(tr);
    }
}

Game.prototype.setClass = function(row, col, className){//染色
    this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].className = className;//** 
}

Game.prototype.start = function(){
    bgm.load();
    bgm.play();
    clearInterval(timer);
    var _this = this;
    scoreChange.innerHTML = self.scoreNum;   
    timer = setInterval(function(){
        _this.f++;
        _this.m.clear();
        if(_this.scoreNum > 20 * _this.base && _this.scoreNum > 0){
            _this.base ++;
            if(_this.range > 2){
                _this.range -= 2;
            }else{
                _this.range = 2;
            }
        }
        console.log(_this.range);
        if(_this.f % _this.range == 0){
            if(_this.canDown()){
                _this.b.update();
            }else{    
                _this.died();                
                _this.b = new Block(_this);//技巧
            }
        }
        _this.bindEvent();                      
        _this.shadow();                              
        _this.disppear();
        _this.b.render();                
        _this.m.render();
        _this.over();
    },20)
}

Game.prototype.died = function(){//把不能移动的方块给map
    for(var i = 0; i < 4; i ++){
        for(var j = 0; j < 4; j ++){
            if(this.b.typeCode[i][j] != 0){
                this.m.map[this.b.row + i][this.b.col + j + 5] = this.b.typeCode[i][j]; 
            }                       
        }
    }
}

Game.prototype.canDown = function(){//能否下落
    for(var i = 0; i < 4; i ++){
        for(var j = 0; j <4; j ++){
            if(this.b.typeCode[i][j] != 0 && this.m.map[this.b.row + i + 1][this.b.col + j + 5] != 0){
                return false;
            }
        }
    }
    return true;
}

Game.prototype.canLeft = function(){//能否向左
    // console.log(this.b.col,this.b.typeCode);  
     for(var i = 0; i < 4; i ++){
         for(var j = 0; j <4; j ++){
             if(this.b.typeCode[i][j] != 0 && this.m.map[this.b.row + i][this.b.col + j + 4] != 0){
                 return false;
             }
         }
     }
     return true;
}

Game.prototype.canRight = function(){//能否向右
    for(var i = 0; i < 4; i ++){
        for(var j = 0; j <4; j ++){
            if(this.b.typeCode[i][j] != 0 && this.m.map[this.b.row + i][this.b.col + j + 6] != 0){
                return false;
            }
        }
    }
    return true;
}

Game.prototype.canRotate = function(){//能否旋转
    var direction = this.b.direction;
    direction ++;
    if(direction == this.b.typeLength){
        direction = 0;
    }
    var code = blocktypes[this.b.typeShape][direction];    
    for(var i = 0; i < 4; i ++){
        for(var j = 0; j < 4; j ++){
            if(code[i][j] != 0 && this.m.map[this.b.row + i][this.b.col + j + 5] != 0){
                return false;
            }
        }
    }
    return true;
}

Game.prototype.over = function(){//gameover  
    if(this.b.row == 0 && !this.canDown()){
        for(var i = 0; i < 20; i ++){
            for(var j = 0; j < 12; j ++){
                this.setClass(i , j , '');
                this.m.map[i][j + 5] = 0;
            }
        }
        overScore.innerHTML = this.scoreNum;
        this.scoreNum = 0;
        scoreChange.innerHTML = this.scoreNum;           
        oShow[1].style.display = "block";
        clearInterval(timer);
    }
    
}

Game.prototype.bindEvent = function(){//键盘控制
    var _this = this;
    window.onkeydown = function(e){
        if(e.keyCode == 37 && _this.canLeft()){
            anjian.load();
            anjian.play();
            _this.b.col --;             
        }else if(e.keyCode == 39 && _this.canRight()){
            anjian.load();
            anjian.play();
            _this.b.col ++;
        }else if(e.keyCode == 40){
            anjian.load();
            anjian.play();
            while(_this.canDown()){//技巧
                _this.b.row ++;
            }
        }else if(e.keyCode == 38  && _this.canRotate()){       
            _this.b.direction ++;
            if(_this.b.direction == _this.b.typeLength){
                _this.b.direction = 0;
            }
            var shape = _this.b.typeShape;
            _this.b.typeCode = blocktypes[shape][_this.b.direction];
            anjian.load();
            anjian.play();           
        }
    }   
}

Game.prototype.shadow = function(){
    for(var i = 0; i < 12; i ++){
        document.getElementsByTagName('tr')[19].getElementsByTagName('td')[i].style.borderBottom = '#333';
    }
    for(var i = 0; i < 4; i ++){
        for(var j = 0; j < 4; j ++){
            if(this.b.typeCode[i][j] != 0 && this.canDown()){
                document.getElementsByTagName('tr')[19].getElementsByTagName('td')[j + this.b.col].style.borderBottom = '5px solid yellow';
            }
        }
    }
}

Game.prototype.disppear = function(){//消行
    for(var i = 0; i < 20; i ++){
        if(this.m.map[i].indexOf(0) == -1){
            this.scoreNum += parseInt(Math.random() * 20);
            this.m.map.splice(i , 1);
            this.m.map.unshift( [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1]);
            xiaohang.load();
            xiaohang.play();
        }
    }
    scoreChange.innerHTML = this.scoreNum; 
    if((this.scoreNum + '').length == 3){
        score.style.fontSize = '20px';
    }   
}