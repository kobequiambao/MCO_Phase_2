// : Write your code below
$(document).ready(function () {

    $(document).on('mouseenter', '.up_vote', function() {
        $(this).attr('src', '/CCAPDEV-LOGO-2/16.png');
    }).on('mouseleave', '.up_vote', function() {
        $(this).attr('src', '/CCAPDEV-LOGO-2/2.png');
    });
  
    $(document).on('mouseenter', '.down_vote', function() {
        $(this).attr('src', '/CCAPDEV-LOGO-2/17.png');
    }).on('mouseleave', '.down_vote', function() {
        $(this).attr('src', '/CCAPDEV-LOGO-2/3.png');
    });

    $('.up_vote, .up_vote_filled').click(function () {
        $('.up_vote').toggle();
        $('.up_vote_filled').toggle();

        var currentVoteCount = parseInt($('.num_vote').text());
        var newVoteCount;
        
        if($('.down_vote').is(":hidden")){
            $('.down_vote').toggle();
            $('.down_vote_filled').toggle();
            newVoteCount = currentVoteCount + 2;
            $('.num_vote').text(newVoteCount);
        } else {
            if($('.up_vote').is(":hidden")){
                newVoteCount = currentVoteCount + 1;
                $('.num_vote').text(newVoteCount);
            }
            else {
                newVoteCount = currentVoteCount - 1;
                $('.num_vote').text(newVoteCount);
            }
        }
    });

    $('.down_vote, .down_vote_filled').click( function () {
        $('.down_vote').toggle();
        $('.down_vote_filled').toggle();

        var currentVoteCount = parseInt($('.num_vote').text());
        var newVoteCount;
        
        if($('.up_vote').is(":hidden")){
            $('.up_vote').toggle();
            $('.up_vote_filled').toggle();
            newVoteCount = currentVoteCount - 2;
            $('.num_vote').text(newVoteCount);
        } else {
            if($('.down_vote').is(":hidden")){
                newVoteCount = currentVoteCount - 1;
                $('.num_vote').text(newVoteCount);
            }
            else {
                newVoteCount = currentVoteCount + 1;
                $('.num_vote').text(newVoteCount);
            }
        }
    });
      
    $("#save").click(function(){
        $('.main_post-buttons-save').toggle();
        $('.main_post-buttons-save-filled').toggle();
      });
    
      
    $(".submit-comment-button").click(function(){
       
            const userProfile = userData;

            const userPhoto = `url('${userProfile.photo}')`;
            const userProfileName = userProfile.username;
      var userName = $(".header_1-user-name").text();
      var comment = $(".comment-box").val();
      var currentDate = new Date();

      var day = currentDate.getDate();
      var month = currentDate.toLocaleString('en-US', { month: 'short' });
      var year = currentDate.getFullYear();

      currentDate = day + " " + month + " " + year;

      var PostId = getPostIdFromURL();

      if(comment !== "") {
      $('.comment-section').append(`
      <div class="comment-container">
                  <div class="comment-profile">
                      <div class=userpfp  style="background-image: ${userPhoto};"></div>
                      <span class="threadline">|</span>
                  </div>
                  <div class="comment-info-container">
                      <div class="info-comment">
                          <p class="comment-by">${userName}</p> <span class="posted-time">&#xb7; ${currentDate}</span>
                      </div>
                      <div class="comment-body">
                          <p class="comment-text">${comment}</p>
                      </div>
                      <div class="comment-section-icons">
                          <img class="upvote-icon" src="/CCAPDEV-LOGO-2/2.png">
                          <img class="upvote-icon-filled" src="/CCAPDEV-LOGO-2/16.png" hidden>

                          <span class="vote-count">0</span>


                          <img class="downvote-icon" src="/CCAPDEV-LOGO-2/3.png">
                          <img class="downvote-icon-filled" src="/CCAPDEV-LOGO-2/17.png" hidden>


                          <div class="reply-container">
                              <button class="reply-button">
                                  <span class="reply-text">Reply</span>
                              </button>
                          </div>                 
                      </div>
                      <textarea class="reply-textarea" hidden></textarea>
                      <button class="comment-button" hidden>Comment</button>
                      <button class="cancel-button" hidden>Cancel</button>
                  </div>
                  <div class="reply-section"></div>
              </div>
      `);

    fetch('/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({comment, currentDate, PostId})
    })
    .then(response => {
        if (response.ok) {
        } else {
            console.error('Failed to save changes:', response.statusText);
            
        }
    })
    .catch(error => {
        console.error('Error saving changes:', error);
       
    });
      
      $(".num_comment").text(parseInt($(".num_comment").text()) + 1);
      }
      
      
      $(".comment-box").val("");
    });

    function getPostIdFromURL() {
    // Get the current URL
    const url = window.location.href;
    
    // Split the URL by '/' and get the last part which should be the postId
    const parts = url.split('/');
    const postIdIndex = parts.indexOf('post') + 1;

    // Check if postIdIndex is valid and return the postId if found
    if (postIdIndex > 0 && postIdIndex < parts.length) {
        return String(parts[postIdIndex]);
    } else {
        // Return null or handle the case where postId is not found in the URL
        return null;
    }
}


    $(".cancel-comment-button").click(function(){
      $('.comment-box').val('');
    });

    $(".main_post-buttons").on("click", ".button-container", function () {
        var mainMasterPost = $(this).closest('.main_master_post-top');

        var replyTextarea = mainMasterPost.find('.reply-textarea');
        var commentButton = mainMasterPost.find('.comment-button');
        var cancelButton = mainMasterPost.find('.cancel-button');

        replyTextarea.toggle();
        commentButton.toggle();
        cancelButton.toggle();
    });

    // Event handler for reply button
$(".comment-section").on("click", ".reply-button", function () {
    // Find the closest comment-info-container from the clicked button to toggle elements within it
    var actionContainer = $(this).closest('.comment-info-container');
    toggleReply(actionContainer);
});

// Event handler for cancel button
$(".comment-section").on("click", ".cancel-button", function () {
    // Similarly, find the closest comment-info-container
    var actionContainer = $(this).closest('.comment-info-container');
    toggleReply(actionContainer);
});

// Adjusted function to toggle reply-related elements
function toggleReply(actionContainer) {
    // Toggle only within the specific action container, not affecting other sections
    actionContainer.find('.reply-textarea').toggle();
    actionContainer.find('.comment-button').toggle();
    actionContainer.find('.cancel-button').toggle();
}


    $(".comment-section").on("click", ".comment-button", function () {
      appendReply($(this).closest('.comment-container'));
      var actionContainer = $(this).closest('.comment-info-container');
      toggleReply(actionContainer);
    });
    
    function appendReply(commentButton) {
        
        const userProfile = userData;
    
        const userPhoto = `url('${userProfile.photo}')`; 
        const userProfileName = userProfile.username; 
    
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.toLocaleString('en-US', { month: 'short' });
        let year = currentDate.getFullYear();
        currentDate = `${day} ${month} ${year}`;
    
        let commentByValue = commentButton.closest(".comment-container").find(".comment-by").first().text();
        let commentText = commentButton.closest(".comment-container").find(".comment-text").first().text();
        let commentVotecount = commentButton.closest(".comment-container").find(".vote-count").first().text();
        let comment = commentButton.closest(".comment-container").find(".reply-textarea").val();
    
        if (comment !== "") {
            // Correctly target either the nearest .reply-section within the current .comment-container
            // or find the .reply-section in the parent .comment-container if this is a nested reply
            let replySection = commentButton.closest(".comment-container").find('.reply-section').first();
    
            if (replySection.length === 0) {
                // If there's no .reply-section within the current .comment-container, this is a top-level comment,
                // so append the reply to the .reply-section of the parent .comment-container
                replySection = commentButton.closest(".comment-container").parent();
            }
    
            replySection.append(`
                <div class="comment-container replied-comment-container">
                    <div class="comment-profile">
                        <div class="userpfp" style="background-image: ${userPhoto};"></div>
                        <span class="threadline">|</span>
                    </div>
                    <div class="comment-info-container">
                        <div class="info-comment">
                            <p class="comment-by">${userProfileName}</p> ▸ <span class="replying-to">@${commentByValue}</span> <span class="posted-time">&#xb7; ${currentDate}</span>
                        </div>
                        <div class="comment-body">
                            <p class="comment-text">${comment}</p>
                        </div>
                        <div class="comment-section-icons">
                            <img class="upvote-icon" src="/CCAPDEV-LOGO-2/2.png">
                            <img class="upvote-icon-filled" src="/CCAPDEV-LOGO-2/16.png" hidden>
                            <span class="vote-count">0</span>
                            <img class="downvote-icon" src="/CCAPDEV-LOGO-2/3.png">
                            <img class="downvote-icon-filled" src="/CCAPDEV-LOGO-2/17.png" hidden>
                            <div class="reply-container">
                                <button class="reply-button">
                                    <span class="reply-text">Reply</span>
                                </button>
                            </div>                   
                        </div>
                        <textarea class="reply-textarea replied-textarea" hidden></textarea>
                        <button class="comment-button" hidden>Comment</button>
                        <button class="cancel-button" hidden>Cancel</button>
                    </div>
                </div>
            `);
            commentButton.closest(".comment-container").find(".reply-textarea").val(''); // Clear the textarea after submitting.
            var currentCount = parseInt($(".num_comment").text());
            $(".num_comment").text(currentCount + 1); 
            var PostId = getPostIdFromURL();

            fetch('/reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({comment, currentDate, PostId, commentByValue, commentText, commentVotecount})
            })
            .then(response => {
                if (response.ok) {
                } else {
                    console.error('Failed to save changes:', response.statusText);
                    
                }
            })
            .catch(error => {
                console.error('Error saving changes:', error);
               
            });
        }
    }
    

    
  $(document).on('mouseenter', '.upvote-icon', function() {
      $(this).attr('src', '/CCAPDEV-LOGO-2/16.png');
  }).on('mouseleave', '.upvote-icon', function() {
      $(this).attr('src', '/CCAPDEV-LOGO-2/2.png');
  });

  $(document).on('mouseenter', '.downvote-icon', function() {
      $(this).attr('src', '/CCAPDEV-LOGO-2/17.png');
  }).on('mouseleave', '.downvote-icon', function() {
      $(this).attr('src', '/CCAPDEV-LOGO-2/3.png');
  });

    $(".comment-section").on("click", ".upvote-icon, .upvote-icon-filled", function () {
        upvoteActionComment($(this).closest('.comment-container'));
    });

    function upvoteActionComment(comment) {
    // Target only the icons and vote count within the comment's immediate icons container
    var iconsContainer = comment.children('.comment-info-container').find('.comment-section-icons');
    iconsContainer.find('.upvote-icon, .upvote-icon-filled').toggle();
    var currentVoteCount = parseInt(iconsContainer.find('.vote-count').text());
    
    if(iconsContainer.find('.downvote-icon').is(":hidden")){
        iconsContainer.find('.downvote-icon, .downvote-icon-filled').toggle();
        var newVoteCount = currentVoteCount + 2;
    } else {
        if(iconsContainer.find('.upvote-icon').is(":hidden")){
            var newVoteCount = currentVoteCount + 1;
        }
        else {
            var newVoteCount = currentVoteCount - 1;
        }
    }
    iconsContainer.find('.vote-count').text(newVoteCount);
}


    $(".comment-section").on("click", ".downvote-icon, .downvote-icon-filled", function () {
        downvoteActionComment($(this).closest('.comment-container'));
    });

    function downvoteActionComment(comment) {
        // Apply the same logic for downvote action targeting
        var iconsContainer = comment.children('.comment-info-container').find('.comment-section-icons');
        iconsContainer.find('.downvote-icon, .downvote-icon-filled').toggle();
        var currentVoteCount = parseInt(iconsContainer.find('.vote-count').text());
        
        if(iconsContainer.find('.upvote-icon').is(":hidden")){
            iconsContainer.find('.upvote-icon, .upvote-icon-filled').toggle();
            var newVoteCount = currentVoteCount - 2;
        } else {
            if(iconsContainer.find('.downvote-icon').is(":hidden")){
                var newVoteCount = currentVoteCount - 1;
            }
            else {
                var newVoteCount = currentVoteCount + 1;
            }
        }
        iconsContainer.find('.vote-count').text(newVoteCount);
    }
    

    $(document).on('click', '.best', function() {
        $('.sort-button').text('Sort By: Best');
        var commentContainers = $('.comment-section > .comment-container');
    
        commentContainers.sort(function(a, b) {
            var voteCountA = parseInt($(a).find('.vote-count').text());
            var voteCountB = parseInt($(b).find('.vote-count').text());
    
            return voteCountB - voteCountA;
        });
    
        $('.comment-section').empty();
    
        $('.comment-section').append(commentContainers);
    });
    
    $(document).on('click', '.new', function() {
        $('.sort-button').text('Sort By: New');
        sortCommentsByDate();
    });
    
    function sortCommentsByDate() {
        var comments = $('.comment-section > .comment-container').get();
        comments.sort(function(a, b) {
            var dateA = $(a).find('.posted-time').text().trim().split('·')[1].trim();
            var dateB = $(b).find('.posted-time').text().trim().split('·')[1].trim();
            dateA = new Date(dateA);
            dateB = new Date(dateB);
            return dateB - dateA;
        });
        $('.comment-section').append(comments);
    }
    
});
