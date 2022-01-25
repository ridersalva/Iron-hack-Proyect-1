class Player {
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, gameSize, lifes) {
        this.ctx = ctx
        this.playerPos = { x: playerPosX, y: playerPosY }
        this.playerInitialPos = { x: playerPosX, y: 520 }
        this.playerSize = { w: playerWidth, h: playerHeight }
        // this.playerPhysics = { gravity: 0.3 }            // la velocidad de caida es constante
        this.playerVel = { x: 5, y: 1 }


        this.gameSize = gameSize
        this.imageInstance = undefined
        this.attackImageInstance = undefined
        this.attackOne = []             // ataque larga distancia
        this.attackTwo = false          // ataque a corta distancia
        this.lifes = lifes;

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

    }
    ///CREAR///
    draw() {
        !this.attackTwo ?
            this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
            :
            this.ctx.drawImage(this.attackImageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)

        this.dropDiver()

    }
    //DROP FOR DEFAULT
    dropDiver() {
        if (this.playerPos.y < this.playerInitialPos.y) {   // jugador encima de su posicion de inicio
            this.playerPos.y += this.playerVel.y;           // sumo velocidad constante para simular caida
            //this.playerVel.y += this.playerPhysics.gravity;
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
        // Antes : Codigo move() Mario
        // if(this.playerPos.y<this.playerInitialPos.y){
        //     this.playerPos.y-=this.playerVel.y
        //     this.playerVel.y+=this.gravity
        // }else{
        //     this.playerPos.y=this.playerInitialPos.y
        //     this.playerVel.y=1
        // }
        if (this.playerPos.y >= 0) {
            this.playerPos.y -= 50
        }
    }
    moveDown() {
        this.playerPos.y += 50
    }

    // Funcion jump: no es prioridad en el MVP
    // jump() {
    //     console.log("salto")
    //     if(this.playerPos.y===this.playerInitialPos.y){
    //         this.playerVel.y-=10 // 
    //         this.playerPos.y-=50
    //     }
    // }

    shoot() {
        this.attackOne.push(new AttackOne(this.ctx, this.playerPos.x + this.playerSize.w, this.playerPos.y + this.playerSize.h / 2, this.playerSize.w * .75, this.playerSize.h / 4, this.gameSize))
    }

    loseLife(){
        this.lifes--;
        //return this.lifes;
    }    

    // punch() {
    //     this.attackTwo = new AttackTwo(this.ctx, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h, this.gameSize)
    // }

    // clearPunch() {
    //     this.ctx.clearRect(0, 0, this.playerSize.w, this.playerSize.h)         // borra al jugador golpeando?
    // }

    clearAttackOne() {
        this.attackOne = this.attackOne.filter(elm => elm.attackOnePos.x <= this.gameSize.w)
    }
}

