    
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
    function openLoginForm() {
        var modal = document.getElementById("loginFormModal");
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Disable scrolling on the body
    }
    
    function closeLoginForm() {
        var modal = document.getElementById("loginFormModal");
        modal.style.display = "none";
        document.body.style.overflow = ""; // Re-enable scrolling on the body
    }
    
      
      // Close modal if clicked outside of it
      window.onclick = function(event) {
        var modal = document.getElementById("loginFormModal");
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
    
