class Player {
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, gameSize) {
        this.ctx = ctx
        this.playerPos = { x: playerPosX, y: playerPosY }
        this.playerInitialPos = { x: playerPosX, y: 520}
        this.playerSize = { w: playerWidth, h: playerHeight }
        this.playerPhysics = { gravity: 0.4 }
        this.playerVel = { x: 5, y: 10 }


        this.gameSize = gameSize
        this.imageInstance = undefined
        this.attackOne = []   // ataque larga distancia
        this.attackTwo = []

        //this.playerVelY = 0

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

        this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)

    }
    moveRight() {
        this.playerPos.x += 50
    }
    moveLeft() {
        this.playerPos.x -= 50
    }
    moveUp() {
        if(this.playerPos.y<this.playerInitialPos.y){
            this.playerPos.y-=this.playerVel.y
            this.playerVel.y+=this.gravity
        }else{
            this.playerPos.y=this.playerInitialPos.y
            this.playerVel.y=1
        }

    }
    moveDown() {
        this.playerPos.y += 50
    }

    jump() {
        console.log("salto")
if(this.playerPos.y===this.playerInitialPos.y){
    this.playerVel.y-=10
    this.playerPos.y-=200
}
        // this.playerPos.x += this.playerVel.x
        // this.playerVel.y += this.playerPhysics.gravity
        // this.playerPos.y += this.playerVel.y

        // if (this.playerPos.y < this.playerInitialPos.y) {   // Está saltando!
        //     this.playerPos.y -= this.playerVel.y;
        //     this.playerVel.y -= this.playerPhysics.gravity;
        // } else {
        //     this.playerPos.y = this.playerInitialPos.y;
        //     this.playerVel.y = 1;
        // }



    }

    shoot() {
        this.attackOne.push(new AttackOne(this.ctx, (this.playerPos.x + this.playerSize.w) / 2 + 150, this.playerPos.y + this.playerSize.h / 2, this.playerSize.w, this.playerSize.h, this.gameSize))
    }

    clearAttackOne() {
        this.attackOne = this.attackOne.filter(elm => elm.attackOnePos.x <= this.gameSize.w)
    }
}

