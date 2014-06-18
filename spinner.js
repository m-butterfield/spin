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

    function rotate() {
        context.save();
        context.translate(side / 2, side / 2);
        context.rotate(Math.PI / 180);
        context.translate(-side / 2, -side / 2);
        context.drawImage(canvas, 0, 0);
        context.restore();
    }
    setInterval(rotate, 24);
});