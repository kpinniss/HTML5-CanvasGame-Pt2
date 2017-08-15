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
    constructor(gameArea, gameobject, enemy){
        this.gameArea = gameArea;
        this.gameobject = gameobject;
        this.enemy = enemy;
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
        this.enemy.ctx = this.gameArea.context;
        this.enemy.ctx.fillStyle = this.enemy.color;
        this.enemy.ctx.fillRect(this.enemy.x, this.enemy.y, this.enemy.width, this.enemy.height);
        this.checkGameArea();
    }

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
    //check for enemy collsion
    checkForenemy(){
        
    }

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

   var enemy = new Enemy(50,50,"red",70,20,gameArea);
   
   console.log(enemy);
   var game = new Game(gameArea, player,enemy);
}



