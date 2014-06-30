document.addEventListener("DOMContentLoaded", function() {

    var canvas = document.getElementById('spinnerCanvas'),
        context = canvas.getContext("2d"),
        pageWidth = document.body.offsetWidth,
        pageHeight = document.body.scrollHeight;

    canvas.setAttribute('width', pageWidth.toString());
    canvas.setAttribute('height', pageHeight.toString());

    var canvasWidth = canvas.width,
        canvasHeight = canvas.height;

    var draw = function() {
        context.beginPath();
        context.moveTo(prevX, prevY);
        context.lineTo(currX, currY);
        context.strokeStyle = lineColor;
        context.lineWidth = lineWidth;
        context.stroke();
        context.closePath();
    };

    var flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dotFlag = false,
        lineColor = "blue",
        lineWidth = 5;

    var findxy = function(res, x, y) {
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = x - canvas.offsetLeft;
            currY = y - canvas.offsetTop;

            flag = true;
            dotFlag = true;
            if (dotFlag) {
                context.beginPath();
                context.fillStyle = lineColor;
                context.fillRect(currX, currY, 2, 2);
                context.closePath();
                dotFlag = false;
            }
        }
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = x - canvas.offsetLeft;
                currY = y - canvas.offsetTop;
                draw();
            }
        }
    };

    canvas.addEventListener("mousemove", function (event) {
        findxy('move', event.clientX, event.clientY);
    });
    canvas.addEventListener("mousedown", function (event) {
        findxy('down', event.clientX, event.clientY);
    });
    canvas.addEventListener("mouseup", function (event) {
        findxy('up', event.clientX, event.clientY);
    });
    canvas.addEventListener("mouseout", function (event) {
        findxy('out', event);
    });
    canvas.addEventListener("touchmove", function (event) {
        event.preventDefault();
        findxy('move', event.changedTouches[0].pageX, event.changedTouches[0].pageY);
    });
    canvas.addEventListener("touchstart", function (event) {
        event.preventDefault();
        findxy('down', event.changedTouches[0].pageX, event.changedTouches[0].pageY);
    });
    canvas.addEventListener("touchend", function (event) {
        event.preventDefault();
        findxy('up', event.changedTouches[0].pageX, event.changedTouches[0].pageY);
    });

    var color = function(event) {
        lineColor = event.target.id;
    };
    var colors = document.getElementsByClassName('color-swatch');
    for (var i = 0; i < colors.length; i++) {
        colors[i].addEventListener('click', color);
    }

    var clearButton = document.getElementById('clear-button');
    clearButton.addEventListener("click", function() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
    });

    var angle = 45;
    var angleInput = document.getElementById('angle-input');
    angleInput.value = angle;
    angleInput.addEventListener('change', function(event) {
        if (Number(event.target.value) < 0 ) {
            event.target.value = 0;
            return;
        }
        if (Number(event.target.value) > 360) {
            event.target.value = 360;
            return;
        }
        angle = event.target.value;
    });

    var speed = 50;
    var speedInput = document.getElementById('speed-input');
    speedInput.value = speed;
    speedInput.addEventListener('change', function(event) {
        if (Number(event.target.value) < 0 ) {
            event.target.value = 0;
            return;
        }
        if (Number(event.target.value) > 5000) {
            event.target.value = 5000;
            return;
        }
        speed = event.target.value;
        clearInterval(interval);
        interval = setInterval(rotate, speed);
    });

    var lineWidthInput = document.getElementById('line-width');
    lineWidthInput.value = lineWidth;
    lineWidthInput.addEventListener('change', function(event) {
        lineWidth = event.target.value;
    });

    var mem_canvas = document.createElement('canvas');
    mem_canvas.setAttribute('width', canvasWidth.toString());
    mem_canvas.setAttribute('height', canvasHeight.toString());
    var mem_context = mem_canvas.getContext('2d');

    var rotate = function() {
        mem_context.clearRect(0, 0, canvasWidth, canvasHeight);
        mem_context.drawImage(canvas, 0, 0);
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.save();
        context.translate(canvasWidth / 2, canvasHeight / 2);
        context.rotate(angle * Math.PI / 180);
        context.translate(-canvasWidth / 2, -canvasHeight / 2);
        // this will gradually fade out the lines that are drawn
        // if we ever want to do that
        // context.globalAlpha = 0.98;
        context.drawImage(mem_canvas, 0, 0);
        context.restore();
    };
    var interval = setInterval(rotate, speed);

});
