class Player {
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, gameSize, keys) {
        this.ctx = ctx
        this.playerPos = { x: playerPosX, y: playerPosY }
        this.playerSize = { w: playerWidth, h: playerHeight }
        this.playerVel = undefined
        this.playerPhysics = { gravity: .4 }
        this.gameSize = gameSize
        this.imageInstance = undefined
        this.keys = keys
        this.attackOne = 0
        this.attackTwo = []
        
        //  this.imageInstance.frames=3
        //this.Image.frameIndex = 0
        // this.playerPos.x = 0// Por comentar, se puede colocar el dato en la instancia de game
        // this.playerSize.w = 80*2
        // this.playerSize.h = 130*2
        // this.playerPos.y = 0
        this.init()
    }
    /////INICIOALIZAR//
    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `../img/player1.png`

    }

    ///CREAR///
    draw() {
        // this.move()
        this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)

    }
    moveRight() {
        this.playerPos.x += 4
    }
    moveLeft() {
        this.playerPos.x -= 4
    }
    moveUp() {
        this.playerPos.y -= 4
    }
    moveDown() {
        this.playerPos.y += 4
    }
    checkCollision() { }
}