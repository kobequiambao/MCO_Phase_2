// TODO: Write your code below
$(document).ready(function () {
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
                          <img class="upvote-icon" src="CCAPDEV-LOGO-2/16.png" hidden>

                          <span class="vote-count">2</span>


                          <img class="downvote-icon" src="CCAPDEV-LOGO-2/3.png">
                          <img class="downvote-icon" src="CCAPDEV-LOGO-2/17.png" hidden>


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
                          <img class="upvote-icon" src="CCAPDEV-LOGO-2/16.png" hidden>

                          <span class="vote-count">2</span>


                          <img class="downvote-icon" src="CCAPDEV-LOGO-2/3.png">
                          <img class="downvote-icon" src="CCAPDEV-LOGO-2/17.png" hidden>


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

  
  $(".comment-section").on("click", ".upvote-icon", function () {
      upvoteAction($(this).closest('.comment-container'));
    });

  function upvoteAction(upvote) {
      
      comment.find('.comment-info-container .cancel-button').toggle();
      
  }


});
