class AttacOne {
    constructor(ctx, attackOnePosX, attackOnePosY, attackOneWidth, attackOneHeight, gameSize) {
        this.ctx = ctx
        this.attackOnePos = { x: attackOnePosX, y: attackOnePosY }
        this.attackOneSize = { w: attackOneWidth, h: attackOneHeight }
        this.attackOneVel = undefined
        this.attackOnePhysics = { gravity: .4 }
        this.gameSize = gameSize
        this.imageInstance = undefined
        this.init()
    }
    init() {
        this.imageInstance = new Image()
        //cambiar a la imagen   this.imageInstance.src = `img/principal1.png`
    }
    draw() {
        this.move()
        this.ctx.drawImage(this.imageInstance, this.attackOnePos.x, this.attackOnePos.y, this.attackOneSize.w, this.attackOneSize.h)
    }
    move() { }
    checkCollision() { }
}