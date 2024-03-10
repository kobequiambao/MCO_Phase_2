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

        // Display profile picture
        document.getElementById('preview').src = userProfile.photo;

        // Update header with user profile data
        document.getElementById('headerUserPic').style.backgroundImage = `url('${userProfile.photo}')`;
        document.getElementById('headerUserName').innerText = userProfile.username;
        document.getElementById('headerUserId').innerText = `ID${userProfile.idNumber.substring(0, 3)}-${userProfile.college}`;
    }
}

// Function to save changes to local storage
function saveChanges() {
    // Retrieve form data
    const username = document.querySelector('input[placeholder="Username"]').value;
    const idNumberInput = document.querySelector('input[placeholder="ID Number"]');
    const idNumber = idNumberInput.value;

    // Ensure ID number has at least three characters
    const firstThreeDigits = idNumber.length >= 3 ? idNumber.substring(0, 3) : '';

    // Get the selected college
    const selectedCollege = document.getElementById('college').value;

    // Save data to local storage
    const userProfile = {
        username: username,
        idNumber: idNumber,
        college: selectedCollege, // Add the selected college to the user profile
        // Add other fields as needed
        photo: document.getElementById('preview').src, // Assuming the photo is stored in 'preview' element
    };

    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    // Update header with the new profile data
    document.getElementById('headerUserPic').style.backgroundImage = `url('${userProfile.photo}')`;
    document.getElementById('headerUserName').innerText = username;
    document.getElementById('headerUserId').innerText = `ID${firstThreeDigits}-${selectedCollege}`;
}

