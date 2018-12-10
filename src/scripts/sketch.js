let socket;
let off = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    socket = io();
    socket.on('mouse', newDrawing);
    background('#000000');
}

function newDrawing(data) {
    let sizeData = {
        x: map(noise(off), 0, 1, 25, 200)
    }

    off += 0.025;

    textSize(sizeData.x);
    text(emojis[Math.floor(Math.random() * emojis.length)], data.x - 50, data.y + 50);
}

mouseDragged = mouseClicked = touchMoved = touchStarted = function () {
    let data = {
        x: mouseX,
        y: mouseY
    }
    let sizeData = {
        x: map(noise(off), 0, 1, 25, 200)
    }

    off += 0.025;

    textSize(sizeData.x);
    text(emojis[Math.floor(Math.random() * emojis.length)], mouseX - 50, mouseY + 50);
    socket.emit('mouse', data);
}

$(document).ready(function () {
    window.setInterval(function () {
        let words = ["Text Message", "iMessage", "Type a message", "Your message", "No connections yet!", "Search or enter website"];
        let word = words[Math.floor(Math.random() * words.length)];
        $(".instructions").html(word);
    }, 1000);
});

function preventBehavior(e) {
    e.preventDefault();
};

document.addEventListener("touchmove", preventBehavior, {
    passive: false
});