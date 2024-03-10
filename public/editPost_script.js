$(document).ready(function(){
    $('.post-box-container').click(function(){
        const title = $('.title-box').val();
        const body = $('.body-box').val();

        if(title !== '' && body !== '') {
            $('.main_post-desc-title').text(title);
            $('.main_post-desc-content').text(body);
        }

        $('.title-box').val('');
        $('.body-box').val('');
    });
});