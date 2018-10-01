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
                        <a href="/posts/?post=${post.filename}" class="post">
                            <div>
                                <ul>
                                    <h2>${post.title}</h2>
                                    <p>${post.date}</p>
                                    <p>${post.description}</p>
                                </ul>
                            </div>
                        </a>
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