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
    enemyLevel1: [],
    enemyLevel2: [],
    canvasSize: {
        w: undefined,
        h: undefined
    },
    keys: {
        SPACE: ` `,
        TOP: 'ArrowUp'
    },


    //INICIALIZACION
    init() {
        this.canvasDom = document.getElementById(`canvasIronDiver`)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.start()


    },
    setDimensions() {
        this.canvasSize.w = 1921            //window.innerWidth
        this.canvasSize.h = 974             //window.innerHeight
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },

    //START////

    start() {

        this.reset()
        this.setEventHandlers()
        this.interval = setInterval(() => {
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

            this.clearAll()

            this.drawAll()
            this.createEnemy()
            this.clearEnemy()
            this.player.clearAttackOne()
            this.player.clearPunch()
            this.ancherCollision()
            this.checkPlayerKilled() ? this.gameOver() : null

        }, 1000 / this.FPS)

    },
    reset() {
        this.backGround = new Background(this.ctx, 0, 20, this.canvasSize.w, this.canvasSize.h, this.canvasSize)
        this.createPlayer()
    },

    //CREAR//
    drawAll() {

        //this.token.draw()
        this.backGround.draw()
        //this.player.moveUp()
        this.player.draw()
        this.enemyLevel1.forEach(elm => elm.draw())
        this.enemyLevel2.forEach(elm => elm.draw())
        this.player.attackOne.forEach((elm) => {
            elm.draw()
        })

    },

    createPlayer() {
        this.player = new Player(this.ctx, 20, 520, 260, 420, this.canvasSize)
    },

    createEnemy() {

        const imgUrlA = `../img/enemy_level_1_A.png`
        const imgUrlB = `../img/enemy_level_2_A.png`

        const x = this.canvasSize.w - 130;
        const framesLimitLevel1A = (Math.floor(Math.random() * 10)) * 50;
        const framesLimitLevel2 = (Math.floor(Math.random() * 10)) * 50;

        if (this.framesCounter % framesLimitLevel1A === 0) {
            this.enemyLevel1.push(new Enemy(this.ctx, x, 600, 260 * .80, 420 * .8, imgUrlA, this.canvasSize, null, 5))
        }

        if (this.framesCounter % framesLimitLevel2 === 0) {
            this.enemyLevel2.push(new Enemy(this.ctx, x, 200, 284, 189, imgUrlB, this.canvasSize, null, 7))
        }

    },

    clearEnemy() {
        this.enemyLevel1 = this.enemyLevel1.filter(elm => elm.enemyPos.x + elm.enemySize.w >= 0)
        this.enemyLevel2 = this.enemyLevel2.filter(elm => elm.enemyPos.x + elm.enemySize.w >= 0)
    },

    ////LIMPIAR//
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    clearBackGround() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    // ancherCollision() {
    //     this.enemyLevel1.forEach((enemy, i) => {
    //         this.player.attackOne.forEach((ancher, j) => {
    //             if (
    //                 ancher.attackOnePos.x + ancher.attackOneSize.w >= enemy.enemyPos.x &&
    //                 ancher.attackOnePos.y + ancher.attackOneSize.h >= enemy.enemyPos.y &&
    //                 ancher.attackOnePos.x <= enemy.enemyPos.x + enemy.enemySize.w &&
    //                 ancher.attackOnePos.y <= enemy.enemyPos.y + enemy.enemySize.h
    //             ) {
    //                 console.log('COLISION')
    //                 this.enemyLevel1.splice(i, 1)
    //                 this.player.attackOne.splice(j, 1)
    //             }
    //         })
    //     })

    //     this.enemyLevel2.forEach((enemy, i) => {
    //         this.player.attackOne.forEach((ancher, j) => {
    //             if (
    //                 ancher.attackOnePos.x + ancher.attackOneSize.w >= enemy.enemyPos.x &&
    //                 ancher.attackOnePos.y + ancher.attackOneSize.h >= enemy.enemyPos.y &&
    //                 ancher.attackOnePos.x <= enemy.enemyPos.x + enemy.enemySize.w &&
    //                 ancher.attackOnePos.y <= enemy.enemyPos.y + enemy.enemySize.h
    //             ) {
    //                 console.log('COLISION')
    //                 this.enemyLevel2.splice(i, 1)
    //                 this.player.attackOne.splice(j, 1)
    //             }
    //         })
    //     })
    // },

  

    checkAncherCollision(enemies) {
        enemies.forEach((enemy, i) => {
            this.player.attackOne.forEach((ancher, j) => {
                if (
                    ancher.attackOnePos.x + ancher.attackOneSize.w >= enemy.enemyPos.x &&
                    ancher.attackOnePos.y + ancher.attackOneSize.h >= enemy.enemyPos.y &&
                    ancher.attackOnePos.x <= enemy.enemyPos.x + enemy.enemySize.w &&
                    ancher.attackOnePos.y <= enemy.enemyPos.y + enemy.enemySize.h
                ) {
                    console.log('COLISION')
                    enemies.splice(i, 1)
                    this.player.attackOne.splice(j, 1)
                }
            })
        })
    },
    ancherCollision() {
        this.checkAncherCollision(this.enemyLevel1)
        this.checkAncherCollision(this.enemyLevel2)
    },

    checkPlayerKilled() { // revisar ver que pueda colisionar. 1. Quién ha colisionado | 2. Con qué | 3. Qué hace cuando colisiona

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

    

    gameOver() {
        clearInterval(this.interval)
    },

    ////MOVER
    setEventHandlers() {
        document.addEventListener(`keydown`, event => {
            const { key } = event
            key === `ArrowRight` ? this.player.moveRight() : null
            key === `ArrowLeft` ? this.player.moveLeft() : null
            key === `ArrowUp` ?//&& (this.player.playerPos.y + this.player.playerSize.h === 
                //this.player.playerInitialPos.y + this.player.playerSize.h) ? 
                this.player.moveUp() : null
            key === `ArrowDown` ? this.player.moveDown() : null
            key === ` ` ? this.player.shoot() : null
           // key===`w`?this.player.punch():null
        })

    },
}
