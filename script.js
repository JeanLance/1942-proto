var hero = {
    x: 300,
    y: 500
}

var enemies = [{x:50, y:100}, {x:250, y:50}, {x:450, y:200},{x:650, y:120}];

var bullets = [];
var explosionLocation = [];
var score = 0;

function displayHero() {
    document.getElementById('hero').style['top'] = hero.y + "px";
    document.getElementById('hero').style['left'] = hero.x + "px";
}

function displayBullets() {
    var output = "";
    for (var i = 0; i < bullets.length; i++) {
        output += "<div class='bullet' style='top:"+bullets[i].y+"px; left:"+bullets[i].x+"px;'></div>";
    }
    document.getElementById('bullets').innerHTML = output;
}

function moveBullets() {
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].y -= 5;
        if (bullets[i].y < 0) {
            var temp = bullets[i];
            bullets[i] = bullets[bullets.length - 1];
            bullets[bullets.length - 1] = temp;
            bullets.pop();
        }
    }
}

function detectCollision () {
    for (var i = 0; i < enemies.length; i++) {
        for (var j = 0; j < bullets.length; j++) {
            if (Math.abs(bullets[j].x - enemies[i].x) <= 15 && Math.abs(bullets[j].y - enemies[i].y) <= 15) {
                console.log("hit");
                bullets[j] = bullets[bullets.length - 1];
                bullets.pop();
                score += 10;


                explosionLocation.push({x: enemies[i].x, y: enemies[i].y});
                displayExplosion();
                var temp = enemies[i];
                enemies[i] = enemies[enemies.length - 1];
                enemies[enemies.length - 1] = temp;
                enemies.pop();
            }
        }
    }
}
var explosionTime;
function displayExplosion() {
    var output = "";
    for (var i = 0; i < explosionLocation.length; i++) {
        output += "<div class='explosion' style='top:"+explosionLocation[i].y+"px; left:"+explosionLocation[i].x+"px;'></div>";
        console.log(explosionLocation[i]);
        explosionTime = setInterval(explosionTimer, 1000, i); 
    }
    document.getElementById('explosions').innerHTML = output;

    
}
var expSeconds = 0;
function explosionTimer(i) {
    expSeconds++;
    console.log(expSeconds);
    console.log(explosionLocation[i]);
    if (expSeconds >= 2) {
        explosionLocation.pop();
        console.log("after pop" + explosionLocation);
        clearInterval(explosionTime);
        displayExplosion();
    }
}


function displayScore() {
    document.getElementById('score').innerHTML = score;
}

function displayEnemies() {
    var output = "";
    for (var i = 0; i < enemies.length; i++) {
        output += "<div class='enemy1' style='top:"+enemies[i].y+"px; left:"+enemies[i].x+"px;'></div>";

        if (enemies[i].y > 535) {
            enemies[i].y = 0;
        }
        if (enemies[i].y == 0) {
            enemies[i].x = Math.random() * 980;
        }
    }
    document.getElementById('enemies').innerHTML = output;
}

function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].y += 5;
    }
    displayEnemies();
}

function gameLoop () {
    displayHero();
    moveEnemies();
    displayBullets();
    moveBullets();
    detectCollision();
    displayScore();
    //displayExplosion();
}

setInterval(gameLoop, 40);

document.onkeydown = function(a) {
    if (a.keyCode == 37) { // Left
        hero.x -= 10;
    }
    else if (a.keyCode == 39) { // Right
        hero.x += 10;
    }
    else if (a.keyCode == 38) { // Up
        hero.y -= 10;
    }
    else if (a.keyCode == 40) { // Down
        hero.y += 10;
    }
    else if (a.keyCode == 32) { // Space, too shoot bullets
        bullets.push({x:hero.x+5, y:hero.y-15});
    }
}