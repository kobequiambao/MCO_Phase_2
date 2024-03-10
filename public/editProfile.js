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
    // Reset the file input value
    document.getElementById('fileInput').value = '';

    // Reset the preview image
    document.getElementById('preview').src = 'ADD-ONS/profilepic.jpg';

    // Hide the file name span
    document.getElementById('fileName').classList.add('visually-hidden');
}

// Load user profile from local storage on page load
document.addEventListener('DOMContentLoaded', function () {
    loadUserProfile();
});

function loadUserProfile() {
    const storedProfileData = localStorage.getItem('userProfile');
    if (storedProfileData) {
        const userProfile = JSON.parse(storedProfileData);

        // Set profile data to form fields
        document.querySelector('input[placeholder="Username"]').value = userProfile.username;
        document.querySelector('input[placeholder="ID Number"]').value = userProfile.idNumber;

        // Set the selected college in the form
        document.getElementById('college').value = userProfile.college;

        // Set bio in the form
        document.querySelector('input[placeholder="Bio"]').value = userProfile.bio;

        // Display profile picture
        document.getElementById('preview').src = userProfile.photo;

        // Update header with user profile data
        document.getElementById('headerUserPic').style.backgroundImage = `url('${userProfile.photo}')`;
        document.getElementById('headerUserName').innerText = userProfile.username;
        document.getElementById('headerUserId').innerText = `ID${userProfile.idNumber.substring(0, 3)}-${userProfile.college}`;
    }
}

function saveChanges() {
    // Retrieve form data
    const usernameInput = document.querySelector('input[placeholder="Username"]');
    const idNumberInput = document.querySelector('input[placeholder="ID Number"]');
    const collegeSelect = document.getElementById('college');
    const bioInput = document.querySelector('input[placeholder="Bio"');

    const username = usernameInput.value;
    const idNumber = idNumberInput.value;
    const firstThreeDigits = idNumber.length >= 3 ? idNumber.substring(0, 3) : '';
    const selectedCollege = collegeSelect.value;
    const bio = bioInput.value;

    // Save data to local storage
    const userProfile = {
        username: username,
        idNumber: idNumber,
        college: selectedCollege,
        photo: document.getElementById('preview').src,
        bio: bio,
    };

    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    // Update header with the new profile data
    document.getElementById('headerUserPic').style.backgroundImage = `url('${userProfile.photo}')`;
    document.getElementById('headerUserName').innerText = username;
    document.getElementById('headerUserId').innerText = `ID${firstThreeDigits}-${selectedCollege}`;

    // Reset form fields
    usernameInput.value = '';
    idNumberInput.value = '';
    collegeSelect.value = '';
    bioInput.value = '';
    document.getElementById('preview').src = 'ADD-ONS/profilepic.jpg';

    // Hide the file name span
    document.getElementById('fileName').classList.add('visually-hidden');
}


