class Ray {
    constructor(angle,angleDelta,strip,interceptX,interceptY,horizontal){
        this.angle = angle;
        this.texture = null;

        this.strip = strip;
        this.angleDelta = angleDelta;
        this.interceptX = interceptX;
        this.interceptY = interceptY;
        this.horizontal = horizontal;
        this.distance = 0;
        this.distanceCorreted = 0;


        this.viewDistance = Math.hypot((rayCount/2 - strip)*columnWidth,viewDist);
    }
}