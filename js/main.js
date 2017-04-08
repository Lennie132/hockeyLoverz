/**
 * Created by Lennart on 26-03-17.
 */

// let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let game = new Game(canvas, context);

window.onload = () => {

    let tracker = new tracking.ColorTracker(['yellow']);

    tracking.track('#video', tracker, {camera: true});

    // Game Time - loop
    tracker.on('track', event => {

        context.clearRect(0, 0, canvas.width, canvas.height);

        game.draw(canvas, context);

        event.data.forEach(function (rect) {
            context.strokeStyle = rect.color;
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
           // context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
           // context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

            if (!game.finished) {
                if (!game.pause) {
                    game.checkCollision(rect);
                } else {
                    game._round.checkCollision(canvas, rect, game);
                }
            } else {
                game._end.checkCollision(canvas, rect);
            }
        });

    });

    // Get the webcam's stream. (FOR GREEN SCREEN)
    //navigator.getUserMedia({video: true}, startStream, () => {
    //});
};

function newGame() {
    game = new Game(canvas, context);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//
// function startStream(stream) {
//     video.src = URL.createObjectURL(stream);
//     video.play();
//
// }
//
// function drawGreenScreen() {
//     let frame = readFrame();
//     //
//     // if (frame) {
//     //     replaceGreen(frame.data);
//     //     context.putImageData(frame, 0, 0);
//     // }
//
// }
//
// function readFrame() {
//     try {
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     } catch (e) {
//         // The video may not be ready, yet.
//         return null;
//     }
//
//     return context.getImageData(0, 0, canvas.width, canvas.height);
// }
//
// function replaceGreen(data) {
//
//     //console.log(data);
//
//     let len = data.length;
//
//     for (let i = 0, j = 0; j < len; i++, j += 4) {
//         // Convert from RGB to HSL...
//         let hsl = rgb2hsl(data[j], data[j + 1], data[j + 2]);
//         let h = hsl[0], s = hsl[1], l = hsl[2];
//
//         // ... and check if we have a somewhat green pixel.
//         if (h >= 90 && h <= 160 && s >= 25 && s <= 90 && l >= 20 && l <= 75) {
//             data[j + 3] = 0;
//         }
//     }
// }
//
// function rgb2hsl(r, g, b) {
//     r /= 255;
//     g /= 255;
//     b /= 255;
//
//     let min = Math.min(r, g, b);
//     let max = Math.max(r, g, b);
//     let delta = max - min;
//     let h, s, l;
//
//     if (max === min) {
//         h = 0;
//     } else if (r === max) {
//         h = (g - b) / delta;
//     } else if (g === max) {
//         h = 2 + (b - r) / delta;
//     } else if (b === max) {
//         h = 4 + (r - g) / delta;
//     }
//
//     h = Math.min(h * 60, 360);
//
//     if (h < 0) {
//         h += 360;
//     }
//
//     l = (min + max) / 2;
//
//     if (max === min) {
//         s = 0;
//     } else if (l <= 0.5) {
//         s = delta / (max + min);
//     } else {
//         s = delta / (2 - max - min);
//     }
//
//     return [h, s * 100, l * 100];
// }
