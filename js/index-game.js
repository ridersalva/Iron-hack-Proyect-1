const gameIronHackDiver = {
    title: 'Iron Diver',
    author: 'Andre Documet & Salvador Rus',
    license: undefined,
    version: '1.0.0',
    canvasDom: undefined,
    ctx: undefined,
    FPS: 60,
    framesCounter: 0,
    backGround: undefined,
    player: undefined,
    enemyLevel1:[],
    enemyLevel2:[],
    canvasSize: {
        w: undefined,
        h: undefined
    },
   // keys: {
     // SPACE: 'enter'
    //},
  

    //INICIALIZACION
    init() {
        this.canvasDom = document.getElementById(`canvasIronDiver`)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        //this.setEventListeners()
        this.start()
        this.setEventHandlers()

    },
    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },
    // setEventListeners() {
    //   document.onkeydown = e => e.code === this.keys.SPACE ? this.createBall() : null
    // },




    //START////

    start() {

        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            
            this.clearAll()
            this.drawAll()

            this.createEnemy()
            this.clearEnemy()
            // this.clearBackGround()
            this.isCollision() ? this.gameOver() : null

        }, 1000 / this.FPS)

    },
    reset() {
        this.backGround = new Background(this.ctx, 0, 20, this.canvasSize.w, this.canvasSize.h, this.canvasSize)
        this.createPlayer()
        //console.log(this.backGround)
    },//

    //CREAR//

    drawAll() {

        //this.token.draw()
        //this.createBackGround()
        this.backGround.draw()
        this.player.draw()
        this.enemyLevel1.forEach(elm => elm.draw())
        this.enemyLevel2.forEach(elm => elm.draw())
        console.log(`drawaallllalalalalalalala`)
        //   this.balls.forEach(elm => elm.draw())
    },

    createBackGround() {
        this.backGround = new Background(this.ctx, 0, 20, this.canvasSize, this.canvasSize, this.canvasSize)
        console.log(this.backGround)
    },
    createPlayer() {
        this.player = new Player(this.ctx, 20, 600, 100, 150, this.canvasSize)
        console.log(`buzo`)
    },

    createEnemy(){
        
        const imgUrlA = `../img/enemy_level_1_A.png`
        const imgUrlB = `../img/bg.png`

        const x = this.canvasSize.w - 130;
        const framesLimitLevel1 = (Math.floor(Math.random() * 10))*25;  
        const framesLimitLevel2 = (Math.floor(Math.random() * 10))*30;  
        
        if (this.framesCounter % framesLimitLevel1 === 0) {
            this.enemyLevel1.push(new Enemy(this.ctx, x, 600, 80, 130, imgUrlA, this.canvasSize,null,10))
        }

        if (this.framesCounter % framesLimitLevel2 === 0) {
            this.enemyLevel2.push(new Enemy(this.ctx, x, 300, 80, 130, imgUrlB, this.canvasSize,null,60))
        }

        // const level1y = 600;
        // const level2y = 300;
        // const imgUrlA = `../img/enemy_level_1_A.png`
        // const imgUrlB= `../img/enemy_level_1_A.png`
        // this.enemyLevel1.push(new Enemy(this.ctx, x, level1y, 80, 130, imgUrlA, this.canvasSize))
        // this.enemyLevel2.push(new Enemy(this.ctx, x, level2y, 80, 130, imgUrlB, this.canvasSize))
    },

    clearEnemy() {
        this.enemyLevel1 = this.enemyLevel1.filter(elm => elm.enemyPos.x >= 0)                // ?? no entiendo el posX
        this.enemyLevel2 = this.enemyLevel2.filter(elm => elm.enemyPos.x >= 0)
    },

    ////LIMPIAR//
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
        console.log(`clear`)
    },
    clearBackGround() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
        console.log(`clear2`)
    },

    isCollision() {
  
        const allEnemies = [...this.enemyLevel1, ...this.enemyLevel2];
        return allEnemies.some(elm => {
            return (
                this.player.playerPos.x + this.player.playerSize.w >= elm.enemyPos.x &&
                this.player.playerPos.y + this.player.playerSize.h >= elm.enemyPos.y &&
                this.player.playerPos.x <= elm.enemyPos.x + elm.enemySize.w &&
                this.player.playerPos.y <= elm.enemyPos.y + elm.enemySize.h
            )
        })
    },

    gameOver(){
        clearInterval(this.interval)
    },



    //EVENT
  //  setEventListeners() {
    //    document.onkeydown = e => e.code === this.keys.SPACE ? this.createEnemy() : null
//console.log(`BOTON`)
   // },
    ////MOVER
    setEventHandlers() {
        document.addEventListener(`keydown`, event => {
            const { key } = event
            console.log(key)
            key === `ArrowRight` ? this.player.moveRight() : null
            key === `ArrowLeft` ? this.player.moveLeft() : null
            key === `ArrowUp` ? this.player.moveUp() : null
            key === `ArrowDown` ? this.player.moveDown() : null
        })
    },
}
