/**
 * Created by Lennart on 04-04-17.
 */

class End {

    constructor() {
        this._round = 1;

        this._width = 400;
        this._height = 200;
        this._y = 120;
    }

    get round() {
        return this._round;
    }

    newRound() {
        this._round++;
    }

    checkCollision(canvas, rect) {
        if (rect.x < (canvas.width / 2 - this._width / 2) + this._width && (canvas.width / 2 - this._width / 2) < rect.x + rect.width && rect.y < this._y + this._height) {
            newGame();
        }
    }

    draw(canvas, context, score) {

        context.fillStyle = "#e63a74";
        context.fillRect(canvas.width / 2 - this._width / 2, this._y, this._width, this._height);
        context.font = '20px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('KLAAR!', canvas.width / 2, this._y + 35);
        context.textAlign = "center";
        context.font = '16px Helvetica';
        context.fillText('Je hebt gewonnen met een totale score van:', canvas.width / 2, this._y + 65);
        context.textAlign = "center";

        context.font = '46px Helvetica';
        context.fillText(score.total, canvas.width / 2, this._y + 115);
        context.textAlign = "center";

        context.font = '16px Helvetica';
        context.fillText('punten!', canvas.width / 2, this._y + 140);
        context.textAlign = "center";

        context.font = '12px Helvetica';
        context.fillText('Houd je stick in dit roze vlak om een nieuw spel te starten', canvas.width / 2, this._y + 175);
        context.textAlign = "center";


        context.fill();

    }
}