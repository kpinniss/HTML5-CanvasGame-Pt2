class GameArea{
    constructor(w,h,color){
        this.canvas = document.createElement("canvas");
        this.canvas.width = w;
        this.canvas.height = h;
        this.canvas.style.backgroundColor = color;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

}

class GameObject{
    constructor(width, height, color, x ,y, gameArea){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
    this.gameArea = gameArea;    
    this.ctx = gameArea.context;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
}

}

class Game{
    constructor(gameArea, gameobject, enemies){
        this.gameArea = gameArea;
        this.gameobject = gameobject;
        this.enemies = enemies;
        console.log(this.gameobject);
        setInterval((update)=>{this.update();}, 20);
        document.addEventListener('keydown', (event)=>{
        this.playerController();
        });
    }

    update(){
        //update game area
        this.gameArea.context.clearRect(0, 0, this.gameArea.canvas.width, this.gameArea.canvas.height);
        //update player
        this.gameobject.ctx = this.gameArea.context;
        this.gameobject.ctx.fillStyle = this.gameobject.color;
        this.gameobject.ctx.fillRect(this.gameobject.x, this.gameobject.y, this.gameobject.width, this.gameobject.height);
        //update senemy
        for(var i =0; i < this.enemies.length; i++){
            var enemy = this.enemies[i];
            enemy.ctx = this.gameArea.context;
            enemy.ctx.fillStyle = enemy.color;
            enemy.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            this.checkGameArea();
            this.checkForenemy(this.gameobject,enemy);
            this.enemeyMovment(enemy);
        }
       
    }
    //check for game area border
    checkGameArea(){
        if(this.gameobject.x >= this.gameArea.canvas.width - this.gameobject.width){
            this.gameobject.x = this.gameArea.canvas.width - this.gameobject.width;
        }
        if(this.gameobject.y >= this.gameArea.canvas.height - this.gameobject.height){
            this.gameobject.y = this.gameArea.canvas.height - this.gameobject.height;
        }
        if(this.gameobject.x <= 0){
            this.gameobject.x = 0;
        }
        if(this.gameobject.y <= 0){
            this.gameobject.y = 0;
        }
    }

    enemeyMovment(enemy){
        var speed = Math.floor(Math.random() * 5 + 1)
        enemy.x += speed;
        if(enemy.x >= this.gameArea.canvas.width - enemy.width){
            enemy.x = 0;
        }
    }

    //check for enemy collsion
    checkForenemy(player,enemy){
        var space = 30;
        var rangeStartY = enemy.y - enemy.height;
        var rangeEndY = enemy.y + enemy.height
        var enemyAreaY = this.getRange(rangeStartY,rangeEndY);
        var rangeStartX = enemy.x - enemy.width;
        var rangeEndX = enemy.x + enemy.width;
        var enemyAreaX = this.getRange(rangeStartX,rangeEndX);
        
       if(player.x == enemy.x - player.width && enemyAreaY.indexOf(player.y) !== -1){
           player.x -= space;
       }
       if(player.x == enemy.x + player.width && enemyAreaY.indexOf(player.y) !== -1){
        player.x += space;
       }
       if(player.y == enemy.y + player.height && enemyAreaX.indexOf(player.x) !== -1){
        player.y += space;
       }
       if(player.y == enemy.y - player.height && enemyAreaX.indexOf(player.x) !== -1){
        player.y -= space;
       }

    }

    getRange(start, end)
    {
        var numbers = [];
        for (; start <= end; start++)
        {
            numbers.push(start);
        }
        return numbers;
    }
    //player controlls
    playerController(){
    if (event.keyCode == 37 || event.keyCode == 65) {
        this.gameobject.x -= 10;
        console.log(this.gameobject.x);
    }
    else if (event.keyCode == 38 || event.keyCode == 87) {
        this.gameobject.y -= 10;
    }
    else if (event.keyCode == 39 || event.keyCode == 68) {
        this.gameobject.x += 10;
    }
    else if (event.keyCode == 40 || event.keyCode == 83) {
        this.gameobject.y += 10;
    }
    }
}
//enemy class 
class Enemy extends GameObject{
    constructor(width, height, color, x ,y, gameArea){
        super(width, height, color, x ,y, gameArea);
        this.ctx = gameArea.context;
        this.ctx.fillStyle = color;
        this.color = color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


function startGame(){
    
   var gameArea = new GameArea(550, 350,"lightBlue");
   var player = new GameObject(50,50,"blue",20,20,gameArea);

   var enemy1 = new Enemy(50,50,"red",70,70,gameArea);
   var enemy2 = new Enemy(50,50,"yellow",34,88,gameArea);
   var enemy3 = new Enemy(50,50,"green",100,100,gameArea);
   var enemy4 = new Enemy(50,50,"pink",2,50,gameArea);
   var enemy5 = new Enemy(50,50,"orange",30,111,gameArea);
   var enemies = [enemy1, enemy2, enemy3,enemy4,enemy5];
   var game = new Game(gameArea, player,enemies);
}



