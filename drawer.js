document.addEventListener("DOMContentLoaded", function() {

    var canvas, context, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false,
        x = "blue",
        y = 2,
        interval;


    canvas = document.getElementById('spinnerCanvas');
    context = canvas.getContext("2d");

    var pageWidth = document.body.offsetWidth,
        pageHeight = document.body.scrollHeight;
    canvas.setAttribute('width', pageWidth.toString());
    canvas.setAttribute('height', pageHeight.toString());

    var w = canvas.width;
    var h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    });
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    });
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    });
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    });

    var color = function(event) {
        x = event.target.id;
    };
    var colors = document.getElementsByClassName('color-swatch');
    for (var i = 0; i < colors.length; i++) {
        colors[i].addEventListener('click', color);
    }

    function draw() {
        context.beginPath();
        context.moveTo(prevX, prevY);
        context.lineTo(currX, currY);
        context.strokeStyle = x;
        context.lineHeight = y;
        context.lineWidth = 3;
        context.stroke();
        context.closePath();
    }

    var button = document.getElementById('clear-button');
    button.addEventListener("click", function() {
        context.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    });

    function findxy(res, e) {
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;

            flag = true;
            dot_flag = true;
            if (dot_flag) {
                context.beginPath();
                context.fillStyle = x;
                context.fillRect(currX, currY, 2, 2);
                context.closePath();
                dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                draw();
            }
        }
    }

    var mem_canvas = document.createElement('canvas');
    mem_canvas.setAttribute('width', w.toString());
    mem_canvas.setAttribute('height', h.toString());
    var mem_context = mem_canvas.getContext('2d');

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

    function rotate() {
        mem_context.clearRect(0, 0, w, h);
        mem_context.drawImage(canvas, 0, 0);
        context.clearRect(0, 0, w, h);
        context.save();
        context.translate(w / 2, h / 2);
        context.rotate(angle * Math.PI / 180);
        context.translate(-w / 2, -h / 2);
        context.globalAlpha = 0.98;
        context.drawImage(mem_canvas, 0, 0);
        context.restore();
    }
    interval = setInterval(rotate, speed);

});
