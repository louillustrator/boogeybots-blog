$(function () {
    $('#loadmore').click(() => {
        loadPosts();
    });

    loadPosts();
});

function loadPosts() {
    var $postholder = $('#postholder');

    $.ajax({
        type: 'GET',
        url: '/api/posts/5',
        success: function (data) {
            data.posts.forEach((post) => {
                $postholder.append(`
<div class="row">
    <div class="post">
        <ul>
            <li>Title: ${post.title}</li>
            <li>Description: ${post.description}</li>
            <li>Date: ${post.date}</li>
        </ul>
        ${post.text}
    </div>
</div>
`);
            });
        }
    });
}