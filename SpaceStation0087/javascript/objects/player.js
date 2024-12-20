class Player {
    constructor(){
        this.x = tileSize*1.5;
        this.y = tileSize*1.5;
        this.z = 0;
        this.maxspeed = tileSize/40;
        this.rotation = 0.5;
        this.vx = 1;
        this.vy = 1;
    }
}