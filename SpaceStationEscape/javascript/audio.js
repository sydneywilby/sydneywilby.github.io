class sound {
    constructor(src,loop) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.loop = loop;
        
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        
        this.play = function () {
            if(!this.sound.paused && this.sound.currentTime > 0 && !this.sound.ended){
                this.sound.play();
            }
        };

        this.stop = function () {
            this.sound.pause();
        };

    }
}