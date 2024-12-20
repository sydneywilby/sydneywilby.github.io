class Sprite {
    constructor(xPos,yPos,texture,movement){
        this.distance = 0;
        this.distanceCorrected = 0;
        this.angleRad = null;
        this.screenX = null;
        this.xPos = xPos;
        this.yPos = yPos;

        this.texture = texture;
        this.movement = movement
    }
}