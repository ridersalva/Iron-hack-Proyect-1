class Enemy {
    constructor(ctx, enemyPosX, enemyPosY, enemyWidth, enemyHeight, imgUrl, gameSize, keys) {
        this.ctx = ctx
        this.enemyPos = { x: enemyPosX, y: enemyPosY }
        this.enemySize = { w: enemyWidth, h: enemyHeight }
        this.imgUrl = imgUrl
        this.enemyVel = undefined
        this.enemyPhysics = { gravity: .4 }
        this.gameSize = gameSize
        this.imageInstance = undefined
        this.keys = keys
        this.attackOne = 0
        this.attackTwo = []
        this.enemyVelX = 10 
        //  this.imageInstance.frames=3
        //this.Image.frameIndex = 0
        this.init()
    }
    /////INICIOALIZAR//
    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = this.imgUrl

    }

    ///CREAR///
    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
        this.move()                

    }
    move() {                                            
        if (this.enemyPos.x <= -this.gameSize.w) {
            this.enemyPos.x = this.gameSize.w-130;
        }
        this.enemyPos.x -= this.enemyVelX;
    }
    checkCollision() { }
}