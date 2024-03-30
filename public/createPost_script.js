$(document).ready(function(){
    $('#imageUpload').on('change', function() {
        var file = this.files[0];

        if (file && file.type.startsWith('image/')) { 
            var reader = new FileReader();
            reader.onload = function(e) {
                var imageDataUrl = e.target.result;
                var fileName = file.name;
                
                if (fileName.length > 30) {
                    fileName = fileName.substring(0, 30) + '...';
                }
                
                $('#uploadedImageContainer').css('background-image', 'url(' + imageDataUrl + ')');
                
                $('.file_name').text("Attachment: "+fileName).show();
                $('.src').text(imageDataUrl);
    
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image file.');
            $('#imageUpload').val(''); 
        }
    });

    $('.post-box-container').click(function(){

        
            const userPhoto = `url('${userData.photo}')`;
            const userProfileName = userData.username;

            const title = $('.title-box').val();
            const body = $('.body-box').val();
            const flair = $('input[name="flair"]:checked').val();
            let img = $('.src').text();
            let stats = 'hidden';
        
            if(title !== '' && body !== '') {
                if(img !== '') {
                    stats = '';
                    const image = new Image();
                    image.crossOrigin = "Anonymous";
                    image.src = img;
                    image.onload = function() {
                        const colorThief = new ColorThief();
                        const dominantColor = colorThief.getColor(image);
                        const rgbColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
        
                        prependPost(title, body, flair, img, rgbColor, stats, userProfileName, userPhoto);
                    }
                } else {
                    prependPost(title, body, flair, img, '', stats,userProfileName, userPhoto);
                }
            }
        
            $('.title-box').val('');
            $('.body-box').val('');
            $('input[name="flair"][value="general-question"]').prop('checked', true);
            $('.file_name').text('').hide();
            $('.src').text('');
        
    });
    

    function prependPost(title, body, flair, img, rgbColor, stat, userName, userPic) {
        var currentDate = new Date();

        var day = currentDate.getDate();
        var month = currentDate.toLocaleString('en-US', { month: 'short' });
        var year = currentDate.getFullYear();
  
        currentDate = day + " " + month + " " + year;

        const imgContainer = img !== '' ? `
            <div class="main_post-img-container">
                <div class="blurred-background" style="background-color: ${rgbColor};"></div>
                <img class="main_post-img" src="${img}" alt="" ${stat}>
            </div>` : '';
    
        $('.post_list').prepend(`
            <div class="main_post" id="post-1">
                <div class="main_post-top" onclick="navigateToPost('/post')">
                    <div class="main_post-desc">
                        <div class="main_post-desc-poster">
                            <div class="main_post-desc-poster-pic" style="background-image: ${userPic};"></div>
                            <div class="main_post-desc-poster-name">
                                u/${userName}
                            </div>
                            <div class="main_post-desc-banner" id="${flair}">${flair}</div>
                            <div class="main_post-date">${currentDate}</div>
                        </div>
                        
                        <div class="main_post-desc-title">
                            ${title}
                        </div>
                        <div class="main_post-desc-content">
                            ${body}
                        </div>
                        ${imgContainer}
                    </div>
                    <div class="main_post-buttons">
                        <div class="main_vote">
                            <img class="up_vote" src="CCAPDEV-LOGO-2/2.png" alt="">
                            <img class="up_vote_filled" src="CCAPDEV-LOGO-2/16.png" alt="" hidden>
                            <span class="num_vote">0</span>
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


    




});
