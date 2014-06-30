document.addEventListener("DOMContentLoaded", function() {


    var canvas = document.getElementById('videoCanvas'),
        context = canvas.getContext('2d'),
        width = document.body.offsetWidth,
        height = document.body.scrollHeight;

    canvas.width = width;
    canvas.height = height;

    var streaming = false,
        video = document.getElementById('video');

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

    video.addEventListener('canplay', function (event) {
        if (!streaming) {
            calcWidth = video.videoWidth / (video.videoHeight / height);
            video.setAttribute('width', calcWidth);
            video.setAttribute('height', height);
            streaming = true;
            draw(this, context, width, height);
        }
    }, false);

    function draw(vid, can, w, h) {
        can.drawImage(vid, 0, 0, w, h);
        setTimeout(draw, 20, vid, can, w, h);
    }

    video.addEventListener('canplay', function (event) {
        if (!streaming) {
            width = video.videoWidth / (video.videoHeight / height);
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            streaming = true;
            draw(this, context, width, height);
        }
    }, false);

});
