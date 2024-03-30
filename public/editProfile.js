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

function loadUserProfile() {
    if (userData) {
        document.querySelector('input[placeholder="Username"]').value = userData.username;
        document.querySelector('input[placeholder="ID Number"]').value = userData.idNumber;
        document.getElementById('college').value = userData.college;
        document.querySelector('input[placeholder="Bio"]').value = userData.bio;
        document.getElementById('preview').src = userData.photo;
        document.getElementById('headerUserPic').style.backgroundImage = `url('${userData.photo}')`;
        document.getElementById('headerUserName').innerText = userData.username;
        document.getElementById('headerUserId').innerText = `ID${userData.idNumber.substring(0, 3)}-${userData.college}`;
    }
}



function saveChanges() {
    const usernameInput = document.querySelector('input[placeholder="Username"]');
    const idNumberInput = document.querySelector('input[placeholder="ID Number"]');
    const collegeSelect = document.getElementById('college');
    const bioInput = document.querySelector('input[placeholder="Bio"');

    const username = usernameInput.value;
    const idNumber = idNumberInput.value;
    const firstThreeDigits = idNumber.length >= 3 ? idNumber.substring(0, 3) : '';
    const selectedCollege = collegeSelect.value;
    const bio = bioInput.value;

    const userProfile = {
        username: username,
        idNumber: idNumber,
        college: selectedCollege,
        photo: document.getElementById('preview').src,
        bio: bio,
    };
    const photo = document.getElementById('preview').src;
    const idNo = idNumber;
    const college = selectedCollege;
    fetch('/updateProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, idNo, college, bio, photo})
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

    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    document.getElementById('headerUserPic').style.backgroundImage = `url('${userProfile.photo}')`;
    document.getElementById('headerUserName').innerText = userProfile.username;
    document.getElementById('headerUserId').innerText = `ID${firstThreeDigits}-${selectedCollege}`;

    usernameInput.value = userProfile.username;
    idNumberInput.value = userProfile.idNumber;
    collegeSelect.value = userProfile.college;
    bioInput.value = userProfile.bio;

    document.getElementById('preview').src = userProfile.photo;

    document.getElementById('fileName').classList.add('visually-hidden');
}


