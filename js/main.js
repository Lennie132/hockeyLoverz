window.onload = () => {
    initialize();
};

let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let tracker = new tracking.ColorTracker();

let balls = [];


function initialize() {

    balls.push(new Ball(100, 100));
    balls.push(new Ball(250, 100));

    let colors = new tracking.ColorTracker(['yellow']);
    tracking.track('#video', colors, {camera: true});

    // Get the webcam's stream.
    navigator.getUserMedia({video: true}, startStream, () => {});

    colors.on('track', event => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        draw();

        event.data.forEach(function (rect) {
            if (rect.color === 'custom') {
                rect.color = tracker.customColor;
            }

            context.strokeStyle = rect.color;
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

            balls.forEach(ball => {
                if (ball.directionY > 0) {
                    if (checkCollision(ball, rect)) {
                        ball.directionY = -ball.directionY;
                    }
                }
            });
        });

    });
}

function drawBalls() {
    balls.forEach(ball => {
        ball.draw(context, canvas);
    });
}

function checkCollision(ball, rect) {

    let distX = Math.abs(ball.x - rect.x - rect.width / 2);
    let distY = Math.abs(ball.y - rect.y - rect.height / 2);

    if (distX > (rect.width / 2 + ball.width)) {
        return false;
    }
    if (distY > (rect.height / 2 + ball.height)) {
        return false;
    }

    if (distX <= (rect.width / 2)) {
        return true;
    }
    if (distY <= (rect.height / 2)) {
        return true;
    }
}

function startStream(stream) {
    video.src = URL.createObjectURL(stream);
    video.play();

}

function draw() {
     let frame = readFrame();

    if (frame) {
        replaceGreen(frame.data);
        context.putImageData(frame, 0, 0);
    }

    drawBalls();


}

function readFrame() {
    try {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    } catch (e) {
        // The video may not be ready, yet.
        return null;
    }

    return context.getImageData(0, 0, canvas.width, canvas.height);
}

function replaceGreen(data) {

    //console.log(data);

    let len = data.length;

    for (let i = 0, j = 0; j < len; i++, j += 4) {
        // Convert from RGB to HSL...
        let hsl = rgb2hsl(data[j], data[j + 1], data[j + 2]);
        let h = hsl[0], s = hsl[1], l = hsl[2];

        // ... and check if we have a somewhat green pixel.
        if (h >= 90 && h <= 160 && s >= 25 && s <= 90 && l >= 20 && l <= 75) {
            data[j + 3] = 0;
        }
    }
}

function rgb2hsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    let min = Math.min(r, g, b);
    let max = Math.max(r, g, b);
    let delta = max - min;
    let h, s, l;

    if (max === min) {
        h = 0;
    } else if (r === max) {
        h = (g - b) / delta;
    } else if (g === max) {
        h = 2 + (b - r) / delta;
    } else if (b === max) {
        h = 4 + (r - g) / delta;
    }

    h = Math.min(h * 60, 360);

    if (h < 0) {
        h += 360;
    }

    l = (min + max) / 2;

    if (max === min) {
        s = 0;
    } else if (l <= 0.5) {
        s = delta / (max + min);
    } else {
        s = delta / (2 - max - min);
    }

    return [h, s * 100, l * 100];
}
