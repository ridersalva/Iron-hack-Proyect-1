class Player {
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, gameSize, lifes) {
        this.ctx = ctx
        this.playerPos = { x: playerPosX, y: playerPosY }
        this.playerInitialPos = { x: playerPosX, y: 520 * 1.8  }
        this.playerSize = { w: playerWidth, h: playerHeight }
           // la velocidad de caida es constante
        this.playerVel = { x: 5, y: 1 }


        this.gameSize = gameSize
        this.imageInstance = undefined
        this.attackImageInstance = undefined
        this.jumpImageInstance=undefined
        this.attackOne = [] 
        this.canShoot = true;            // ataque larga distancia
        this.attackTwo = false          // ataque a corta distancia
        this.lifes = lifes;
        this.isMovingUp = false 

        //  this.imageInstance.frames=3
        //this.Image.frameIndex = 0

        this.init()
    }
    /////INICIALIZAR//
    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `../img/player1.png`
        this.attackImageInstance = new Image()
        this.attackImageInstance.src = '../img/punch.png'
        this.jumpImageInstance = new Image()
        this.jumpImageInstance.src = `../img/jump.png`

    }
    ///CREAR///
    draw() {
        if (!this.attackTwo && !this.isMovingUp) {
            this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        } else if (this.attackTwo) {
            this.ctx.drawImage(this.attackImageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        } else if (this.isMovingUp) {
            this.ctx.drawImage(this.jumpImageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        }
        this.dropDiver()

    }
    //DROP FOR DEFAULT
    dropDiver() {
        if (this.playerPos.y < this.playerInitialPos.y) {   // player on top from its initial position
            this.playerPos.y += this.playerVel.y;           // SUM velocity for a constant drop
        } else {
            this.playerPos.y = this.playerInitialPos.y;
            this.playerVel.y = 1;
        }
    }
    //MOVES inside the SCREEN
    moveRight() {
        if (this.playerPos.x + this.playerSize.w < this.gameSize.w) {
            this.playerPos.x += 50
        }
    }
    moveLeft() {
        if (this.playerPos.x >= 0) {
            this.playerPos.x -= 50
        }
    }
    moveUp() {
        if (this.playerPos.y >= 0) {
            this.playerPos.y -= 50
        }
    }
    moveDown() {
        this.playerPos.y += 50
    }

    shoot() {
        this.attackOne.push(new AttackOne(this.ctx, this.playerPos.x + this.playerSize.w, this.playerPos.y + this.playerSize.h / 2, this.playerSize.w * .75, this.playerSize.h / 4, this.gameSize))
    }

    loseLife(){
        this.lifes--;
        //return this.lifes;
    }    

    clearAttackOne() {
        this.attackOne = this.attackOne.filter(elm => elm.attackOnePos.x <= this.gameSize.w)
    }
}

