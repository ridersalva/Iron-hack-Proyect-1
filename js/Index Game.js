const gameIronHackDiver = {
    title: 'Iron Diver',
    author: 'Andre Documet & Salvador Rus',
    license: undefined,
    version: '1.0.0',
    canvasDom: undefined,
    ctx: undefined,
    fps: 60,
    framesCounter: 0,
    enemyLevel1: [],
    enemyLevel2:[],
  
   // keys: {
     // SPACE: 'enter'
    //},
    //backGround: [],
    //backGround: 0,
    player: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },




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
        setInterval(() => {
            //this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.clearAll()
            this.drawAll()
           
            // this.clearBackGround()


        }, 20)

    },
    reset() {
        this.backGround = new Background(this.ctx, 0, 20, this.canvasSize.w, this.canvasSize.h, this.canvasSize)
        this.createPlayer()
        this.createEnemy()
        console.log(this.backGround)
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
        const x = this.canvasSize.w - 130;
        const level1y = 600;
        const level2y = 300;
        const imgUrlA = `../img/enemy_level_1_A.png`
        const imgUrlB= `../img/enemy_level_1_A.png`
        this.enemyLevel1.push(new Enemy(this.ctx, x, level1y, 80, 130, imgUrlA, this.canvasSize))
        this.enemyLevel2.push(new Enemy(this.ctx, x, level2y, 80, 130, imgUrlB, this.canvasSize))

        // for(let i=0; i<2;i++){

        //     this.enemyLevel1.push(new Enemy(this.ctx, x, level1y, 80, 130, imgUrlA, this.canvasSize))
        //     this.enemyLevel2.push(new Enemy(this.ctx, x, level2y, 80, 130, imgUrlB, this.canvasSize))
        // }
    
        console.log(this.enemy)
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
