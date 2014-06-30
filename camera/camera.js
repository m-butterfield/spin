document.addEventListener("DOMContentLoaded", function() {

    var canvas = document.getElementById('videoCanvas'),
        context = canvas.getContext('2d'),
        width = document.body.offsetWidth,
        height = document.body.scrollHeight,
        streaming = false,
        angle = 0,
        video = document.getElementById('video');

    canvas.width = width;
    canvas.height = height;

    navigator.getMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);
    navigator.getMedia({
        video: true,
        audio: false
    }, function (stream) {
        if (navigator.mozGetUserMedia) {
            video.mozSrcObject = stream;
        } else {
            var vendorURL = window.URL || window.webkitURL;
            video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
    }, function (error) {
        console.log("An error occured! " + error);
    });

    var draw = function(vid, can, w, h) {
        can.drawImage(vid, 0, 0, w, h);
        if (angle >= 360) {
            angle = 0;
        }
        angle++;
        rotate(angle);
        setTimeout(draw, 20, vid, can, w, h);
    };

    video.addEventListener('canplay', function (event) {
        if (!streaming) {
            width = video.videoWidth / (video.videoHeight / height);
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            canvas.height = height;
            canvas.width = width;
            draw(this, context, width, height);
            streaming = true;
        }
    }, false);

    var mem_canvas = document.createElement('canvas'),
        mem_context = mem_canvas.getContext('2d');
    mem_canvas.setAttribute('width', width);
    mem_canvas.setAttribute('height', height);

    var rotate = function(angle) {
        mem_context.clearRect(0, 0, width, height);
        mem_context.drawImage(canvas, 0, 0);
        context.clearRect(0, 0, width, height);
        context.save();
        context.translate(width / 2, height / 2);
        context.rotate(angle * Math.PI / 180);
        context.translate(-width / 2, -height / 2);
        context.drawImage(mem_canvas, 0, 0);
        context.restore();
    };

});
