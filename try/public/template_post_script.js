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

            
        }); 