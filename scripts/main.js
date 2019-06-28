const PLAYGROUND_WIDTH = 800;
const PLAYGROUND_HEIGHT = 400;
const RADIUS = 8;
const DIAMETER = 2 * RADIUS;
const GOAL_WIDTH = 5;
const GOAL_HEIGHT = 100;
const FRICTION = 0.85;
const MAX_SPEED = 7;
const X_INIT = RADIUS;
const Y_INIT = RADIUS;
const REFRESH = 10;
const TIMEOUT = 1000;

var randomFactor = 20;

var tiltX = 0;
var tiltY = 0;

var x = X_INIT;
var y = Y_INIT;

var speedX = 0;
var speedY = 0;

var score = 0;

function init() {

        initPlayground();
        setInterval("handleOrientationEvent()", REFRESH);
        setInterval("applyRandomForce()", 2 * REFRESH);
        notify("Let's go");
        hide("start");
        setInterval("document.getElementById('info').innerHTML = tiltX + ', ' + tiltY", TIMEOUT);
}

function initPlayground() {
        document.getElementById("playground").style.width = PLAYGROUND_WIDTH + "px";
        document.getElementById("playground").style.height = PLAYGROUND_HEIGHT + "px";
        document.getElementById("ball").style.width = DIAMETER + "px";
        document.getElementById("ball").style.height = DIAMETER + "px";
        document.getElementById("goal").style.width = GOAL_WIDTH + "px";
        document.getElementById("goal").style.height = GOAL_HEIGHT + "px";
        document.getElementById("goal").style.left = PLAYGROUND_WIDTH - GOAL_WIDTH + "px";
        document.getElementById("goal").style.top = (PLAYGROUND_HEIGHT - GOAL_HEIGHT) / 2 + "px";
        document.getElementById("score").innerHTML = score;

}



function handleOrientationEvent() {
        speedX = (speedX + tiltX) * FRICTION;
        speedY = (speedY + tiltY) * FRICTION;
        if (speedX > MAX_SPEED) speedX = MAX_SPEED;
        if (speedX < -MAX_SPEED) speedX = -MAX_SPEED;
        if (speedY > MAX_SPEED) speedY = MAX_SPEED;
        if (speedY < -MAX_SPEED) speedY = -MAX_SPEED;
        collisionDetection();
        updateBall();
}

function applyRandomForce() {
        var directX = (Math.random() > 0.5 ? 1 : -1);
        var directY = (Math.random() > 0.5 ? 1 : -1);
        var randomX = Math.floor(Math.random() * randomFactor * directX);
        var randomY = Math.floor(Math.random() * randomFactor * directY);
        tiltX = tiltX + randomX;
        tiltY = tiltY + randomY;
}

function updateBall() {
        document.getElementById("ball").style.left = x + "px";
        document.getElementById("ball").style.top = y + "px";
}

function collisionDetection() {
        x = x + speedX;
        y = y + speedY;

        // if ball hits right side
        if (x + RADIUS > PLAYGROUND_WIDTH - GOAL_WIDTH) {
                // if ball hits goal
                if (y + DIAMETER < (PLAYGROUND_HEIGHT - GOAL_HEIGHT) / 2 + GOAL_HEIGHT && y + DIAMETER > (PLAYGROUND_HEIGHT - GOAL_HEIGHT) / 2) goal();
                // ball outside of goal
                else missed();
        }
        //if (x > PLAYGROUND_WIDTH - DIAMETER) x = PLAYGROUND_WIDTH - DIAMETER;
        if (x < 0) x = 0;
        if (y > PLAYGROUND_HEIGHT - DIAMETER) y = PLAYGROUND_HEIGHT - DIAMETER;
        if (y < 0) y = 0;

}

function goal() {
        notify("GOAL");
        score++;
        randomFactor += 5;
        if (score >= 0) document.getElementById("score").style.backgroundColor = "green";
        document.getElementById("score").innerHTML = score;
        x = RADIUS;
        y = RADIUS;
        updateBall();
}

function missed() {
        notify("MISSED");
        score--;
        randomFactor -= 5;
        if (score < 0) document.getElementById("score").style.backgroundColor = "red";
        document.getElementById("score").innerHTML = score;
        x = RADIUS;
        y = RADIUS;
        updateBall();
}

function notify(message) {
        document.getElementById("note").innerHTML = message;
        document.getElementById("note").style.visibility = "visible";
        setTimeout("hide('note')", TIMEOUT);
}

function hide(element) {
       document.getElementById(element).style.visibility = "hidden";
}

function handleMotionEvent(event) {
        switch (window.orientation) {
                case 0:
                        tiltX = event.accelerationIncludingGravity.x * (-1);
                        tiltY = event.accelerationIncludingGravity.y;
                        break;
                case -90:
                        tiltX = event.accelerationIncludingGravity.x * (-1);
                        tiltY = event.accelerationIncludingGravity.y * (-1);
                        break;
                case 90:
                        tiltX = event.accelerationIncludingGravity.x;
                        tiltY = event.accelerationIncludingGravity.y;
                        break;
                case 180:
                        tiltX = event.accelerationIncludingGravity.x;
                        tiltY = event.accelerationIncludingGravity.y * (-1);
                        break;
        }
 }

if (window.DeviceOrientationEvent) {
        window.addEventListener("devicemotion", handleMotionEvent, true);
} else {
        alert("Sorry, device orientation not supported!");
}
