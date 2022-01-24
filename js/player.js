class Player {
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, gameSize) {
        this.ctx = ctx
        this.playerPos = { x: playerPosX, y: playerPosY }
        this.playerInitialPos = { x: playerPosX, y: playerPosY }
        this.playerSize = { w: playerWidth, h: playerHeight }
        this.playerVel = undefined
        this.playerPhysics = { gravity: .4 }
        this.gameSize = gameSize
        this.imageInstance = undefined
        this.attackOne = []   // ataque larga distancia
        this.attackTwo = []
        this.playerVelY = 10
        this.gravity = 0.4

        //  this.imageInstance.frames=3
        //this.Image.frameIndex = 0

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
        this.playerPos.x += 50
    }
    moveLeft() {
        this.playerPos.x -= 50
    }
    moveUp() {
        this.playerPos.y -= 50
    }
    moveDown() {
        this.playerPos.y += 50
    }

    jump() {
        this.playerPos.y -= 380
        this.playerVelY -= 30
    }

    shoot() {
        this.attackOne.push(new AttackOne(this.ctx, (this.playerPos.x + this.playerSize.w) / 2 + 150, this.playerPos.y + this.playerSize.h / 2, this.playerSize.w, this.playerSize.h, this.gameSize))
    }

    clearAttackOne() {
        console.log(this.attackOne)
        this.attackOne = this.attackOne.filter(elm => elm.attackOnePos.x <= this.gameSize.w)
    }
}

