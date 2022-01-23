class AttackTwo {
    constructor(ctx, attackTwoPosX, attackTwoPosY, attackTwoWidth, attackTwoHeight, gameSize) {
        this.ctx = ctx
        this.attackTwoPos = { x: attackTwoPosX, y: attackTwoPosY }
        this.attackTwoSize = { w: attackTwoWidth, h: attackTwoHeight }
        this.attackTwoVel = undefined
        this.attackTwoPhysics = { gravity: .4 }
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
        this.ctx.drawImage(this.imageInstance, this.attackTwoPos.x, this.attackTwoPos.y, this.attackTwoSize.w, this.attackTwoSize.h)
    }
    move() { }
    checkCollision() { }
}

