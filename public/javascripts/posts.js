var postsOnPage = 0;

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
        url: `/api/posts/?howMany=5&offset=${postsOnPage}`,
        success: function (data) {
            data.posts.forEach((post) => {
                $postholder.append(`
                    <div class="row">
                        <div class="post">
                            ${post.text}
                            <ul>
                                <li>Title: ${post.title}</li>
                                <li>Description: ${post.description}</li>
                                <li>Date: ${post.date}</li>
                            </ul>
                        </div>
                    </div>
                `);
                postsOnPage++;
            });
        },
        error: function() {
            alert('Error: Failed to load posts!');
        }
    });
}