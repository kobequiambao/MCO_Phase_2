    
    function navigateToPost(url) {
        if(!event.target.classList.contains('up_vote') && !event.target.classList.contains('down_vote') && !event.target.classList.contains('delete-post-btn')) {
            window.location.href = url;
        }
      }
    
    function toggleDropdown_user() {
        var dropdownContent = document.querySelector('.dropdown-content_user');
        dropdownContent.classList.toggle('show_user');
    }
    
    function toggleDropdown_search() {
        var dropdownContent = document.querySelector('.dropdown-content_search');
        dropdownContent.classList.toggle('show_search');
    }
    function toggleDropdown_banner() {
      var dropdownContent = document.querySelector('.dropdown-content_banner');
      dropdownContent.classList.toggle('show_banner');
  }
    // ------------------------------------------------------------------
    function openLoginForm_create() {
        var modal = document.getElementById("loginFormModal-create");
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
    
    function closeLoginForm_create() {
        var modal = document.getElementById("loginFormModal-create");
        modal.style.display = "none";
        document.body.style.overflow = ""; 
    }
    
    function openLoginForm_edit() {
      var modal = document.getElementById("loginFormModal-edit");
      modal.style.display = "block";
      document.body.style.overflow = "hidden"; 
  }
  
  function closeLoginForm_edit() {
      var modal = document.getElementById("loginFormModal-edit");
      modal.style.display = "none";
      document.body.style.overflow = ""; 
  }

  function submitEdit(postId) {
    var updatedTitle = document.getElementById("title").value;
    var updatedBody = document.getElementById("body").value;

    // Send a POST request to update the post data
    fetch(`/post/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: updatedTitle, body: updatedBody })
    })
     .then(response => {
         if (!response.ok) {
             throw new Error('Failed to update post');
         }
         // Handle success
         console.log('Post updated successfully');
         // Redirect to the updated post page or any other appropriate action
         window.location.href = `/post/${postId}`;
         closeLoginForm_edit();
     })
     .catch(error => {
         // Handle error
         console.error(error);
     });
 }

  function openLoginForm_delete() {
    var modal = document.getElementById("loginFormModal-delete");
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; 
}

function closeLoginForm_delete() {
    var modal = document.getElementById("loginFormModal-delete");
    modal.style.display = "none";
    document.body.style.overflow = ""; 
}


      window.onclick = function(event) {
        var modal = document.getElementById("loginFormModal-create");
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
      window.onclick = function(event) {
        var modal = document.getElementById("loginFormModal-edit");
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
      window.onclick = function(event) {
        var modal = document.getElementById("loginFormModal-delete");
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }



      function openForm() {
            
        document.getElementById("popup").style.display = "block";
      }
      
      function closeForm() {
        document.getElementById("popup").style.display = "none";
      }



      function handleDelete(event) {
        event.stopPropagation();
        openForm();
      }
    
    
    document.getElementById('shareButton').addEventListener('click', function() {
      var url = window.location.href;
    
      var input = document.createElement('input');
      input.style.position = 'fixed';
      input.style.opacity = 0;
      input.value = url;
    
      document.body.appendChild(input);
    
      input.select();
    
  
      document.execCommand('copy');
    
      document.body.removeChild(input);
    
      alert('Link copied to clipboard: ' + url);
    
      var dummyElement = document.createElement('input');
      dummyElement.style.position = 'fixed';
      dummyElement.style.opacity = 0;
      document.body.appendChild(dummyElement);
      dummyElement.focus();
      document.body.removeChild(dummyElement);
    });

    $(document).ready(function(){
      $('.best').click(function(){
          $('.sort-button').text('Sort By: Best');
      });

      $('.new').click(function(){
          $('.sort-button').text('Sort By: New');
      });
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    loadUserProfile();
});

function loadUserProfile() {
 
    if (userData) {

        // Update header 1 with user profile data
        document.getElementById('headerUserPic').style.backgroundImage = `url('${userProfile.photo}')`;
        document.getElementById('headerUserName').innerText = userProfile.username;
        document.getElementById('headerUserId').innerText = `ID${userProfile.idNo.substring(0, 3)}-${userProfile.college}`;

        // Update header 2 with user profile data
        document.getElementById('headerUserPic2').style.backgroundImage = `url('${userProfile.photo}')`;
        document.getElementById('headerUserName2').innerText = userProfile.username;
        document.getElementById('headerUserId2').innerText = `ID${userProfile.idNumber.substring(0, 3)}-${userProfile.college}`;
    }
}
 
  
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', debounce(function(e) {
      const query = e.target.value.trim();
      if (query.length > 1) { // Only search if there are 2 or more characters
          fetchSearchResults(query);
      } else {
          clearSearchResults(); // Clear results if the query is too short
      }
  }, 250)); // Debounce to reduce the number of requests
});

function fetchSearchResults(query) {
  // Adjust the fetch URL to use your server's search route
  fetch(`/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
  })
  .then(response => response.json())
  .then(data => {
      updateSearchResults(data);
  })
  .catch(error => {
      console.error('Error fetching search data:', error);
  });
}

function updateSearchResults(results) {
  const dropdown = document.getElementById('dropdownSearchResults');
  dropdown.innerHTML = ''; // Clear existing results
  results.forEach(item => {
      const a = document.createElement('a');
      // Use the item's URL and title for the search result entry
      // Modify this part to fit how your search result data is structured
      a.href = `/post/${item._id}`; // Example URL, adjust based on your routing
      a.textContent = item.Title; // Assuming your items have a 'Title' property
      dropdown.appendChild(a);
  });
  dropdown.style.display = results.length ? 'block' : 'none';
}

function clearSearchResults() {
  const dropdown = document.getElementById('dropdownSearchResults');
  dropdown.innerHTML = '';
  dropdown.style.display = 'none';
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
      var context = this, args = arguments;
      var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
  };
}
  
