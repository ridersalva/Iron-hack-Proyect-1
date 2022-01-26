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
    
    ejemplo:[],
    images2:[],
    seagul: undefined,
    waves: undefined,
    bubbles: [],
    canvasSize: {
        w: undefined,
        h: undefined
    },
    playerLifes: 3,
    score: 0,




    ///////////////////////////////////////////////////////////////////////////////////////////////////





    //INICIALIZACION
    init() {
        this.canvasDom = document.getElementById(`canvasIronDiver`)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.start()


    },
    setDimensions() {
        this.canvasSize.w = 1921   *1.8         //window.innerWidth
        this.canvasSize.h = 1004     *1.8        //window.innerHeight
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },




    ///////////////////////////////////////////////////////////////////////////////////////////////////




    //START////

    start() {

        this.reset()
        this.initImages()
        this.initImages2()
        this.createSeagul()
        this.setEventHandlers()
        this.interval = setInterval(() => {
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            
            this.clearAll()
            this.clearPlant2()
            this.createEnemy()
            this.createPlant()
            this.createBubbles()
            this.drawAll()
            this.clearEnemy()
            this.player.clearAttackOne()
            this.ancherCollision()
            this.punchCollision()
            if (this.checkPlayerDamaged()) {
                this.player.loseLife();
                this.playerLifes = this.player.lifes
                this.gameOver();
            }
            this.clearPlant()
            this.clearPlant2()
        }, 1000 / this.FPS)

    },

    reset() {

        this.backGround = new Background(this.ctx, 0, 20 * 1.8 , this.canvasSize.w, this.canvasSize.h, this.canvasSize)
        this.waves = new Waves(this.ctx, 0, 230 * 1.8, this.canvasSize.w, 20 * 1.8 , this.canvasSize, 2)

        this.createPlayer()
        setTimeout(() => {
            clearInterval(this.interval)
            alert('GAME OVER')
        }, 60000)               // ver el tiempo de duración del juego
    },





    ///////////////////////////////////////////////////////////////////////////////////////////////////





    //CREAR//
    drawAll() {

        this.backGround.draw()
        this.drawEsquina()
        this.plant2.forEach(elm => elm.draw())   
        this.player.draw()
        this.enemyLevel1.forEach(elm => elm.draw())
        this.enemyLevel2.forEach(elm => elm.draw())
        this.player.attackOne.forEach((elm) => {
            elm.draw()
        })
        this.plant.forEach(elm => elm.draw())
        
        this.drawScore()
        
        this.drawLifeBar()
        this.drawLogoDiver()
        
        this.bubbles.forEach(elm => elm.draw())
        this.seagul.draw()
        this.waves.draw()
    },

    createPlayer() {
        this.player = new Player(this.ctx, 20 * 1.8, 230 * 1.8, 260 * 1.8, 420 * 1.8 , this.canvasSize, this.playerLifes)
    },

    createEnemy() {

        const imgUrlA = `../img/enemy_level_1_A.png`
        const imgUrlB = `../img/enemy_level_2_A.png`

        const x = this.canvasSize.w - 130;
        const framesLimitLevel1A = (Math.floor(Math.random() * 10)) * 80;
        const framesLimitLevel2 = (Math.floor(Math.random() * 10)) * 100;

        if (this.framesCounter % framesLimitLevel1A === 0) {
            this.enemyLevel1.push(new Enemy(this.ctx, x, 600 * 1.8, (260 * .80) * 1.8, (420 * .8) * 1.8 , imgUrlA, this.canvasSize, null, 3))
        }
        if (this.framesCounter % framesLimitLevel1A === 0) {
            this.enemyLevel1.push(new Enemy(this.ctx, x, 520 * 1.8, (260 * .80) * 1.8, (420 * .8) * 1.8 , imgUrlA, this.canvasSize, null, 5))
        }

        if (this.framesCounter % framesLimitLevel2 === 0) {
            this.enemyLevel2.push(new Enemy(this.ctx, x, 270 * 1.8, 284 * 1.8, 189 * 1.8 , imgUrlB, this.canvasSize, null, 7))
        }
        if (this.framesCounter % framesLimitLevel2 === 0) {
            this.enemyLevel2.push(new Enemy(this.ctx, x, 400 * 1.8 , 284 * 1.8 , 189 * 1.8 , imgUrlB, this.canvasSize, null, 5))
        }

    },
    createPlant() {

        const x = this.canvasSize.w * 1.8 ;
        const framesplantA = (Math.floor(Math.random() * 10)) * 30;



        if (this.framesCounter % framesplantA === 0) {
            this.plant2.push(new Decoration(this.ctx, x, 710 * 1.8, 70 * 1.8, 60 * 1.8 , this.canvasSize, 4))
        }
        if (this.framesCounter % framesplantA === 0) {
            this.plant2.push(new Decoration(this.ctx, x, 725 * 1.8 , 100 * 1.8 , 90 * 1.8 , this.canvasSize, 6))
        }
    },
    createPlant2() {

        const x = this.canvasSize.w * 1.8 ;
        const framesplantA = (Math.floor(Math.random() * 10)) * 30;



        if (this.framesCounter % framesplantA === 0) {
            this.plant.push(new Decoration(this.ctx, x, 840 * 1.8, 250 * 1.8, 150 * 1.8 , this.canvasSize, 8))
        }


    },
    createSeagul() {
        this.seagul = new Seagul(this.ctx, 1500 * 1.8, 20 * 1.8, 440 * 1.8, 150 * 1.8 , this.canvasSize, 2)
        console.log(`gaviotoooo`)
    },
    createWaves() {
        this.waves = new Waves(this.ctx, 0, 230 * 1.8 , this.canvasSize.w, 20 * 1.8 , this.canvasSize, 2)

    },

    createBubbles() {
        const y = this.canvasSize.h * 1.8 ;
        const framesBubA = (Math.floor(Math.random() * 15)) * 60;

        if (this.framesCounter % framesBubA === 0) {
            this.bubbles.push(new Bubbles(this.ctx, 800 * 1.8, 473 * 1.8, 90 * 1.8, 90 * 1.8 , this.canvasSize, 5))
        }
        if (this.framesCounter % framesBubA === 0) {
            this.bubbles.push(new Bubbles(this.ctx, 200 * 1.8, 773 * 1.8, 30 * 1.8, 30 * 1.8 , this.canvasSize, 1))
        }
        if (this.framesCounter % framesBubA === 0) {
            this.bubbles.push(new Bubbles(this.ctx, 1400 * 1.8, 673 * 1.8, 30 * 1.8, 30 * 1.8 , this.canvasSize, 4))
        }
        if (this.framesCounter % framesBubA === 0) {
            this.bubbles.push(new Bubbles(this.ctx, 600 * 1.8 , 973 * 1.8 , 40 * 1.8 , 40 * 1.8 , this.canvasSize, 2))
        }
        if (this.framesCounter % framesBubA === 0) {
            this.bubbles.push(new Bubbles(this.ctx, 1800 * 1.8, 973 * 1.8, 70 * 1.8, 70 * 1.8 , this.canvasSize, 3))
        }
    },
    initImages() {
        const esquinaImg = new Image()
        esquinaImg.src = '../img/faro.png';
        this.ejemplo.push(esquinaImg)
   console.log(`faro`)
    },

     drawEsquina() {
         this.ctx.drawImage(this.ejemplo[0], 1600 * 1.8, 55 * 1.8, 320 * 1.8, 200 * 1.8 )
     },
   
    //LOGO DIVER
    initImages2() {
        const lifeBarImg = new Image()
        lifeBarImg.src = '../img/life_logo.png'
        this.images2.push(lifeBarImg)
    },
    drawLogoDiver() {
        const lifeWidth = 30;
        this.ctx.drawImage(this.images2[0], 90 * 1.8, 10 * 1.8, (lifeWidth * 3) * 1.8 , 90 * 1.8 )
    },
    //DRAW LIFE BAR
    drawLifeBar() {
        const lifeWidth = 100 * 1.8 ;
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(180 * 1.8, 50 * 1.8, (lifeWidth * 3) * 1.8, 40 * 1.8 )
        this.ctx.fillStyle = '#91AB91'
        this.ctx.fillRect(140 * 1.8, 50 * 1.8, (lifeWidth * this.playerLifes) * 1.8, 40 * 1.8 )
    },
    drawScore() {
        const scoreText = `Score : ${this.score}`
        this.ctx.fillStyle = 'black'
        this.ctx.font = '90px arial'
        this.ctx.fillText(scoreText, 800 * 1.8, 70 * 1.8 )
    },
    drawText(text) {
        this.ctx.font = '90px arial'
        this.ctx.fillText(text, 100 * 1.8, 100 * 1.8 )
    },




    ///////////////////////////////////////////////////////////////////////////////////////////////////




    ////LIMPIAR//
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    clearBackGround() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    clearPlant() {
        this.plant = this.plant.filter(elm => elm.plantPos.x + elm.plantSize.w >= 0)

    },
    clearPlant2() {
        this.plant2 = this.plant2.filter(elm => elm.plantPos.x + elm.plantSize.w >= 0)

    },

    clearEnemy() {
        this.enemyLevel1 = this.enemyLevel1.filter(elm => elm.enemyPos.x + elm.enemySize.w >= 0)
        this.enemyLevel2 = this.enemyLevel2.filter(elm => elm.enemyPos.x + elm.enemySize.w >= 0)
    },



    ///////////////////////////////////////////////////////////////////////////////////////////////////




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
                
                }
            });
        }
    },

    //COLISIONES PARA GAME OVER
    checkPlayerDamaged() {
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




    ///////////////////////////////////////////////////////////////////////////////////////////////////




    ////MOVER
    setEventHandlers() {
        document.addEventListener(`keydown`, event => {
            const { key } = event
            key === `ArrowRight` ? this.player.moveRight() : null
            key === `ArrowLeft` ? this.player.moveLeft() : null
            if (key === 'ArrowUp' && this.player.isMovingUp === false) {
                this.player.moveUp()
                this.player.isMovingUp = true
                setTimeout(() => {
                    this.player.isMovingUp = false
                }, 200)
            }
            key === `ArrowDown` ? this.player.moveDown() : null
            if(key === ` ` && this.player.canShoot === true) {
                this.player.shoot()
                this.player.canShoot = false;
                setTimeout(() => {
                    this.player.canShoot = true
                }, 1000)
            }
            if (key === `w` && this.player.attackTwo === false) {
                this.player.attackTwo = true
                setTimeout(() => {
                    this.player.attackTwo = false
                }, 200)
            }





        })
    },





    ///////////////////////////////////////////////////////////////////////////////////////////////////

    
}
