$(document).ready(() => {
  $('#load-btn').on('click', () => {
    const $container = $('#content');
    $container.html('<p>Загрузка...</p>');
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      success: (data) => {
        $container.empty();
        data.slice(0, 5).forEach(post => {
          $container.append(`
            <article class="post">
              <h3>${post.title}</h3>
              <p>${post.body.substring(0, 100)}...</p>
            </article>
          `);
        });
      }
    });
  });
});