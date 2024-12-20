class PlayerButton {
    #width;
    #height;
    #x;
    #y;
    #text;
    #clicked = false;

    #floating

    constructor(x,y,width,height,text = ""){
        this.#width = width;
        this.#height = height;
        this.#x = x;
        this.#y = y;
        this.#text = text;
        this.#clicked = false;
    }

    draw(ctx) {
        ctx.font = "30px cyber";
        ctx.fillStyle = "rgba(64, 64, 64, 0.48)";
        ctx.fillRect(this.#x - this.#width/2 + this.#floating,this.#y - this.#height,this.#width,this.#height);
        ctx.textAlign = "center";
        
        ctx.fillStyle = "rgba(0, 0, 0, 0.66)";
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
        return true;
    }

    update(mouse){
        if(this.isClicked(mouse.getX(),mouse.getY())){
            if(mouse.getLeftClicked()){
                this.#clicked = true;
            }else{
                this.#clicked = false;
            } 
        }else{
            this.#clicked = false;
        }
    }

    isClicked(){
        return this.#clicked;
    }
}