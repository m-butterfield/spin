document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('spinnerCanvas'),
        page = document.getElementById('page'),
        pageWidth = document.body.offsetWidth,
        pageHeight = document.body.scrollHeight,
        side = pageWidth < pageHeight ? pageWidth : pageHeight;
    canvas.setAttribute('width', side.toString());
    canvas.setAttribute('height', side.toString());

    var context = canvas.getContext("2d");
    context.clearRect(0, 0, side, side);

    context.fillStyle = "red";
    context.fillRect(side / 4, side / 4, side / 2, side / 4);
    context.fillStyle = "blue";
    context.fillRect(side / 4, side / 2, side / 2, side / 4);

    var mem_canvas = document.createElement('canvas');
    mem_canvas.setAttribute('width', side.toString());
    mem_canvas.setAttribute('height', side.toString());
    var mem_context = mem_canvas.getContext('2d');

    function rotate() {
        mem_context.clearRect(0, 0, side, side);
        mem_context.drawImage(canvas, 0, 0);
        context.clearRect(0, 0, side, side);
        context.save();
        context.translate(side / 2, side / 2);
        context.rotate(Math.PI / 180);
        context.translate(-side / 2, -side / 2);
        context.drawImage(mem_canvas, 0, 0);
        context.restore();
    }
    setInterval(rotate, 10);
});