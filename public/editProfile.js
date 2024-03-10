function displayFileName() {
    var fileInput = document.getElementById('fileInput');
    var fileNameSpan = document.getElementById('fileName');

    fileNameSpan.textContent = fileInput.files[0].name;

    // Update the preview image
    var previewImage = document.getElementById('preview');

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            previewImage.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}

function resetPreview() {
    var previewImage = document.getElementById('preview');
    previewImage.src = 'ADD-ONS/profilepic.jpg';

    var fileNameSpan = document.getElementById('fileName');
    fileNameSpan.textContent = 'No file chosen';
}