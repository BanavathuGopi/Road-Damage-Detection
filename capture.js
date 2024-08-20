document.addEventListener('DOMContentLoaded', function() {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    let stream;

    function startCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(mediaStream => {
                stream = mediaStream;
                video.srcObject = stream;
                video.play();
            })
            .catch(error => {
                console.error('Error accessing the camera:', error);
            });
    }
    function captureAndRedirect() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        const imageDataUrl = canvas.toDataURL('image/png');
        localStorage.setItem('capturedImage', imageDataUrl);
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        window.location.href = 'result.html';
    }
    document.getElementById('capture').addEventListener('click', function() {
        
        startCamera();

       
        video.addEventListener('playing', function() {
            captureAndRedirect();
        }, { once: true });
    });
});
