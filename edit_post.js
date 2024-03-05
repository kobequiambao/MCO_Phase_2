function saveChanges() {
    var editedTitle = document.getElementById('post-area').innerHTML; // assuming only one title element
    var editedContent = document.getElementById('content-area').value; // assuming only one comment-box element

    // Print values to console for testing
    console.log("Edited Title:", editedTitle);
    console.log("Edited Content:", editedContent);

    // Update the content of the normal post
    document.getElementById('post-title-area').innerHTML = editedTitle;
    document.getElementById('post-content-area').innerHTML = editedContent;

    // Close the edit post container or redirect to the post page
    // Add your logic here to close the edit post container or redirect
}