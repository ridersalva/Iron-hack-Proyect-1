class attackTwo {   // ataque de corta distancia
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, gameSize) {
        this.ctx = ctx
        this.attackTwoPos = { x: playerPosX, y: playerPosY }
        this.attackTwoSize = { w: playerWidth, h: playerHeight }
        this.gameSize = gameSize
        this.imageInstance = undefined
    
        this.init()
    }
    init() {

        this.imageInstance = new Image()
        this.imageInstance.src = `../img/punch.png`
        this.draw()
    }
    draw() {

        this.ctx.drawImage(this.imageInstance, this.attackTwoPos.x, this.attackTwoPos.y, this.attackTwoSize.w, this.attackTwoSize.h)

        // Pelotita amarilla
        // this.ctx.beginPath();
        // this.ctx.fillStyle = "yellow";
        // this.ctx.arc(this.attackOnePos.x,this.attackOnePos.y, this.radius,0, Math.PI*2)
        // this.ctx.fill();
        // this.ctx.closePath();

        //this.move()
    }

    // move() {
    //     this.attackTwoPos.x += this.attackTwoVelX
    // }
}