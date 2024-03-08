// TODO: Write your code below
$(document).ready(function () {

    $(document).on('mouseenter', '.upvote', function() {
        $(this).attr('src', 'CCAPDEV-LOGO-2/16.png');
    }).on('mouseleave', '.upvote', function() {
        $(this).attr('src', 'CCAPDEV-LOGO-2/2.png');
    });
  
    $(document).on('mouseenter', '.downvote', function() {
        $(this).attr('src', 'CCAPDEV-LOGO-2/17.png');
    }).on('mouseleave', '.downvote', function() {
        $(this).attr('src', 'CCAPDEV-LOGO-2/3.png');
    });

    $(".post-container").on("click", ".upvote, .upvote-filled", function () {
        $('.upvote').toggle();
        $('.upvote-filled').toggle();

        var currentVoteCount = parseInt($('.votes').text());
        var newVoteCount;
        
        if($('.downvote').is(":hidden")){
            $('.downvote').toggle();
            $('.downvote-filled').toggle();
            newVoteCount = currentVoteCount + 2;
            $('.votes').text(newVoteCount);
        } else {
            if($('.upvote').is(":hidden")){
                newVoteCount = currentVoteCount + 1;
                $('.votes').text(newVoteCount);
            }
            else {
                newVoteCount = currentVoteCount - 1;
                $('.votes').text(newVoteCount);
            }
        }
    });

    $(".post-container").on("click", ".downvote, .downvote-filled", function () {
        $('.downvote').toggle();
        $('.downvote-filled').toggle();

        var currentVoteCount = parseInt($('.votes').text());
        var newVoteCount;
        
        if($('.upvote').is(":hidden")){
            $('.upvote').toggle();
            $('.upvote-filled').toggle();
            newVoteCount = currentVoteCount - 2;
            $('.votes').text(newVoteCount);
        } else {
            if($('.downvote').is(":hidden")){
                newVoteCount = currentVoteCount - 1;
                $('.votes').text(newVoteCount);
            }
            else {
                newVoteCount = currentVoteCount + 1;
                $('.votes').text(newVoteCount);
            }
        }
    });

    $(".save").click(function(){
      $('#save').toggle();
      $('#save-filled').toggle();
    });

    $(".submit-comment-button").click(function(){
      var userName = $(".header_1-user-name").text();
      var comment = $(".comment-box").val();

      var currentDate = new Date();

      var day = currentDate.getDate();
      var month = currentDate.toLocaleString('en-US', { month: 'short' });
      var year = currentDate.getFullYear();

      currentDate = day + " " + month + " " + year;

      var userPic = $('.header_1-user-pic').css('background-image');
      userPic = userPic.split('/').slice(-2).join('/');

      if(comment !== "") {
      $('.comment-section').append(`
      <div class="comment-container">
                  <div class="comment-profile">
                      <img class=userpfp src="${userPic}">
                      <span class="threadline">|</span>
                  </div>
                  <div class="comment-info-container">
                      <div class="info-comment">
                          <p class="comment-by">${userName} <span class="posted-time">&#xb7; ${currentDate}</span></p>
                      </div>
                      <div class="comment-body">
                          <p class="comment-text">${comment}</p>
                      </div>
                      <div class="comment-section-icons">
                          <img class="upvote-icon" src="CCAPDEV-LOGO-2/2.png">
                          <img class="upvote-icon-filled" src="CCAPDEV-LOGO-2/16.png" hidden>

                          <span class="vote-count">0</span>


                          <img class="downvote-icon" src="CCAPDEV-LOGO-2/3.png">
                          <img class="downvote-icon-filled" src="CCAPDEV-LOGO-2/17.png" hidden>


                          <div class="reply-container">
                              <button class="reply-button">
                                  <img class="reply-icon" src="CCAPDEV-LOGO-2/4.png">
                                  <span class="reply-text">Reply</span>
                              </button>
                          </div>

                          <div class="share-container">
                              <button href="" class="share-button">
                                  <span class="share-text">Share</span>
                              </button>
                          </div>                     
                      </div>
                      <textarea class="reply-textarea" hidden></textarea>
                      <button class="comment-button" hidden>Comment</button>
                      <button class="cancel-button" hidden>Cancel</button>
                  </div>
              </div>
      `);

      
      $(".comment-count").text(parseInt($(".comment-count").text()) + 1);
      }
      
      
      $(".comment-box").val("");
    });

    $(".cancel-comment-button").click(function(){
      $('.comment-box').val('');
    });

    $(".comment-section").on("click", ".reply-button", function () {
      toggleReply($(this).closest('.comment-container'));
    });

    $(".comment-section").on("click", ".cancel-button", function () {
      toggleReply($(this).closest('.comment-container'));
    });

    function toggleReply(comment) {
      comment.find('.comment-info-container .cancel-button').toggle();
      comment.find('.comment-info-container .comment-button').toggle();
      comment.find('.comment-info-container .reply-textarea').toggle();
    }

    $(".comment-section").on("click", ".comment-button", function () {
      appendReply($(this).closest('.comment-container'));
    });

    function appendReply (reply) {
      var userName = $(".header_1-user-name").text();

      var currentDate = new Date();

      var day = currentDate.getDate();
      var month = currentDate.toLocaleString('en-US', { month: 'short' });
      var year = currentDate.getFullYear();

      currentDate = day + " " + month + " " + year;
      var commentByValue = $(reply).closest(".comment-container").find(".comment-by").text();
      var comment = $(reply).closest(".comment-container").find(".reply-textarea").val();

      var userPic = $('.header_1-user-pic').css('background-image');
      userPic = userPic.split('/').slice(-2).join('/');

      if(comment !== "") {
        $('.comment-section').append(`
        <div class="comment-container">
                  <div class="comment-profile">
                      <img class=userpfp src="${userPic}">
                      <span class="threadline">|</span>
                  </div>
                  <div class="comment-info-container">
                      <div class="info-comment">
                          <span class="comment-by">${userName}</span> replying to <span class="replying-to">@${commentByValue}</span>  <span class="posted-time">&#xb7; ${currentDate}</span>
                      </div>
                      <div class="comment-body">
                          <p class="comment-text">${comment}</p>
                      </div>
                      <div class="comment-section-icons">
                          <img class="upvote-icon" src="CCAPDEV-LOGO-2/2.png">
                          <img class="upvote-icon-filled" src="CCAPDEV-LOGO-2/16.png" hidden>

                          <span class="vote-count">0</span>


                          <img class="downvote-icon" src="CCAPDEV-LOGO-2/3.png">
                          <img class="downvote-icon-filled" src="CCAPDEV-LOGO-2/17.png" hidden>


                          <div class="reply-container">
                              <button class="reply-button">
                                  <img class="reply-icon" src="CCAPDEV-LOGO-2/4.png">
                                  <span class="reply-text">Reply</span>
                              </button>
                          </div>

                          <div class="share-container">
                              <button href="" class="share-button">
                                  <span class="share-text">Share</span>
                              </button>
                          </div>                     
                      </div>
                      <textarea class="reply-textarea" hidden></textarea>
                      <button class="comment-button" hidden>Comment</button>
                      <button class="cancel-button" hidden>Cancel</button>
                  </div>
              </div>
        `);
        $(".comment-count").text(parseInt($(".comment-count").text()) + 1);
      }

      $(reply).closest(".comment-container").find(".reply-textarea").val('');
      toggleReply($(reply).closest('.comment-container'));
    }

    
  $(document).on('mouseenter', '.upvote-icon', function() {
      $(this).attr('src', 'CCAPDEV-LOGO-2/16.png');
  }).on('mouseleave', '.upvote-icon', function() {
      $(this).attr('src', 'CCAPDEV-LOGO-2/2.png');
  });

  $(document).on('mouseenter', '.downvote-icon', function() {
      $(this).attr('src', 'CCAPDEV-LOGO-2/17.png');
  }).on('mouseleave', '.downvote-icon', function() {
      $(this).attr('src', 'CCAPDEV-LOGO-2/3.png');
  });

    $(".comment-section").on("click", ".upvote-icon, .upvote-icon-filled", function () {
        upvoteActionComment($(this).closest('.comment-container'));
    });

    function upvoteActionComment(upvote) {
        upvote.find('.comment-section-icons .upvote-icon, .comment-section-icons .upvote-icon-filled').toggle();
        currentVoteCount = parseInt(upvote.find('.comment-section-icons .vote-count').text());
        
        if(upvote.find('.comment-section-icons .downvote-icon').is(":hidden")){
            upvote.find('.comment-section-icons .downvote-icon, .comment-section-icons .downvote-icon-filled').toggle();
            newVoteCount = currentVoteCount + 2;
            upvote.find('.comment-section-icons .vote-count').text(newVoteCount);
        } else {
            if(upvote.find('.comment-section-icons .upvote-icon').is(":hidden")){
                newVoteCount = currentVoteCount + 1;
                upvote.find('.comment-section-icons .vote-count').text(newVoteCount);
            }
            else {
                newVoteCount = currentVoteCount - 1;
                upvote.find('.comment-section-icons .vote-count').text(newVoteCount);
            }
        }
    }

    $(".comment-section").on("click", ".downvote-icon, .downvote-icon-filled", function () {
        downvoteActionComment($(this).closest('.comment-container'));
    });

    function downvoteActionComment(upvote) {
        upvote.find('.comment-section-icons .downvote-icon, .comment-section-icons .downvote-icon-filled').toggle();
        currentVoteCount = parseInt(upvote.find('.comment-section-icons .vote-count').text());
        
        if(upvote.find('.comment-section-icons .upvote-icon').is(":hidden")){
            upvote.find('.comment-section-icons .upvote-icon, .comment-section-icons .upvote-icon-filled').toggle();
            newVoteCount = currentVoteCount - 2;
            upvote.find('.comment-section-icons .vote-count').text(newVoteCount);
        } else {
            if(upvote.find('.comment-section-icons .downvote-icon').is(":hidden")){
                newVoteCount = currentVoteCount - 1;
                upvote.find('.comment-section-icons .vote-count').text(newVoteCount);
            }
            else {
                newVoteCount = currentVoteCount + 1;
                upvote.find('.comment-section-icons .vote-count').text(newVoteCount);
            }
        }
    }

    $(document).on('click', '.best', function() {
        $('.sort-button').text('Sort By: Best');
        var commentContainers = $('.comment-container');
    
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
        var commentContainers = $('.comment-container');
    
        commentContainers.sort(function(a, b) {
            var timeA = new Date($(a).find('.posted-time').text());
            var timeB = new Date($(b).find('.posted-time').text());
    
            return timeB - timeA; 
        });
    
        $('.comment-section').empty().append(commentContainers);
    });
});
