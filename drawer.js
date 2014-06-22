document.addEventListener("DOMContentLoaded", function() {

    var canvas, context, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false,
        x = "black",
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
        switch (obj.id) {
            case "green":
                x = "green";
                break;
            case "blue":
                x = "blue";
                break;
            case "red":
                x = "red";
                break;
            case "yellow":
                x = "yellow";
                break;
            case "orange":
                x = "orange";
                break;
            case "black":
                x = "black";
                break;
            case "white":
                x = "white";
                break;
        }
        if (x == "white") y = 14;
        else y = 25;

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

    window.erase = function erase() {
        var m = confirm("Want to clear");
        if (m) {
            context.clearRect(0, 0, w, h);
            document.getElementById("canvasimg").style.display = "none";
        }
    }

    window.save = function save() {
        document.getElementById("canvasimg").style.border = "2px solid";
        var dataURL = canvas.toDataURL();
        document.getElementById("canvasimg").src = dataURL;
        document.getElementById("canvasimg").style.display = "inline";
    }

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
