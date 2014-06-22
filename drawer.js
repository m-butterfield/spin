document.addEventListener("DOMContentLoaded", function() {

    var canvas, context, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false,
        x = "blue",
        y = 2;


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
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);


    window.color = function color(obj) {
        x = obj.id;
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

    function rotate() {
        mem_context.clearRect(0, 0, w, h);
        mem_context.drawImage(canvas, 0, 0);
        context.clearRect(0, 0, w, h);
        context.save();
        context.translate(w / 2, h / 2);
        context.rotate(45 * Math.PI / 180);
        context.translate(-w / 2, -h / 2);
        context.drawImage(mem_canvas, 0, 0);
        context.restore();
    }
    setInterval(rotate, 50);

});
