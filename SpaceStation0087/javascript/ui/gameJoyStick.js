class GameJoyStick {
    #x;
    #y;
    #radiusLarge;
    #radiusSmall;

    #currentX
    #currentY

    constructor(x,y,smallRadius,largeRadius){
        this.#x = x;
        this.#y = y;
        this.#radiusLarge = largeRadius;
        this.#radiusSmall = smallRadius;
        
        this.#currentX = x;
        this.#currentY = y;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.#x,this.#y,this.#radiusLarge,0,2*Math.PI);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.#currentX,this.#currentY,this.#radiusSmall,0,2*Math.PI);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
        ctx.closePath();
    }

    isClicked(x,y) {
        return Math.sqrt(Math.pow(x - this.#x,2) + Math.pow(y - this.#y,2)) < this.#radiusLarge;
    }

    update(mouse){
        if(mouse.getLeftClicked()){
            if(this.isClicked(mouse.getX(),mouse.getY())){
                this.#currentX = mouse.getX();
                this.#currentY = mouse.getY();
            }else{
                let angle = Math.atan2(mouse.getY() - this.#y,mouse.getX() - this.#x);
                this.#currentX = this.#x + Math.cos(angle) * this.#radiusLarge;
                this.#currentY = this.#y + Math.sin(angle) * this.#radiusLarge;
            }
            
        }else{
            //return to center

            let angle = Math.atan2(this.#currentY - this.#y,this.#currentX - this.#x);
            this.#currentX = this.#x + (this.#currentX - this.#x)*0.8;
            this.#currentY = this.#y + (this.#currentY - this.#y)*0.8;
            

        }
    }

    getAngle(){
        return Math.atan2(this.#currentY - this.#y,this.#x - this.#currentX );
    }

    getScale(){
        return Math.sqrt(Math.pow(this.#currentX - this.#x,2) + Math.pow(this.#currentY - this.#y,2)) / this.#radiusLarge;
    }

}