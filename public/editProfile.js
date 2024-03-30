function displayFileName() {
    var fileInput = document.getElementById('fileInput');
    var fileNameSpan = document.getElementById('fileName');

    fileNameSpan.textContent = fileInput.files[0].name;

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
    document.getElementById('fileInput').value = '';

    document.getElementById('preview').src = 'ADD-ONS/profilepic.jpg';

    document.getElementById('fileName').classList.add('visually-hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    loadUserProfile();
});





function saveChanges() {
    const emailInput = document.querySelector('input[placeholder="Email"]');
    const idNumberInput = document.querySelector('input[placeholder="ID Number"]');
    const collegeSelect = document.getElementById('college');
    const bioInput = document.querySelector('input[placeholder="Bio"');

    const email = emailInput.value;
    const idNumber = idNumberInput.value;
    const firstThreeDigits = idNumber.length >= 3 ? idNumber.substring(0, 3) : '';
    const selectedCollege = collegeSelect.value;
    const bio = bioInput.value;

    const userProfile = {
        email: email,
        idNumber: idNumber,
        college: selectedCollege,
        photo: document.getElementById('preview').src,
        bio: bio,
        username:userData.username
    };
    const photo = document.getElementById('preview').src;
    const idNo = idNumber;
    const college = selectedCollege;
    fetch('/updateProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, idNo, college, bio, photo})
    })
    .then(response => {
        if (response.ok) {
            
            window.location.href = '/general';
        } else {
            console.error('Failed to save changes:', response.statusText);
            
        }
    })
    .catch(error => {
        console.error('Error saving changes:', error);
       
    });

}


