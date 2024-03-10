      $(document).ready(function(){
            $(document).on('click', '.up_vote, .up_vote_filled', function() {
                actionUpvote($(this).closest('.main_post')); 
            });

            function actionUpvote(post){
                post.find('.up_vote, .up_vote_filled').toggle();
                currentVoteCount = parseInt(post.find('.num_vote').text());

                if(post.find('.down_vote').is(":hidden")){
                    post.find('.down_vote, .down_vote_filled').toggle();
                    newVoteCount = currentVoteCount + 2;
                    post.find('.num_vote').text(newVoteCount);
                } else {
                    if(post.find('.up_vote').is(":hidden")){
                        newVoteCount = currentVoteCount + 1;
                        post.find('.num_vote').text(newVoteCount);
                    }
                    else {
                        newVoteCount = currentVoteCount - 1;
                        post.find('.num_vote').text(newVoteCount);
                    }
                } 
            }

            $(document).on('click', '.down_vote, .down_vote_filled', function() {
                actionDownvote($(this).closest('.main_post')); 
            });

            function actionDownvote(post){
                post.find('.down_vote, .down_vote_filled').toggle();
                currentVoteCount = parseInt(post.find('.num_vote').text());

                if(post.find('.up_vote').is(":hidden")){
                    post.find('.up_vote, .up_vote_filled').toggle();
                    newVoteCount = currentVoteCount - 2;
                    post.find('.num_vote').text(newVoteCount);
                } else {
                    if(post.find('.down_vote').is(":hidden")){
                        newVoteCount = currentVoteCount - 1;
                        post.find('.num_vote').text(newVoteCount);
                    }
                    else {
                        newVoteCount = currentVoteCount + 1;
                        post.find('.num_vote').text(newVoteCount);
                    }
                } 
            }

            $(document).on('mouseenter', '.up_vote', function() {
                $(this).attr('src', 'CCAPDEV-LOGO-2/16.png');
            }).on('mouseleave', '.up_vote', function() {
                $(this).attr('src', 'CCAPDEV-LOGO-2/2.png');
            });
        
            $(document).on('mouseenter', '.down_vote', function() {
                $(this).attr('src', 'CCAPDEV-LOGO-2/17.png');
            }).on('mouseleave', '.down_vote', function() {
                $(this).attr('src', 'CCAPDEV-LOGO-2/3.png');
            });

            $('.nav-link').click(function(e) {
                e.preventDefault();
                var target = $(this).data('target');
                $('.post-list').html('{{>' + target + '}}');
            });
          
            var templates = {
                posts: $('#template-post').html(),
                comments: $('#template-comment').html(),
                saved: $('#template-save').html(),
                hidden: $('#template-hidden').html(),
                interactions: $('#template-interactions').html()
            };

            

            $(document).ready(function() {
                // Set the initial template content
                var initialTemplate = $('#template-post').html();
                $('#template-container').html(initialTemplate);
    
                // Handle navbar link clicks
                $('.nav-link').click(function(e) {
                    e.preventDefault();
                    $('.nav-link').removeClass('active');
                    $(this).addClass('active');
                    var target = $(this).data('target');
                    $('#template-container').html(templates[target]);
                });
    
                // Set the "active" class for the initial active navbar item
                $('.nav-link[data-target="posts"]').addClass('active');
            });








        }); 

        