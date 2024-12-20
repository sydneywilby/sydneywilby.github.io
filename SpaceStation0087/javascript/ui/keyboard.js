var keys =[];

window.addEventListener('keydown', function (e) {
    keys = (keys || []);
    keys[e.keyCode] = (e.type == "keydown");
})

window.addEventListener('keyup', function (e) {
    keys[e.keyCode] = (e.type == "keydown");          
})
