$(document).ready(function(){

    function handleImageUpload() {
        // Trigger the file input click event
        $(".create-Post-buttons label").click();
    }

    // Function to handle the selected image and insert it into the body box
    function insertImageIntoBodyBox(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                // Get the image URL
                var imageUrl = e.target.result;

                // Insert the image URL into the body box
                $(".body-box").val($(".body-box").val() + '\n' + imageUrl);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    // Event listener for the "Add Image" button
    $(".addImage").click(function() {
        handleImageUpload();
    });

    // Event listener for the file input change
    $("#imageUpload").change(function() {
        insertImageIntoBodyBox(this);
    });

    $('.post-box-container').click(function(){
        const title = $('.title-box').val();
        const body = $('.body-box').val();
        const flair = $('input[name="flair"]:checked').val();

        if(title !== '' && body !=='') {
            $('.post_list').append(`
            <div class="main_post" id="post-1">    
                
                                <div class = "main_post-top " onclick="navigateToPost('/post')">
                                    <div class = "main_post-desc">
                                        <div class = "main_post-desc-poster">
                                            <div class = "main_post-desc-poster-pic"></div>
                                            <div class = "main_post-desc-poster-name">
                                            u/Kooky_Marketing_3807</div>
                                            <div class = "main_post-desc-banner" id="${flair}">${flair}</div>
                        
            
            
            
                                        </div>
                                        
                                        <div class = "main_post-desc-title">
                                        ${title}</div>
                                        <div class = "main_post-desc-content">
                                            ${body}
                                        </div>
                                    </div>
            
                                    <div class="main_post-buttons">
                                        <div class="main_vote">
                                            <img class="up_vote" src="CCAPDEV-LOGO-2/2.png" alt="">
                                            <img class="up_vote_filled" src="CCAPDEV-LOGO-2/16.png" alt="" hidden>
                                            <span class = "num_vote">0</span>
                                            <img class="down_vote" src="CCAPDEV-LOGO-2/3.png" alt="">
                                            <img class="down_vote_filled" src="CCAPDEV-LOGO-2/17.png" alt="" hidden>
                                        </div>
                                        <div class="button-container">
                                            <div class="main_post-buttons-comment"></div>
                                            <span>Comment</span>
                                        </div>
                                        <div class="button-container">
                                            <div class="main_post-buttons-share"></div>
                                            <span>Share</span>
                                        </div>
            
                                    </div>
                                </div>
                            </div>
            `);
            
        }

        $('.title-box').val('');
        $('.body-box').val('');
        $('input[name="flair"][value="general-question"]').prop('checked', true);
    });
    
});

