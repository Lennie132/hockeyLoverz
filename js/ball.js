/**
 * Created by Lennart on 27-03-17.
 */

class Ball {

    constructor(x, y) {
        this._size = 20;
        this._directionX = 2;
        this._directionY = 10;
        this._x = x;
        this._y = y;
    }


    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }

    get directionX() {
        return this._directionX;
    }

    set directionX(value) {
        this._directionX = value;
    }

    get directionY() {
        return this._directionY;
    }

    set directionY(value) {
        this._directionY = value;
    }

    draw(context, canvas) {

        this.checkBounds(canvas);

        context.beginPath();
        context.fillStyle = "#d62926";
        context.arc(this._x, this._y, this._size, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }

    checkBounds(canvas) {
        // Boundary Logic
        if (this._x < 0 || this._x > canvas.width) this._directionX = -this._directionX;
        if (this._y < 0 || this._y > canvas.height) this._directionY = -this._directionY;
        this._x += this._directionX;
        this._y += this._directionY;
    }
}