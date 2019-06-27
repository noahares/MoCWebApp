const PLAYGROUND_WIDTH = 800;
const PLAYGROUND_HEIGHT = 400;
const RADIUS = 7.5;
const FRICTION = 0.95;
const MAX_SPEED = 2.5;
const X_INIT = RADIUS;
const Y_INIT = RADIUS;
const REFRESH = 5;

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
        if (window.DeviceOrientationEvent) {
                window.addEventListener("deviceorientation", function(event) {
                        tiltX = event.beta;
                        tiltY = event.gamma;

                }, true);
        setIntervall("handleOrientationEvent(tiltX, tiltY)", REFRESH);
        }
}

function initPlayground() {
        document.getElementById("playground").style.width = PLAYGROUND_WIDTH + "px";
        document.getElementById("playground").style.height = PLAYGROUND_HEIGHT + "px";
        document.getElementById("ball").style.width = RADIUS * 2 + "px";
        document.getElementById("ball").style.height = RADIUS * 2 + "px";
}



function handleOrientationEvent(tiltX, tiltY) {
        applyRandomForce();
        speedX = (speedX + tiltX) * FRICTION;
        speedY = (speedY + tiltY) * FRICTION;
        if (speedX > MAX_SPEED) speedX = MAX_SPEED;
        if (speedX < -MAX_SPEED) speedX = -MAX_SPEED;
        if (speedY > MAX_SPEED) speedY = MAX_SPEED;
        if (speedY < -MAX_SPEED) speedY = -MAX_SPEED;
        updateBall();
        collisionDetection();
}

function applyRandomForce() {
        var random = Math.floor(Math.random() * 5);
        tiltX = tiltX - random;
        tiltY = tiltY - random;
}

function updateBall() {
        /* context.clear(0, 0, playground.width, playground.height);
        context.beginPath();
        context.arc(x, y, RADIUS, 0, MATH.Pi * 2);
        context.fillStyle = "red";
        context.fill();
        context.closePath();
        */
        document.getElementById("ball").style.left = x + speedX - RADIUS + "px";
        document.getElementById("ball").style.top = y + speedY - RADIUS + "px";
}

function collisionDetection() {
        x = x + speedX - RADIUS;
        y = y + speedY - RADIUS;
        var ballLeft = document.getElementById("ball").style.left;
        var ballTop = document.getElementById("ball").style.top;

        //if (x > document.getElementById)
}

