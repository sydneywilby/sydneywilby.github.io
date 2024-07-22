class LoadingScreen extends GameScreen {
    #backgrounds;
    #backgroundtexts;
    #currentBackgroundIndex = 0;
    #currentBackgroundTextIndex = 0;
    #lastTime;

    constructor(){
       super();

       this.#backgrounds = [];
       
       this.defineLoadingTexts();


       const images = [
        "./resources/images/corridor.png",
        "./resources/images/growth.png",
        "./resources/images/spacemen.png"]
       
        for (let index = 0; index < this.#backgroundtexts.length; index++) {
            const background = new Image();
            background.crossOrigin = "anonymous";
            background.src = images[index];
    
            background.addEventListener("load", () => {
                this.#backgrounds.push(background);
            });
       }
       this.#lastTime = (new Date()).getTime();
    }

    drawScreen(ctx){
        ctx.textAlign = "center"
        
        ctx.shadowColor = "red"; // string

// Horizontal distance of the shadow, in relation to the text.
ctx.shadowOffsetX = 0; // integer

// Vertical distance of the shadow, in relation to the text.
ctx.shadowOffsetY = 0; // integer

// Blurring effect to the shadow, the larger the value, the greater the blur.
ctx.shadowBlur = 10;

        const img = this.#backgrounds[this.#currentBackgroundIndex];
        ctx.drawImage(img,0,0,width,height);
        const text = this.#backgroundtexts[this.#currentBackgroundTextIndex]
        ctx.fillStyle = "rgba(31,14,28,255)"
        ctx.font = "31px cyber";
        ctx.lineWidth = 5;
        ctx.strokeText(text,width/2,height - 35);
        ctx.fillStyle = "rgb(255,255,255)"
        ctx.font = "30px cyber";
        ctx.lineWidth = 1;
        ctx.fillText(text,width/2,height - 40);
    }    

    updateScreen(){
        const cur = (new Date()).getTime();
        if(cur - this.#lastTime > 10000){
            this.#currentBackgroundIndex = Math.floor(Math.random()*this.#backgrounds.length);
            this.#currentBackgroundTextIndex = Math.floor(Math.random()*this.#backgroundtexts.length);
            this.#lastTime = (new Date()).getTime();
        }
    }

    defineLoadingTexts(){
        this.#backgroundtexts = [
            "They're watching you...",
            "Beware the shadows.",
            "The air is getting thin...",
            "Save your breath.",
            "Don't trust anyone.",
            "The walls have eyes.",
            "Run, don't walk.",
            "They're right behind you!",
            "Find the key, save yourself.",
            "Secret door detected.",
            "Emergency oxygen needed.",
            "Portal ahead, enter at your own risk.",
            "They're getting closer...",
            "Help is coming, stay alive!",
            "Monster detected in the next room.",
            "Watch out for the flames.",
            "Don't look back.",
            "Alien lifeform nearby.",
            "Hide now!",
            "You're not alone...",
            "They can smell your fear.",
            "The code is 4821.",
            "Get to the escape pod!",
            "Something's moving in the vents.",
            "Hold your breath.",
            "Secure the doors.",
            "They're hunting in packs.",
            "Find the hidden panel.",
            "Don't stop running!",
            "The fire is spreading!",
            "Locate the oxygen supply.",
            "The portal is unstable.",
            "They know your location.",
            "Keycode required: 7893.",
            "You're almost there, keep going!",
            "The monsters can hear you.",
            "Stay out of sight.",
            "The ship is going to explode!",
            "Seek shelter immediately.",
            "They're in the walls...",
            "You need to hurry!",
            "Check the control room.",
            "Danger ahead, proceed with caution.",
            "They're in the shadows.",
            "Move quietly.",
            "You must survive.",
            "Don't let them find you.",
            "The airlock is compromised.",
            "Keep to the dark.",
            "The portal leads to safety.",
            "They're everywhere!",
            "Find the master key.",
            "It's getting harder to breathe.",
            "The flames are spreading.",
            "Save yourself!",
            "Activate the escape protocol.",
            "They're almost here...",
            "Listen for their footsteps.",
            "Your oxygen is low.",
            "Hide, don't run.",
            "Stay silent.",
            "Beware the next room.",
            "They're right above you.",
            "Don't let them hear you.",
            "Locate the emergency exit.",
            "They're closing in on you.",
            "Crawl through the vents.",
            "Find the control panel.",
            "The code is 6359.",
            "The portal is a trap.",
            "Watch for hidden doors.",
            "The flames are everywhere.",
            "Your time is running out.",
            "They're coming for you.",
            "The air is toxic.",
            "You can't hide forever.",
            "Find the secret passage.",
            "Don't lose hope.",
            "They're breaking through!",
            "You need to find the oxygen tank.",
            "The keycode is 2147.",
            "Stay low.",
            "The monsters are near.",
            "Escape while you can.",
            "They're in the ceiling.",
            "Hurry, before it's too late.",
            "You're suffocating...",
            "The door is locked!",
            "Find another way.",
            "You hear them breathing.",
            "The fire is out of control.",
            "Run to the portal!",
            "Secure the hatch.",
            "They're tracking you.",
            "You can't escape.",
            "The oxygen is depleting.",
            "They're closing in.",
            "The next room is safe.",
            "You need to survive.",
            "The monsters are hunting.",
            "Find the way out.",
            "The ship is doomed.",
            "You're being watched.",
            "They're everywhere you go.",
            "The air is getting hotter.",
            "The code is 9513.",
            "They're in the ducts.",
            "You're not safe here.",
            "Keep moving.",
            "The portal is your only hope.",
            "They're getting faster.",
            "You hear their growls.",
            "The fire is everywhere.",
            "They're right outside.",
            "You're running out of time.",
            "Don't let them catch you.",
            "You need the keycard.",
            "They're behind the door.",
            "Find the oxygen mask.",
            "The next portal is the exit.",
            "They're right under you.",
            "Don't stop now.",
            "The ship is burning.",
            "The oxygen is almost gone.",
            "They're surrounding you.",
            "Find the escape route.",
            "You're almost out of air.",
            "The code is 6782.",
            "They're right in front of you.",
            "The flames are too hot.",
            "Get to the safe room.",
            "They're in the next corridor.",
            "You hear their whispers.",
            "The portal is unstable.",
            "You need to hurry.",
            "They're behind the wall.",
            "Find the hidden switch.",
            "The ship is collapsing.",
            "You're choking...",
            "The monsters are everywhere.",
            "The code is 1234.",
            "They're right beneath you.",
            "The flames are consuming everything.",
            "You need to escape now.",
            "They're tracking your movements.",
            "Find the emergency hatch.",
            "The air is running out.",
            "They're closing in fast.",
            "You need the access code.",
            "The portal is closing!",
            "You're suffocating.",
            "They're coming from all sides.",
            "The fire is too intense.",
            "You must find a way out.",
            "They're right beside you.",
            "The oxygen tank is empty.",
            "Find the way to the portal.",
            "They're everywhere.",
            "The flames are unstoppable.",
            "You need to survive the night.",
            "They're in the next room.",
            "Find the control panel.",
            "The oxygen levels are critical.",
            "They're almost on you.",
            "The fire is spreading fast.",
            "Find the key to the portal.",
            "They're everywhere you look.",
            "The air is getting thin.",
            "You're almost there.",
            "The ship is falling apart.",
            "You're out of time.",
            "The portal is your only hope.",
            "They're right behind you.",
            "You need to escape.",
            "The air is toxic.",
            "Find the emergency exit.",
            "They're breaking through the walls.",
            "The oxygen is running out.",
            "You're suffocating.",
            "The flames are closing in.",
            "You need to find the key.",
            "The portal is your only chance.",
            "They're surrounding you.",
            "The ship is about to explode.",
            "You're running out of oxygen.",
            "Find the escape pod.",
            "They're getting closer.",
            "The fire is out of control.",
            "You need to hurry.",
            "The portal is your last hope."
        ];
    }
}