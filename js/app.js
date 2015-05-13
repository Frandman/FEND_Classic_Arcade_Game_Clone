
/* Implementation of the Enemy class.
 * Constructor function take two parameters that defines 
 * the initial position of each enemy instance. 
 * The initial speed of each enemy set at creation as a random
 * number between 100 and 250.
 */
 
var Enemy = function(initX, initY) {
    this.sprite = 'images/enemy-bug.png';
    this.x = initX;
    this.y = initY;
    this.speed = Math.floor(Math.random() * 150) + 100;
}

/* Update method for Enemy class. It checks if the enemy goes
 * off canvas, in this case it reasingns the x coordinate to 
 * initial position.
 */

Enemy.prototype.update = function(dt) {
    if (this.x > 500) {
        this.x = -60;
        if (player.level === 0) {
            this.speed = Math.floor(Math.random() * 150) + 100;
        } 
        else if (player.level === 1) {
            this.speed = Math.floor(Math.random() * 250) + 100;
        } 
        else if (player.level === 2) {
            this.speed = Math.floor(Math.random() * 350) + 100;
        } 
        else  {
            this.speed = Math.floor(Math.random() * 500) + 100;
        } 
    }
    this.x += this.speed*dt;
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.initX = 200;
    this.initY = 395;
    this.score = 0;
    this.level = 0;
    this.lifes = 3;
    this.x = this.initX;
    this.y = this.initY;
}
    Player.prototype.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

Player.prototype.update = function () {

    if (this.y < 60) {
        this.y = this.initY;
        this.x = this.initX;
        this.score += 100;
    }

    this.level = Math.floor(this.score/1000);
}

Player.prototype.handleInput = function(keypress) {
    if (keypress === "up") {
        if (this.y > -20){
            this.y -= 80;
        }
    } 
    else if (keypress === "down") {
        if (this.y < 380){
            this.y += 80;
        }
    }
    else if (keypress == "right") {
        if (this.x < 400) {
            this.x += 100;
        }
    }
    else {
        if (this.x > 0) {
            this.x -= 100;
        }
    }
}


Player.prototype.checkCollisions = function() {
    for (enemy in allEnemies) {
        if (Math.sqrt((this.x - allEnemies[enemy].x)*(this.x - allEnemies[enemy].x)+
                      (this.y - allEnemies[enemy].y-10)*(this.y - allEnemies[enemy].y-10)) < 70) {
            this.x = this.initX;
            this.y = this.initY;
            this.lifes -=1;
        }
    }  
    if (Math.sqrt((this.x - gem.x)*(this.x - gem.x)+
                  (this.y - gem.y+40)*(this.y - gem.y+40)) < 60) {
        gem.sprite = gem_choices[Math.floor(Math.random()*3)];
        gem.x = x_choices[Math.floor(Math.random()*5)];
        gem.y = y_choices[Math.floor(Math.random()*3)];;
        gem.show = false;
        this.score += 200;
    }
}

var gem_choices = ['images/GemBlue.png','images/GemGreen.png', 'images/GemOrange.png'];
var x_choices = [30,130,230,335,440];
var y_choices = [130,220,290]; 
var Gem = function() {
    this.sprite = gem_choices[Math.floor(Math.random()*3)];
    this.x = x_choices[Math.floor(Math.random()*5)];
    this.y = y_choices[Math.floor(Math.random()*3)];;
    this.show = false;
}

Gem.prototype.render = function() {
    if (this.show) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 70);
    }
}

Gem.prototype.update = function() {
    if (Math.random() < 0.001) {
            this.show = true; 
        }
}


var player = new Player();
var gem = new Gem();

var allEnemies = []; 

for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(-60, 60 + 80 *i ));
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
