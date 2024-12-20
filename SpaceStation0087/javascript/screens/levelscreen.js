class LevelScreen extends GameScreen{

        constructor(){
            super();
            this.setButtons(
                [movementJoyStick,arrowLeft,arrowRight]);

        }

        drawScreen(ctx){
            drawOnlyFunction(ctx);
            this.drawButtons(ctx);
        }
    
        updateScreen(){
            if(mobileView){
                this.updateButtons(mouse);
            }
            updateOnlyFunction();
        }
    }

    var p;
    var keys = null;
    
    let portals = [[4,3,0],[10,10,0],[2,2,0],[8,8,0]];
    
    let inventory = null;
    
    
    
    const fov = 100;
    
    const columnWidth = 1;
    
    
    
    const rayCount = Math.ceil(width / columnWidth);
    const viewDist = (width/2) / Math.tan(toRadians(fov/2));
    const wallHeight = 2;
    
    
    let slider = 0;
    let slide = true;
    
    const difference = 0.00000001;
    
    
    
    
    let rayAngles = null;
    let raysOrder = null;
    let rays = null;
    
    let spritesOrder = null;
    let sprites = null
    
    let texturesData;
    let pixelData;
    let textures ;
    
    let map = [
        [1, -1, -2, -3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 2, 0, 0, 5, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    
    const worldWidth = map[0].length;
    const worldHeight = map.length;
    
    var steps = new sound(".\\resources\\sounds\\footsteps.mp3",true);
    var backgroundMusic = new sound(".\\resources\\sounds\\footsteps.mp3",true);
    var itemSelected = new sound(".\\resources\\sounds\\footsteps.mp3",true);
    setupGame();

    
    function setupGame() {
        var music = new sound(".\\resources\\sounds\\background.mp3",true);
        // music.play();
        p = new Player(100,100,0);
    
        createRayAngles();
        createRays();
        createSprites();
        createInventory();
        keys = [];
    
        window.addEventListener('keydown', function (e) {
            keys = (keys || []);
            keys[e.keyCode] = (e.type == "keydown");
        })
    
        window.addEventListener('keyup', function (e) {
            keys[e.keyCode] = (e.type == "keydown");            
        })
    
        
        loadImages();
        // window.requestAnimationFrame(update);
        
    }
    
    function createInventory(){
        inventory = Array(5);
    }
    
    function drawInventory(ctx){
        ctx.fillStyle = "grey";
        ctx.fillRect(0,height,width,100);
    
    }
    
    function createSprites(){
        sprites = []
        spritesOrder = []
        let positions = [[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[4,1]];
        let sizes = [tileSize,tileSize,tileSize,tileSize]
        let textures = [8,9,10,11,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13]
    
        for (let positionItter = 0; positionItter < positions.length; positionItter++) {
            let array = positions[positionItter];
            let sprite = new Sprite((array[0]+1) * tileSize,array[1] * tileSize,textures[positionItter],false);
            sprites.push(sprite);
            spritesOrder.push(positionItter);
        }
    }
    
    function loadImages(){
        textures = [];
        texturesData = [];
    
        let imgAddresses = 
        [
        "https://sydneywilby.github.io/SpaceStation0087/resources/images/sprites/wall2.jpg",
        "https://sydneywilby.github.io/SpaceStation0087/resources/images/sprites/wall1.png",
        "https://raw.githubusercontent.com/sydneywilby/sydneywilby.github.io/main/images/bricks%20small.jpg",
        "https://raw.githubusercontent.com/sydneywilby/sydneywilby.github.io/main/images/death-2026516_1280.png",
        "https://raw.githubusercontent.com/sydneywilby/sydneywilby.github.io/main/images/bricks%20small.jpg",
          "https://raw.githubusercontent.com/sydneywilby/sydneywilby.github.io/main/images/death-2026516_1280.png",
          "https://raw.githubusercontent.com/sydneywilby/sydneywilby.github.io/main/images/death-2026516_1280.png",
          "https://raw.githubusercontent.com/sydneywilby/sydneywilby.github.io/main/images/death-2026516_1280.png",
          "https://sydneywilby.github.io/SpaceStation0087/resources/images/sprites/bossalien.png",
          "https://sydneywilby.github.io/SpaceStation0087/resources/images/sprites/largecrawleralien.png",
          "https://sydneywilby.github.io/SpaceStation0087/resources/images/sprites/mediumcrawleralien.png",
          "https://sydneywilby.github.io/SpaceStation0087/resources/images/sprites/smallcrawleralien.png",
          "https://sydneywilby.github.io/SpaceStation0087/resources/images/sprites/tallcrawleralien.png",
          "https://sydneywilby.github.io/SpaceStation0087/resources/images/sprites/ceilinglight.png"

        ];
    
        for(let index = 0; index < imgAddresses.length; index++){
            let img = new Image();
            img.crossOrigin = "anonymous";
            img.src = imgAddresses[index];
    
            
    
            img.addEventListener("load", () => {
                let c = document.createElement("canvas");
                const ctx = c.getContext("2d");
                c.width = img.width;
                c.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imgData = ctx.getImageData(0, 0, c.width, c.height);
                texturesData[index] = (imgData);
                pixelData = imgData;
                console.log("finished")
                textures[index] = (img);
            });
    
            
        }
    }
    
    function createRayAngles(){
        rayAngles = [];
        for (let i=0;i<rayCount;i++) {
            let screenX = (rayCount/2 - i) * columnWidth
            let rayAngle = Math.atan(screenX / viewDist);
            rayAngles.push(rayAngle)
        }
      }
    
      function createRays(){
        rays = [];
        raysOrder = []
        for (let i=0;i<rayCount;i++) {
            let ray = new Ray(0,rayAngles[i],i,0,0,false);
            rays.push(ray);
            raysOrder.push(i);
        }
      }
    
    async function updateFunction(){
    
            prevTime = curTime;
    
            const c = document.getElementById("screen");
            const ctx = c.getContext("2d");
            ctx.imageSmoothingEnabled = false;
    
            movement();
    
            interactWithBlockInfront();
    
            dynamicTimers();
            //select the next aproximation i.e assume not in block
    
            const len = rayAngles.length
            for(let rayItter = 0;rayItter < len;rayItter++){
    
                let rayAngle = rayAngles[rayItter];
                let angle = toRadians(p.rotation);
                // console.log(rayAngle);
                angle -= rayAngle;
    
                let currentRay = rays[rayItter];
    
                currentRay.angle = angle;
                currentRay.texture = null;
    
                castRay(currentRay,p.x,p.y,0.0);
    
                let block = getBlock(currentRay.interceptX,currentRay.interceptY);
                
                let recursive = 1;
                while(block < 0 && recursive < 20){
                    let index = (block * -1)- 1;
    
                    let translationX = portals[index][0]  * tileSize;
                    let translationY = portals[index][1] * tileSize;
    
                    currentRay.interceptX += translationX;
                    currentRay.interceptY += translationY;
    
                    currentRay.angle = toRadians(p.rotation) - currentRay.angleDelta + toRadians(0);
    
                    castRay(currentRay,currentRay.interceptX,currentRay.interceptY,currentRay.distance);
                    block = getBlock(currentRay.interceptX,currentRay.interceptY);
                
                    recursive++;
                }
    
                currentRay.distanceCorrected = currentRay.distance * Math.cos(currentRay.angleDelta);
    
            }

            if(typeof texturesData !== 'undefined') {
                drawCeilingAndFloor(ctx);
            }
            //clears screen stops drawing over same image
    
            
        
    
            // console.log('Sorted raysOrder:', raysOrder);
    
            // sprites.sort((a, b) => b.distance - a.distance);
    
    
            // drawWalls(ctx);
    
            sortSprites()
    
            // drawSprite(ctx,sprites[0]);
    
            drawWallsAndEntities(ctx)
            drawInventory(ctx)
    
            if(keys && keys[88]){
                drawGrid(ctx);
            }
    
            // curTime = (new Date()).getTime();
            // deltaTime = curTime - prevTime;
    
            // let minTimeDiff = 20;
    
            // if(deltaTime >= minTimeDiff)
            //     window.requestAnimationFrame(update);
            // else{
            //     setTimeout(minTimeDiff - deltaTime);
            //     window.requestAnimationFrame(update)
            // }
        }

        async function updateOnlyFunction(){
    
            // prevTime = curTime;
    
            movement();
    
            interactWithBlockInfront();
    
            dynamicTimers();
            //select the next aproximation i.e assume not in block
    
            const len = rayAngles.length
            for(let rayItter = 0;rayItter < len;rayItter++){
    
                let rayAngle = rayAngles[rayItter];
                let angle = toRadians(p.rotation);
                // console.log(rayAngle);
                angle -= rayAngle;
    
                let currentRay = rays[rayItter];
    
                currentRay.angle = angle;
                currentRay.texture = null;
    
                castRay(currentRay,p.x,p.y,0.0);
    
                let block = getBlock(currentRay.interceptX,currentRay.interceptY);
                
                let recursive = 1;
                while(block < 0 && recursive < 20){
                    let index = (block * -1)- 1;
    
                    let translationX = portals[index][0]  * tileSize;
                    let translationY = portals[index][1] * tileSize;
    
                    currentRay.interceptX += translationX;
                    currentRay.interceptY += translationY;
    
                    currentRay.angle = toRadians(p.rotation) - currentRay.angleDelta + toRadians(0);
    
                    castRay(currentRay,currentRay.interceptX,currentRay.interceptY,currentRay.distance);
                    block = getBlock(currentRay.interceptX,currentRay.interceptY);
                
                    recursive++;
                }
    
                currentRay.distanceCorrected = currentRay.distance * Math.cos(currentRay.angleDelta);
    
            }
            sortSprites()

    
            // curTime = (new Date()).getTime();
            // deltaTime = curTime - prevTime;
    
            // let minTimeDiff = 20;
    
            // if(deltaTime >= minTimeDiff)
            //     window.requestAnimationFrame(update);
            // else{
            //     setTimeout(minTimeDiff - deltaTime);
            //     window.requestAnimationFrame(update)
            // }
        }

    async function drawOnlyFunction(ctx){
        // const c = document.getElementById("screen");
        // const ctx = c.getContext("2d");
        ctx.imageSmoothingEnabled = false;
    
        if(typeof texturesData !== 'undefined') {
            drawCeilingAndFloor(ctx);
        }
        //clears screen stops drawing over same image

        
    

        // console.log('Sorted raysOrder:', raysOrder);

        // sprites.sort((a, b) => b.distance - a.distance);


        // drawWalls(ctx);

        // drawSprite(ctx,sprites[0]);

        drawWallsAndEntities(ctx)
        drawInventory(ctx)

        if(keys && keys[80]){
            STATE = GAMESTATE[GAMESTATE['TITLE']]
        }
    }
        
    async function drawWallsAndEntities(ctx){ 
    
    let rayPos = rays.length - 1;
    let spritePos = sprites.length - 1;
    
    
    const indexesRays = rays.map((_, index) => index);
    const indexesSprites = sprites.map((_, index) => index);
    
    // Sort the indexes array based on the distance property
    indexesRays.sort((a, b) => rays[a].distance - rays[b].distance);
    indexesSprites.sort((a, b) => sprites[a].distance - sprites[b].distance);
    
    let wall = rays[indexesRays[rayPos]]
    let sprite = sprites[indexesSprites[spritePos]]
    
    while(rayPos >= 0 && spritePos >= 0){
        wall = rays[indexesRays[rayPos]]
        sprite = sprites[indexesSprites[spritePos]]
        if(wall.distance > sprite.distance){
            drawIndividualWall(ctx, wall);
            rayPos--;
        }else{
            drawSprite(ctx, sprite);
            spritePos--;
        }
    }
    
    while(rayPos >= 0){
        wall = rays[indexesRays[rayPos]]
        drawIndividualWall(ctx, wall);
        rayPos--;
        }
    
    
    while(spritePos >= 0){
        sprite = sprites[indexesSprites[spritePos]]
        drawSprite(ctx, sprite);
        spritePos--;
    }
    
    }
    
    // ctx.save();
    
    
    async function sortSprites(){
        let tanHalfFOV = Math.tan(toRadians(fov) / 2.0);
        
        
        let wx = Math.cos(toRadians(p.rotation));
        let wy = Math.sin(toRadians(p.rotation));
    
        for(let spriteItter = 0; spriteItter < sprites.length;spriteItter++){
                let sprite = sprites[spriteItter];
    
                if(sprite.movement){
                    let mvx =  p.x - sprite.xPos;
                    let mvy = p.y - sprite.yPos;
                    let scale = Math.sqrt(mvx * mvx + mvy * mvy);
    
                    const newX = sprite.xPos + mvx * 2/scale;
                    const newY = sprite.yPos + mvy * 2/scale;
    
                    if(scale > tileSize){
                        if(!isEntityCollisionWithTile(newX,sprite.yPos,tileSize/2)){
                        sprite.xPos = newX;
                        }
    
                        if(!isEntityCollisionWithTile(sprite.xPos,newY,tileSize/2)){
                            sprite.yPos = newY;
                        }
                    }
                }
                
                
    
                let vx = sprite.xPos - p.x;
                let vy = sprite.yPos - p.y;
    
                let crossProduct = vx * wy - vy * wx;
                let dotProduct = vx * wx + vy * wy;
    
                // Calculate magnitudes
                let magV = Math.sqrt(vx * vx + vy * vy);
                let magW = Math.sqrt(wx * wx + wy * wy);
    
                // Calculate cosine of the angle
                let cosAngle = dotProduct / (magV * magW);
    
                // Ensure cosAngle is within valid range [-1, 1] due to precision issues
    
                let angleRad = Math.acos(cosAngle)
                
                let flip = 1;
                if(cosAngle < crossProduct){
                    flip = -1
                }
    
                // Calculate angle in radians
                // let distance = Math.hypot(vx - wx, vy - wy) * Math.cos(angleRad);
                // sprite.distanceCorrected = distance;
    
                sprite.distanceCorrected = Math.hypot(p.x - sprite.xPos,p.y - sprite.yPos) * Math.cos(angleRad);
                 
    
                 sprite.distance = Math.hypot(sprite.xPos - p.x,sprite.yPos - p.y) ;
                            // sprite.distance = 2000 
    
                let spriteScreenX = width/2 + viewDist * Math.tan(angleRad) * flip;
                sprite.screenX = spriteScreenX;
                sprite.angleRad = angleRad;
                
            }
    
    }
    
    async function drawSprite(ctx,sprite){
        if(sprite.angleRad >= toRadians(-90) &&  sprite.angleRad <= toRadians(90)){
                let wh = (viewDist/sprite.distanceCorrected)*tileSize*wallHeight;
    
                let img = textures[sprite.texture] 
                if(typeof img !== 'undefined') {
                    // Draw to the bottom (specified height)
                    ctx.drawImage(img, sprite.screenX - (wh / 2), (height - wh)/2, wh , wh)
                } 
    
                // ctx.lineWidth = 1;
                // ctx.beginPath();
                // ctx.moveTo(sprite.screenX, (height - wh)/2);        // Start at the top (height 0)
                // ctx.lineTo(sprite.screenX, (height + wh)/2); 
                // ctx.stroke();
                ctx.save()  
            }
    }
    
    async function dynamicTimers(){
        if(slider >= 2.5){
                slider = 0;
            }
        if(slide){
            slider += 0.01;
        }
    }
    
    //Player Functions
    function movement(){
        let speed = 0;
        let moved = false;

        let newX = p.x;
        let newY = p.y;
    
        if(mobileView){

            if(arrowLeft.isClicked()){
                p.rotation -= 3;
            }
            if(arrowRight.isClicked()){
                p.rotation += 3;
            }
            const angle = movementJoyStick.getAngle() + toRadians(p.rotation);

            newX = p.x - Math.sin(angle) * p.maxspeed * movementJoyStick.getScale();
            newY = p.y - Math.cos(angle) * p.maxspeed * movementJoyStick.getScale();
        }else{

        
            //forward and backward walking
            if (keys && keys[87]) {
                speed += p.maxspeed; 
                steps.sound.playbackRate = 1.0;
            }
        
            if (keys && keys[83]) {
                speed += -p.maxspeed/2;
                steps.sound.playbackRate = 0.8;
            }
        
            if (keys && keys[16]) {
                speed *= 1.5; 
                steps.sound.playbackRate = 1.2;
            }
        
            //rotation
            let rotation = p.rotation;
        
            if (keys && keys[65]) {
                rotation += -3;
            }
            if (keys && keys[68]) {
                rotation += 3; 
            }
            if(rotation < 0){
                rotation += 360;
            }
            p.rotation = rotation % 360;
        
            const cos =  Math.sin(toRadians(rotation));
            const sin =  Math.cos(toRadians(rotation));
        
            // set rotation vector
            
            p.vx = sin;
            p.vy = cos;
        
            newX = p.x + sin * speed;
            newY = p.y + cos * speed;
        }
    
        // translate x and y by vector vx and vy
        let block = getBlock(newX,newY);
    
        // if(Math.floor(p.y/tileSize) == Math.floor(newY/tileSize)
        //     && Math.floor(p.x/tileSize) == Math.floor(newX/tileSize)){
                
        //         p.x = newX;
        //         p.y = newY;
        // }else 
    
        if(block < 0){
            p.x = newX;
            p.y = newY;
    
            let index = (block * -1) - 1;
    
            p.x += portals[index][0] * tileSize;
            p.y += portals[index][1] * tileSize;
    
            moved = true;
            // p.rotation += 90;
        }else if(block == 4 && slider >= 2){
            p.x = newX;
            p.y = newY;
    
            moved = true;
        }else{
    
            if(!isEntityCollisionWithTile(newX,p.y,tileSize/4)){
                p.x = newX;
                moved = true;
            }
    
            if(!isEntityCollisionWithTile(p.x,newY,tileSize/4)){
                p.y = newY;
                moved = true;
            }
        }
    
        if(moved && speed != 0){
            steps.play();
        }else{
            steps.stop();
        }
    }
    
    async function interactWithBlockInfront(){
        let xTile = Math.floor((p.x + (tileSize)*p.vx) / tileSize);
        let yTile = Math.floor((p.y + (tileSize)*p.vy) / tileSize);
    
        if(keys && keys[90]){
            
            map[yTile][xTile] = 0;
        }
    
        if(keys && keys[67] && map[yTile][xTile] == 4){
            slide = true;
        }
        
    }
    
    
    function isEntityCollisionWithTile(x,y,size = tileSize/2){
    
        size = size/2;
    
        if(isCollisionWithTile(x+size,y+size)){
            return true;
        }
        if(isCollisionWithTile(x-size,y+size)){
            return true;
        }
        if(isCollisionWithTile(x+size,y-size)){
            return true;
        }
        if(isCollisionWithTile(x-size,y-size)){
            return true;
        } 
        return false;
    }
    
    function isCollisionWithTile(x,y){
        if(x < 0)return true;
        if(x > worldWidth  * tileSize)return true;
        if(y < 0) return true;
        if(y > worldHeight * tileSize)return true;
    
        return(map[Math.floor(y / tileSize)][Math.floor(x / tileSize)] != 0)
    }
    
    function isRayCollisionWithTile(ray,modifier,x,y,horizontal,dx,dy){
        let vx = Math.cos(ray.angle);
        let vy = Math.sin(ray.angle);
    
        let deltaX = x % tileSize;
        let deltaY = y % tileSize;
    
        // if the ray hits an empty space then it will always not hit anything
        if(!isCollisionWithTile(x,y)){
            return false;
        }
    
        let block = getBlock(x,y);
    
    
        //bars
        if(block == 3){
            let xPosition = Math.ceil(x % (tileSize/5));
            let yPosition = Math.ceil(y % (tileSize/5));
            let gap = tileSize/8;
            if(xPosition <= gap/3 && horizontal){
                return false;
            }
            if(yPosition <= gap/3 && !horizontal){
                return false;
            }
        }
    
        //door test
        else if(block == 4){
            if(slider > 2){
                return false;
            }
            
            //EAST AND SOUTH SIDES SHOW DIAG
            if(!horizontal && vx > 0){
                if(slider > 2){
                    return false;
                }
                let smallDeltaY = tileSize * slider * vy/vx;
    
                if(deltaY + smallDeltaY <= 0){
                    return false;
                }
                if(deltaY + smallDeltaY >= tileSize){
                   return false;
                }
    
                modifier.deltaX = (tileSize  * slider);
                modifier.deltaY = smallDeltaY;
                // modifier.textureHorizontal = 2;
                modifier.textureVertical = 2;
                ray.horizontal = true;
            }else if(horizontal){
              return false;
            }
        }
            
        else if(block == 5){
            modifier.textureVertical = 2
            
            let deltaX = x % tileSize;
            let deltaY = y % tileSize;
    
            //EAST AND SOUTH SIDES SHOW DIAG
            if(!horizontal){
                let smallDeltaY = tileSize*0.5 * vy/vx;
    
                if(vx < 0){
                    return true;
                }
                    
                if(deltaY + smallDeltaY <= 0){
                    modifier.deltaY = -deltaY;
                    modifier.deltaX = deltaY * -vx/vy;
                    modifier.horizontal = true;
                    modifier.textureVertical = 2
                    return true;
                }
                if(deltaY + smallDeltaY >= tileSize){
                    modifier.deltaY = tileSize-deltaY;
                    modifier.deltaX = modifier.deltaY * vx/vy;
                    modifier.horizontal = true;
                    modifier.textureVertical = 2
                    return true;
                }
                
            
    
                modifier.deltaX = (tileSize  * 0.5);
                modifier.deltaY = smallDeltaY;
            }else if(horizontal){
                modifier.textureHorizontal = 1;
                return true;
            }
        } else if(block == 7){
            // (x-a)^2+(y-b)^2=r^2
    
            //y=mx+c
    
            let a = -((x - deltaX) * tileSize + tileSize/2);
            let b = -((y - deltaY) * tileSize + tileSize/2);
            let r = tileSize/3
    
            
        
    
            let x1 = x;
            let y1 = y;
            let x2 = x+ dx;
            let y2 = y + dy;
    
            let m = (y2-y1)/(x2-x1)
            let c = (-m * x1 + y1)  
        
            const notvalid = r * r *((a * a) + (b * b)) - (c * c) < 0;
            
            if(notvalid){
                return false;
            }
    
            let aprim = (1 + (m * m))
            let bprim = 2 * m * (c - b) - 2 * a
            let cprim = (a * a) + (c - b)*(c - b) - (r * r)
    
            let delta = (bprim * bprim) - 4 * aprim * cprim
    
            let x1_e_intersection = (-bprim + Math.sqrt(delta)) / (2 * aprim)
            let y1_e_intersection = m * x1_e_intersection + c
    
            let x2_e_intersection = (-bprim - Math.sqrt(delta)) / (2 * aprim)
            let y2_e_intersection = m * x2_e_intersection + c
        
            // modifier.deltaX = x1_e_intersection - x;
            // modifier.deltaY = y1_e_intersection - y;
            
            if(!modifier.deltaX){
                return true;
            }if(!modifier.deltaY){
                return true;
            }
            return false;
        }
        
    
    
        return true;
    }
    
    function getBlock(x,y){
        if(x < 0)return Infinity;
        if(x > worldWidth*tileSize)return Infinity;
        if(y < 0) return Infinity;
        if(y > worldHeight*tileSize)return Infinity;
    
        return map[Math.floor(y/tileSize)][Math.floor(x/tileSize)];
    }
    
    
    
    function toRadians(degrees){
        let deg = degrees * Math.PI / 180;
        return deg;
    }
    
    function toDegrees(radians) {
        return radians * (180 / Math.PI);
    }
    
    function drawGrid(ctx){
        // draw grid 
        ctx.fillStyle = "black"
        ctx.strokeStyle = "black"
        let smallDiv = 2;
        let tileSizeSmall = tileSize / smallDiv;
    
    
        for(var i = 0; i < worldWidth;i++){
            for(var j = 0; j < worldHeight;j++){
                if(map[j][i] != 0){
                    if(map[j][i] < 0){
                        ctx.fillStyle = "black";
                    }else{
                        ctx.fillStyle = "red";
                    }
                    ctx.fillRect(tileSizeSmall*i,tileSizeSmall*j,tileSizeSmall,tileSizeSmall);
                }else{
                    ctx.beginPath();
                    ctx.rect(tileSizeSmall*i,tileSizeSmall*j,tileSizeSmall,tileSizeSmall);
                    ctx.stroke();
                }
            }
        }
    
        ctx.fillStyle = "red";
        ctx.fillRect(p.x/smallDiv,p.y/smallDiv,5,5);
        ctx.lineWidth = 2;
        ctx.beginPath()
        ctx.moveTo(p.x/smallDiv,p.y/smallDiv)
        ctx.lineTo((p.x + (tileSize/2)*p.vx) / smallDiv,(p.y + (tileSize/2)*p.vy) / smallDiv);
        ctx.stroke()
    
        let x = (Math.cos(p.rotation) * tileSize) + p.x;
        let y = (Math.sin(p.rotation) * tileSize) + p.y;
    
        // ctx.beginPath()
        // ctx.strokeStyle = "red"
        // ctx.moveTo(x/smallDiv,y/smallDiv)
        // ctx.lineTo(nextRowX,nextRowY);
        // ctx.stroke()
    
        for(let rayItter = 0; rayItter < rays.length;rayItter++){
            let ray = rays[rayItter];
            ctx.beginPath()
            ctx.strokeStyle = "yellow"
            ctx.moveTo(p.x/smallDiv,p.y/smallDiv)
            ctx.lineTo(ray.interceptX/smallDiv,ray.interceptY/smallDiv);
            ctx.stroke();
        }
        
        for(let spriteItter = 0;spriteItter < sprites.length;spriteItter++){
            let sprite = sprites[0]
            ctx.fillStyle = "orange";
            ctx.fillRect((sprite.xPos)/smallDiv - 10,sprite.yPos/smallDiv - 10,20,20);
    
            ctx.beginPath()
            ctx.moveTo(sprite.xPos/smallDiv,sprite.yPos/smallDiv)
            ctx.lineTo(p.x/smallDiv,p.y/smallDiv);
            ctx.stroke();
        }
        // ctx.lineWidth = 1;
        // ctx.beginPath()
        // ctx.strokeStyle = "green"
        // ctx.moveTo(p.x,p.y)
        // ctx.lineTo(nextColX,nextColY);
        // ctx.stroke() 
    }
    
    async function drawWalls(ctx, img){ 
        for(let rayItter = 0;rayItter < rayAngles.length;rayItter++){
                drawIndividualWall(ctx,rays[rayItter])
        }
    }
    
    async function drawIndividualWall(ctx,ray){
        let wh = (viewDist/ray.distanceCorrected)*tileSize*wallHeight;
                
        let index = Math.max(1,Math.min(getBlock(ray.interceptX,ray.interceptY),textures.length)) - 1;
        if(ray.texture){
            index = ray.texture;
        }
        
        const img = textures[index];
    
        if(typeof img === 'undefined'){
            return;
        }
    
        let vx = Math.cos(ray.angle);
        let vy = Math.sin(ray.angle);
    
        
        let position = 0;
    
        ctx.fillStyle = "black";
        ctx.fillRect(columnWidth*ray.strip,height/2 - wh/2,columnWidth,wh);
        
        if(!ray.horizontal){
            if(vx>0){
                position = Math.floor(((ray.interceptY % tileSize) / tileSize) * (img.width));
            }else{
                position = Math.floor(((ray.interceptY % tileSize) / tileSize) * (img.width));
            }
        }else{
            if(vy < 0){
                position = Math.floor(((ray.interceptX % tileSize) / tileSize) * (img.width));
            }else{
                position = Math.floor(((ray.interceptX % tileSize) / tileSize) * (img.width));
            }
        }
    
        ctx.globalAlpha = getDarkness(ray.distance);
        ctx.drawImage(img, position, 0, 1, img.height, columnWidth*ray.strip, height/2 - wh/2, width/rayCount, wh)
        ctx.globalAlpha = 1;
    }
    
    async function drawCeilingAndFloor(ctx) {
        let imageData = ctx.createImageData(width, height);

        let img = textures[1];
        if (typeof img === 'undefined') {
            return;
        }

        let imgData = texturesData[1];
        const len = rayAngles.length;
        const halfHeight = height / 2;
        const tileSizeInv = 1 / tileSize;
        const imgWidth = img.width;
        const imgHeight = img.height;
        const imgDataWidth = imgData.width;
        const imgDataData = imgData.data;
        const imageDataData = imageData.data;

        for (let rayItter = 0; rayItter < len; rayItter++) {
            let ray = rays[rayItter];
            const difference = viewDist / ray.distanceCorrected * wallHeight * tileSize;
            let column = ray.strip;
            let angle = -toRadians(p.rotation) + ray.angleDelta;
            const cosRayAngle = Math.cos(angle);
            const sinRayAngle = Math.sin(angle);

            for (let row = 0; row <= halfHeight - difference / 2 + 1; row++) {
                let index = (column + row * imageData.width) * 4;
                let index2 = (column + (height - row) * imageData.width) * 4;

                const dy = row - halfHeight;
                let floorDistance = (ray.viewDistance * tileSize) / dy;
                let worldX = p.x + floorDistance * -cosRayAngle;
                let worldY = p.y + floorDistance * sinRayAngle;

                let textureX = Math.floor(worldX % tileSize);
                let textureY = Math.floor(worldY % tileSize);

                if (textureX < 0) {
                    textureX += tileSize;
                }
                textureX = Math.floor(textureX * imgWidth * tileSizeInv);

                if (textureY < 0) {
                    textureY += tileSize;
                }
                textureY = Math.floor(textureY * imgHeight * tileSizeInv);

                let x = (textureX + textureY * imgDataWidth) * 4;
                let darkness = getDarkness(floorDistance);

                const r = imgDataData[x] * darkness;
                const g = imgDataData[x + 1] * darkness;
                const b = imgDataData[x + 2] * darkness;
                const a = imgDataData[x + 3];

                imageDataData[index] = r;
                imageDataData[index + 1] = g;
                imageDataData[index + 2] = b;
                imageDataData[index + 3] = a;

                imageDataData[index2] = r;
                imageDataData[index2 + 1] = g;
                imageDataData[index2 + 2] = b;
                imageDataData[index2 + 3] = a;
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }
    
    
    
    async function drawFloor(imageData){
        for(let rayItter = 0;rayItter < rayAngles.length;rayItter+=1){
            let ray = rays[rayItter];
            const difference = (viewDist/ray.distanceCo)*tileSize;
            let column = ray.strip;
    
    
            for(let row = height;row >= height/2 - 1 + difference/2;row--){
                let index = (column + row * imageData.width) * 4;
                let x = 40*4;
                imageData.data[index] = imgData[x];
                imageData.data[index+1] = imgData[x+1];
                imageData.data[index+2] = imgData[x+2];
                imageData.data[index+3] = 255;
            }
        }
    }
    async function drawCeiling(imageData){
        for(let rayItter = 0;rayItter < rayAngles.length;rayItter+=1){
            let ray = rays[rayItter];
            const difference = (viewDist/ray.distance)*tileSize;
            let column = ray.strip;
    
    
            for(let row = 0;row <= height/2 - difference/2;row++){
                let index = (column + row * imageData.width) * 4;
                let x = 40*4;
                imageData.data[index] = imgData[x];
                imageData.data[index+1] = imgData[x+1];
                imageData.data[index+2] = imgData[x+2];
                imageData.data[index+3] = 255;
            }
        }
    }
    
    

    
    function castRay(ray,startX,startY,distance){
        let angle = ray.angle;
    
        let vx = Math.cos(angle);
        let vy = Math.sin(angle);
    
        let tan = vy / vx;
        let arctan = vx / vy;
    
        let horizontal = true;
        
        let nextRowX = 0;
        let nextRowY = 0;
        let rowDeltaX = 0;
        let rowDeltaY = 0;
    
        let nextColX = 0;
        let nextColY = 0;
        let colDeltaX = 0;
        let colDeltaY = 0;
    
        if(vx > 0){
            nextColX = (Math.floor(startX/tileSize) + 1) * tileSize + difference;
            colDeltaX = tileSize;
        }else{
            nextColX = Math.floor(startX/tileSize) * tileSize - difference;
            colDeltaX = -tileSize;
        }
    
        nextColY = startY - (startX - nextColX)* tan;
    
    
    
    
    
        if(vy > 0){
            nextRowY = (Math.floor(startY/tileSize) + 1) * tileSize + difference;
            rowDeltaY = tileSize;
        }else{
            nextRowY = Math.floor(startY/tileSize) * tileSize - difference;
            rowDeltaY = -tileSize;
        }
        nextRowX = startX + (startY - nextRowY)* -arctan;
    
        colDeltaY = tan * colDeltaX;
        rowDeltaX = arctan * rowDeltaY;
    
        let currentDepth = 0;
        const maxDepth = 20;
        let hit = false;
    
        let distanceRow = 0;
        let distanceColumn = 0;
    
        let modifier = new RayModifier();
        while(!hit && currentDepth < maxDepth){
            hit = isRayCollisionWithTile(ray,modifier,nextRowX,nextRowY,true,colDeltaX,colDeltaY);
    
            if(!hit){
                currentDepth++;
                nextRowX += rowDeltaX;
                nextRowY += rowDeltaY;
            }
        }
    
        nextRowX += modifier.deltaX;
        nextRowY += modifier.deltaY;
    
        distanceRow = Math.hypot(startX - nextRowX,startY - nextRowY);
    
        currentDepth = 0;
        hit = false;
    
        modifier.deltaX = 0;
        modifier.deltaY = 0;
    
        while(!hit && currentDepth < maxDepth){
            hit = isRayCollisionWithTile(ray,modifier,nextColX,nextColY,false,rowDeltaX,rowDeltaY);
            
            if(!hit){
                currentDepth++;
                nextColX += colDeltaX;
                nextColY += colDeltaY;
            }
        }
    
        nextColX += modifier.deltaX;
        nextColY += modifier.deltaY;
    
        distanceColumn = Math.hypot(startX - nextColX,startY - nextColY);
        
        if(distanceRow < distanceColumn){
            ray.interceptX = nextRowX;
            ray.interceptY = nextRowY;
            ray.horizontal = true;
            if(modifier.textureHorizontal){
                ray.texture = modifier.textureHorizontal;
            }       
        }else{
            ray.interceptX = nextColX;
            ray.interceptY = nextColY;
            ray.horizontal = false;
            if(modifier.textureVertical){
                ray.texture = modifier.textureVertical;
            } 
        }
    
        if(modifier.horizontal){
            ray.horizontal = modifier.horizontal
        }
    
        ray.distance = Math.min(distanceColumn, distanceRow ) + distance;
        
    }
    
    function getDarkness(distance){
        distance = Math.abs(distance);
        let light = 1 - (0.05 * (distance / tileSize));
        return Math.max(0.05,light);
    }
    