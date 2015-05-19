
/* Implementation of Enemy class.
 * Constructor function take two parameters that defines
 * initial position of each enemy instance.
 * Initial speed of each enemy is set at creation as a random
 * number between 100 and 150.
 */

var Enemy = function(initX, initY) {
    this.sprite = 'images/enemy-bug.png';
    this.x = initX;
    this.y = initY;
    this.speed = Math.floor(Math.random() * 150) + 100;
};

/* Update method for Enemy class. It checks if the enemy goes
 * off canvas, if this is the case, it reasingns the x coordinate to
 * initial position. There are four levels of difficulty. The speed
 * of enemies increases with each new level.
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
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Player constructor function object.
 * The function sets the level the score, lives, and the initial coordinates.
 */

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.initX = 200;
    this.initY = 395;
    this.score = 0;
    this.level = 0;
    this.lifes = 3;
    this.x = this.initX;
    this.y = this.initY;
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/* Update function. If player goes into blue area, it's returned to initial position
 * and the score is increased by 100. Level is updated taking the integer part
 * of resulting division between number of points and 1000.
 */

Player.prototype.update = function () {
    if (this.y < 60) {
        this.y = this.initY;
        this.x = this.initX;
        this.score += 100;
        }

    this.level = Math.floor(this.score/1000);
};

/* Function for handling key presses, it takes a string representing key pressed as a parameter.
 *  Checks if player is between bounds before processing each movement
 */

Player.prototype.handleInput = function(keypress) {
    if (keypress === "up") {
        if (this.y > -20) {
            this.y -= 83;
            }
        }
    else if (keypress === "down") {
        if (this.y < 380) {
            this.y += 83;
            }
        }
    else if (keypress == "right") {
        if (this.x < 400) {
            this.x += 101;
            }
        }
    else {
        if (this.x > 0) {
            this.x -= 101;
            }
        }
};

/* Check collisions method
 * First, we calculate the distance between player and enemies coordianates
 * using the formula derived from Pythagorean theorem. If there is a collision, lifes are decreased by one
 * and the player is returned to the initial position.
 * Then, we process collisions between player and gems using the same procedure.
 */

Player.prototype.checkCollisions = function() {
    for ( var enemy in allEnemies) {
        if (Math.sqrt((this.x - allEnemies[enemy].x)*(this.x - allEnemies[enemy].x)+
            (this.y - allEnemies[enemy].y-10)*(this.y - allEnemies[enemy].y-10)) < 70) {
            this.x = this.initX;
            this.y = this.initY;
            this.lifes -=1;
            }
    }
    if (Math.sqrt((this.x - gem.x)*(this.x - gem.x)+
        (this.y - gem.y+40)*(this.y - gem.y+40)) < 60) {
        gem.sprite = gem_choices[Math.floor(Math.random()*3)]; // Colour and coordinates of the gem are randomly chosen
        gem.x = x_choices[Math.floor(Math.random()*5)];
        gem.y = y_choices[Math.floor(Math.random()*3)];
        gem.show = false;
        this.score += 200; // if there is a collision, the score is increased by 200 points.
        }
};

var gem_choices = ['images/GemBlue.png','images/GemGreen.png', 'images/GemOrange.png']; // set of gems array
var x_choices = [30,130,230,335,440]; // gems eligible x coordinates
var y_choices = [130,220,290]; // gems eligible y coordinates

/* Gem constructor.
 * Colour and coordinates are randomly chosen from correspondent arrays.
 */

var Gem = function() {
    this.sprite = gem_choices[Math.floor(Math.random()*3)];
    this.x = x_choices[Math.floor(Math.random()*5)];
    this.y = y_choices[Math.floor(Math.random()*3)];
    this.show = false;
};

/* If "show" instance variable is set to true, we use helper method to render the gem. */

Gem.prototype.render = function() {
    if (this.show) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 70);
        }
};

/* Gem's update method uses a probability function in order to decide when a gem has to be shown. */

Gem.prototype.update = function() {
    if (Math.random() < 0.001) {
        this.show = true;
        }
};

/* Player, enemies and gem instantiation */

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
