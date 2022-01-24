class AttackOne {   // larga distancia
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, gameSize) {
        this.ctx = ctx
        this.attackOnePos = { x: playerPosX, y: playerPosY }
        this.attackOneSize = { w: playerWidth, h: playerHeight }
       
        //this.attackOnePhysics = { gravity: .4 }
        this.gameSize = gameSize
        this.imageInstance = undefined
        this.radius = 10
        this.attackOneVelX = 10

        this.init()
    }
    init() {
        this.draw()
        //this.imageInstance = new Image()
        //this.imageInstance.src = `img/fondo.png`
    }
    draw() { 
        //this.ctx.drawImage(this.imageInstance, this.attackOnePos.x, this.attackOnePos.y, this.attackOneSize.w, this.attackOneSize.h)
        
        this.ctx.beginPath();
        this.ctx.fillStyle = "yellow";
        this.ctx.arc(this.attackOnePos.x,this.attackOnePos.y, this.radius,0, Math.PI*2)
        this.ctx.fill();
        this.ctx.closePath();
        
        this.move()
    }

    move() { 
        this.attackOnePos.x += this.attackOneVelX
        
    }
    checkCollision() { }
}