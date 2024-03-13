$(document).ready(function(){
        $('#registrationForm').submit(function (event) {
            event.preventDefault();
            const emailInput = $('#emailInput');
            const usernameInput = $('#usernameInput');
            const termsCheckbox = $('#termsCheckbox');
    
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.val())) {
                $('#emailError').text('Invalid email address');
                return;
            } else {
                $('#emailError').text('');
            }
    
            if (usernameInput.val().length > 15) {
                alert('Username must be 15 characters or less');
                return;
            }
    
            if (!termsCheckbox.prop('checked')) {
                alert('Please agree to the terms and conditions');
                return;
            }
    
            this.submit();
        });

        $(document).ready(function(){
            $('#loginForm').submit(function (event) {
               
                event.preventDefault();
        
                const usernameInput = $('#usernameInput');
                const passwordInput = $('#passwordInput');
        
           
                if (usernameInput.val().length === 0) {
                    alert('Please enter a username');
                    return;
                }
        
              
                if (passwordInput.val().length === 0) {
                    alert('Please enter a password');
                    return;
                }
        
                
                this.submit();
            });
        });
    });