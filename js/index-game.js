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
    decoration: undefined,
    decoration2: undefined,
    player: undefined,
    enemyLevel1: [],
    enemyLevel2: [],
    plant: [],
    plant2: [],
    canvasSize: {
        w: undefined,
        h: undefined
    },
    playerLifes: 3,
    score: 0,


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
            this.createPlant()
            this.clearEnemy()
            this.player.clearAttackOne()
            this.createPlant2()
            this.ancherCollision()
            this.punchCollision()
            if (this.checkPlayerDamaged()) {
                // this.playerLifes = this.player.loseLife();
                this.player.loseLife();
                this.playerLifes = this.player.lifes
                this.gameOver();
            }
            this.clearPlant()
            this.clearPlant2()
        }, 1000 / this.FPS)

    },

    reset() {

        this.backGround = new Background(this.ctx, 0, 20, this.canvasSize.w, this.canvasSize.h, this.canvasSize)
        this.createPlayer()
        setTimeout(() => {
            clearInterval(this.interval)
            alert('GAME OVER')
        }, 10000)               // ver el tiempo de duración del juego
    },

    //CREAR//
    drawAll() {

        this.backGround.draw()
        this.plant.forEach(elm => elm.draw())
        this.player.draw()
        this.enemyLevel1.forEach(elm => elm.draw())
        this.enemyLevel2.forEach(elm => elm.draw())
        this.player.attackOne.forEach((elm) => {
            elm.draw()
        })
        this.plant2.forEach(elm => elm.draw())
        //this.drawText("Vidas")
        this.drawScore()
        this.drawLifeBar()

    },

    createPlayer() {
        this.player = new Player(this.ctx, 20, 520, 260, 420, this.canvasSize, this.playerLifes)
    },

    createEnemy() {

        const imgUrlA = `../img/enemy_level_1_A.png`
        const imgUrlB = `../img/enemy_level_2_A.png`

        const x = this.canvasSize.w - 130;
        const framesLimitLevel1A = (Math.floor(Math.random() * 10)) * 50;
        const framesLimitLevel2 = (Math.floor(Math.random() * 10)) * 50;

        if (this.framesCounter % framesLimitLevel1A === 0) {
            this.enemyLevel1.push(new Enemy(this.ctx, x, 600, 260 * .80, 420 * .8, imgUrlA, this.canvasSize, null, 3))
        }
        if (this.framesCounter % framesLimitLevel1A === 0) {
            this.enemyLevel1.push(new Enemy(this.ctx, x, 520, 260 * .80, 420 * .8, imgUrlA, this.canvasSize, null, 5))
        }

        if (this.framesCounter % framesLimitLevel2 === 0) {
            this.enemyLevel2.push(new Enemy(this.ctx, x, 200, 284, 189, imgUrlB, this.canvasSize, null, 7))
        }

    },
    createPlant() {

        const x = this.canvasSize.w;
        const framesplantA = (Math.floor(Math.random() * 10)) * 30;



        if (this.framesCounter % framesplantA === 0) {
            this.plant2.push(new Decoration(this.ctx, x, 550, 50, 70, this.canvasSize, 4))
        }

    },
    createPlant2() {

        const x = this.canvasSize.w;
        const framesplantA = (Math.floor(Math.random() * 10)) * 30;

        if (this.framesCounter % framesplantA === 0) {
            this.plant2.push(new Decoration(this.ctx, x, 565, 80, 100, this.canvasSize, 6))
        }

        if (this.framesCounter % framesplantA === 0) {
            this.plant.push(new Decoration(this.ctx, x, 500, 170, 270, this.canvasSize, 8))
        }



    },
    clearPlant() {
        this.plant = this.plant.filter(elm => elm.plant.x + elm.plantSize.w >= 0)

    },
    clearPlant2() {
        this.plant2 = this.plant2.filter(elm => elm.plant2.x + elm.plant2Size.w >= 0)

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


    //COLISIONES
    ancherCollision() {
        this.checkAncherCollision(this.enemyLevel1)
        this.checkAncherCollision(this.enemyLevel2)
    },
    //COLISIONES CON ANCLA
    checkAncherCollision(enemies) {
        enemies.forEach((enemy, i) => {
            this.player.attackOne.forEach((ancher, j) => {
                if (
                    ancher.attackOnePos.x + ancher.attackOneSize.w >= enemy.enemyPos.x &&
                    ancher.attackOnePos.y + ancher.attackOneSize.h >= enemy.enemyPos.y &&
                    ancher.attackOnePos.x <= enemy.enemyPos.x + enemy.enemySize.w &&
                    ancher.attackOnePos.y <= enemy.enemyPos.y + enemy.enemySize.h
                ) {
                    enemies.splice(i, 1)
                    this.player.attackOne.splice(j, 1)
                    this.score += 10
                }
            })
        })
    },

    punchCollision() {
        this.checkPunchCollision(this.enemyLevel1)
        this.checkPunchCollision(this.enemyLevel2)

    },

    //COLISIONES CON GOLPE DE CERCA
    checkPunchCollision(enemies) {
        if (this.player.attackTwo === true) {
            enemies.forEach((enemy, i) => {
                if (
                    this.player.playerPos.x + this.player.playerSize.w >= enemy.enemyPos.x &&
                    this.player.playerPos.y + this.player.playerSize.h >= enemy.enemyPos.y &&
                    this.player.playerPos.x <= enemy.enemyPos.x + enemy.enemySize.w &&
                    this.player.playerPos.y <= enemy.enemyPos.y + enemy.enemySize.h
                ) {
                    enemies.splice(i, 1)
                    this.score += 30
                    console.log('COLISION')
                }
            });
        }
    },

    //COLISIONES PARA GAME OVER
    checkPlayerDamaged() { //  Falta definir qué hace cuando colisiona ???
        const allEnemies = [...this.enemyLevel1, ...this.enemyLevel2];
        let hitPlayer = false;

        return allEnemies.some(elm => {
            if (
                this.player.playerPos.x + this.player.playerSize.w >= elm.enemyPos.x &&
                this.player.playerPos.y + this.player.playerSize.h >= elm.enemyPos.y &&
                this.player.playerPos.x <= elm.enemyPos.x + elm.enemySize.w &&
                this.player.playerPos.y <= elm.enemyPos.y + elm.enemySize.h &&
                elm.hitPlayer !== true
            ) {
                hitPlayer = true;
                elm.hitPlayer = true;
            }

            return hitPlayer

        })
    },

    gameOver() {
        if (this.playerLifes === 0) {
            this.drawLifeBar()
            clearInterval(this.interval)
        }
    },

    ////MOVER
    setEventHandlers() {
        document.addEventListener(`keydown`, event => {
            const { key } = event
            key === `ArrowRight` ? this.player.moveRight() : null
            key === `ArrowLeft` ? this.player.moveLeft() : null
            key === `ArrowUp` ? this.player.moveUp() : null
            key === `ArrowDown` ? this.player.moveDown() : null
            key === ` ` ? this.player.shoot() : null
            if (key === `w` && this.player.attackTwo === false) {
                this.player.attackTwo = true
                setTimeout(() => {
                    this.player.attackTwo = false
                }, 200)
            }

        })

    },
    drawLifeBar() {
        const lifeWidth = 100;
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(this.canvasSize.w - 1800, this.canvasSize.h - 950, lifeWidth * 3, 80)
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.canvasSize.w - 1800, this.canvasSize.h - 950, lifeWidth * this.playerLifes, 80)
    },
    drawScore() {
        const scoreText = `Score : ${this.score}`
        this.ctx.fillStyle = 'black'
        this.ctx.font = '50px arial'
        this.ctx.fillText(scoreText, 800, 70)
    },
    drawText(text) {
        this.ctx.font = '50px arial'
        this.ctx.fillText(text, 100, 100)
    }

}
