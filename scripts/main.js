const PLAYGROUND_WIDTH = 800;
const PLAYGROUND_HEIGHT = 400;
const RADIUS = 7.5;
const GOAL_WIDTH = 5;
const GOAL_HEIGHT = 100;
const FRICTION = 0.95;
const MAX_SPEED = 2.5;
const X_INIT = RADIUS;
const Y_INIT = RADIUS;
const REFRESH = 50;

var tiltX = 0;
var tiltY = 0;
var lastTiltX = 0;
var lastTiltY = 0;

var x = X_INIT;
var y = Y_INIT;

var speedX = 0;
var speedY = 0;

function init() {

        initPlayground();
        foo = setInterval("handleOrientationEvent()", REFRESH);
}

function initPlayground() {
        document.getElementById("playground").style.width = PLAYGROUND_WIDTH + "px";
        document.getElementById("playground").style.height = PLAYGROUND_HEIGHT + "px";
        document.getElementById("ball").style.width = RADIUS * 2 + "px";
        document.getElementById("ball").style.height = RADIUS * 2 + "px";
        document.getElementById("goal").style.width = GOAL_WIDTH + "px";
        document.getElementById("goal").style.height = GOAL_HEIGHT + "px";
        document.getElementById("goal").style.left = PLAYGROUND_WIDTH - GOAL_WIDTH + "px";
        document.getElementById("goal").style.top = (PLAYGROUND_HEIGHT - GOAL_HEIGHT) / 2 + "px";
}



function handleOrientationEvent() {
        console.log(speedX);
        //applyRandomForce();
        speedX = (speedX + 1/*tiltX*/) * FRICTION;
        speedY = (speedY + tiltY) * FRICTION;
        if (speedX > MAX_SPEED) speedX = MAX_SPEED;
        if (speedX < -MAX_SPEED) speedX = -MAX_SPEED;
        if (speedY > MAX_SPEED) speedY = MAX_SPEED;
        if (speedY < -MAX_SPEED) speedY = -MAX_SPEED;
        collisionDetection();
        updateBall();
}

function applyRandomForce() {
        var random = Math.floor(Math.random() * 5);
        tiltX = tiltX - random;
        tiltY = tiltY - random;
}

function updateBall() {
        document.getElementById("ball").style.left = x + "px";
        document.getElementById("ball").style.top = y + "px";
}

function collisionDetection() {
        x = x + speedX;
        y = y + speedY;
        console.log(x +", " + y);

        if (x + RADIUS > PLAYGROUND_WIDTH - GOAL_WIDTH && y + RADIUS < (PLAYGROUND_HEIGHT - GOAL_HEIGHT) / 2 + GOAL_HEIGHT && y + RADIUS > (PLAYGROUND_HEIGHT - GOAL_HEIGHT) / 2) goal();

        if (x > PLAYGROUND_WIDTH - RADIUS) x = PLAYGROUND_WIDTH - RADIUS;
        if (x < RADIUS) x = RADIUS;
        if (y > PLAYGROUND_HEIGHT - RADIUS) y = PLAYGROUND_HEIGHT - RADIUS;
        if (y < RADIUS) y = RADIUS;

}

function goal() {

}
function handleMotionEvent(event) {
        console.log(event.accelerationIncludingGravity.x);
        switch (window.orientation) {
                case 0:
                        tiltX = event.accelerationIncludingGravity.x * (-1);
                        tiltY = event.accelerationIncludingGravity.y * (-1);
                        break;
                case -90:
                        tiltX = event.accelerationIncludingGravity.x * (-1);
                        tiltY = event.accelerationIncludingGravity.y;
                        break;
                case 90:
                        tiltX = event.accelerationIncludingGravity.x;
                        tiltY = event.accelerationIncludingGravity.y * (-1);
                        break;
                case 180:
                        tiltX = event.accelerationIncludingGravity.x;
                        tiltY = event.accelerationIncludingGravity.y;
                        break;
        }
 }

if (window.DeviceOrientationEvent) {
        window.addEventListener("devicemotion", handleMotionEvent, true);
} else {
        alert("Sorry, device orientation not supported!");
}
