// TODO: Write your code below
  $(document).ready(function () {
      $(".save").click(function(){
        $('#save').toggle();
        $('#save-filled').toggle();
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

      $(".cancel-comment-button").click(function(){
        $('.comment-box').val('');
      });

      $(".submit-comment-button").click(function(){
        $('.comment-section').append(`
        <div class="comment-container">
                    <div class="comment-profile">
                        <img class=userpf src="CCAPDEV-LOGO-2/user1.png">
                        <span class="threadline">|</span>
                    </div>
                    <div class="comment-info-container">
                        <div class="info-comment">
                            <p class="comment-by">stargirlfromscosmos <span class="posted-time">&#xb7; 2 days ago</span></p>
                        </div>
                        <div class="comment-body">
                            <p class="comment-text">heyy i've been wanting to do this nanghinayang  ako i wasn't able to get it for gesport i'm g OPPP</p>
                        </div>
                        <div class="comment-section-icons">
                            <input type="radio" name="votebtn-cs" class="vote-radio-cs" id="#upvote-cs">
                            <label for="upvote"><img class="upvote-icon" src="CCAPDEV-LOGO-2/2.png">
                                <img class="upvote-icon" src="CCAPDEV-LOGO-2/Hupvote.png" hidden>
                            </label>

                            <span class="vote-count">2</span>

                            <input type="radio" name="votebtn-cs" class="vote-radio-cs" id="#downvote-cs">
                            <label for="downvote">
                                <img class="downvote-icon" src="CCAPDEV-LOGO-2/3.png">
                                <img class="downvote-icon" src="CCAPDEV-LOGO-2/Hdownvote.png" hidden>
                            </label>

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
      });
  });
