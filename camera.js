document.addEventListener("DOMContentLoaded", function() {

    var canvas = document.getElementById('videoCanvas'),
        context = canvas.getContext('2d'),
        width = document.body.offsetWidth,
        height = document.body.scrollHeight,
        streaming = false,
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

});
