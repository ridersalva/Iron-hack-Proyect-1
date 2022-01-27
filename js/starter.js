class starter {

    constructor(ctx, starterPosX, starterPosY, starterWidth, starterHeight, gameSize, starterVelX) {
        this.ctx = ctx;
        this.starterPos = { x: starterPosX, y: starterPosY };
        this.starterVelX = starterVelX;
        this.gameSize = gameSize;
        this.imgl = `../img/gaviotas.png`
        this.starterSize = { w: starterWidth, h: starterHeight };
        this.seImageInstance = undefined,

            this.init()
    }
    init() {
        this.seImageInstance = new Image();
        this.seImageInstance.src = imgl;

    }
    draw() {
        this.ctx.drawImage(this.seImageInstance, this.starterPos.x, this.starterPos.y, this.starterSize.w, this.starterSize.h);
        this.move()

    }
   
}