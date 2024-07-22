class GameButton {
    #width;
    #height;
    #x;
    #y;
    #text;

    // animation / movement
    #animationCounter = Math.floor(Math.random()*360);
    #floating

    constructor(x,y,width,height,text = ""){
        this.#width = width;
        this.#height = height;
        this.#x = x;
        this.#y = y;
        this.#text = text;
    }

    draw(ctx) {
        ctx.font = "30px cyber";
        ctx.fillStyle = "rgba(60,10,10,0.8)"
        ctx.fillRect(this.#x - this.#width/2 + this.#floating,this.#y - this.#height,this.#width,this.#height);
        ctx.textAlign = "center"
        ctx.fillStyle = "rgb(210,20,30)"
        ctx.fillText(this.#text, this.#x,this.#y);
    }

    isClicked(x,y) {
        if(x > this.#x + this.#width/2){
            return false;
        }
        if(x < this.#x - this.#width/2){
            return false;
        }
        if(y > this.#y + this.#height/2){
            return false;
        }
        if(y < this.#y - this.#height/2){
            return false;
        }
        return false;
    }

    update(){
        this.#animationCounter++;
        this.#animationCounter %= 360;
        this.#floating =  this.#animationCounter - 60;
    }
}