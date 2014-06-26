document.addEventListener("DOMContentLoaded", function() {

    var canvas = document.getElementById('cameraCanvas'),
        pageWidth = 300,
        pageHeight = 300;

    canvas.setAttribute('width', pageWidth.toString());
    canvas.setAttribute('height', pageHeight.toString());

    var streaming = false,
        video = document.getElementById('video'),
        photo = document.getElementById('photo'),
        startButton = document.getElementById('startButton');

    navigator.getMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);
    navigator.getMedia({
        video: true,
        audio: false
    }, function(stream) {
        if (navigator.mozGetUserMedia) {
            video.mozSrcObject = stream;
        } else {
            var vendorURL = window.URL || window.webkitURL;
            video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
    }, function(err) {
        console.log("An error occured! " + err);
    });

    video.addEventListener('canplay', function(event) {
        if (!streaming) {
            video.setAttribute('width', pageWidth.toString());
            video.setAttribute('height', pageHeight.toString());
            streaming = true;
        }
    });

    function takepicture() {
        canvas.getContext('2d').drawImage(video, 0, 0, pageWidth, pageHeight);
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    startButton.addEventListener('click', function(event){
        takepicture();
        event.preventDefault();
    });


});
