    
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
        document.body.style.overflow = "hidden"; // Disable scrolling on the body
    }
    
    function closeLoginForm_create() {
        var modal = document.getElementById("loginFormModal-create");
        modal.style.display = "none";
        document.body.style.overflow = ""; // Re-enable scrolling on the body
    }
    
    function openLoginForm_edit() {
      var modal = document.getElementById("loginFormModal-edit");
      modal.style.display = "block";
      document.body.style.overflow = "hidden"; // Disable scrolling on the body
  }
  
  function closeLoginForm_edit() {
      var modal = document.getElementById("loginFormModal-edit");
      modal.style.display = "none";
      document.body.style.overflow = ""; // Re-enable scrolling on the body
  }

  function openLoginForm_delete() {
    var modal = document.getElementById("loginFormModal-delete");
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Disable scrolling on the body
}

function closeLoginForm_delete() {
    var modal = document.getElementById("loginFormModal-delete");
    modal.style.display = "none";
    document.body.style.overflow = ""; // Re-enable scrolling on the body
}








      // Close modal if clicked outside of it
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
    
    

