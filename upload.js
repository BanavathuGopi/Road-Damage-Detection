document.getElementById('uploadButton').addEventListener('click', function() {
    console.log("clicked")
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select an image to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    fetch('http://localhost:4000/upload_image', {  // Make sure the URL is correct here
        method: 'POST',  // Ensure POST method is used
        body: formData
    })
    .then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Upload successful:', data);
        localStorage.setItem('resultData', JSON.stringify(data));
        window.location.href = 'result.html';
    })
    .catch(error => {
        console.error('Error uploading image:', error); 
    });
});
