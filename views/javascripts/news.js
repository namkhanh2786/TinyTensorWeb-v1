document.getElementById('search-box').addEventListener('input', async function() {
    const queryText = this.value;
    const response = await fetch('/news', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ queryText })
    });
    const news = await response.json();

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    if (news && news.length > 0) {
        news.forEach(newsData => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4');

            newsItem.innerHTML = `
                <div class="card news-item h-100">
                    <img src="${newsData.data.type === 'News' ? 'https://bccare.ca/wp-content/uploads/breakingnews.jpg' : newsData.data.type === 'Events' ? 'https://th.bing.com/th/id/OIP.qBAeUZhNXTjMnXic-d1zoAHaG2?w=800&h=740&rs=1&pid=ImgDetMain' : newsData.data.type === 'Announcements' ? 'https://th.bing.com/th/id/R.3ec29551ef6bb524a00cf8030d0a8c4a?rik=QC9XE13b8IhOzA&riu=http%3a%2f%2fcliparts.co%2fcliparts%2fLcd%2fojE%2fLcdojE7oi.jpg&ehk=BZEzuH5IXM5iZ32G1JJUur9gZhcd%2f1FfRXjmRT1GPcg%3d&risl=&pid=ImgRaw&r=0' : ''}" class="card-img-top thumbnail" alt="TinyTensor Thumbnail News">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title title">${newsData.data.title}</h5>
                        <p class="card-text type mb-2">
                            ${newsData.data.type === 'News' ? '<span class="badge badge-success">News</span>' : newsData.data.type === 'Events' ? '<span class="badge badge-info">Events</span>' : newsData.data.type === 'Announcements' ? '<span class="badge badge-danger">Announcements</span>' : '<span class="badge badge-secondary">Other</span>'}
                        </p>
                        <a href="/news/${newsData.id}" class="btn btn-primary read-more-btn mt-auto">Read More</a>
                    </div>
                </div>
            `;

            newsContainer.appendChild(newsItem);
        });
    } else {
        newsContainer.innerHTML = '<div class="col-12 news-null"><p class="news-null-message">There are no news for this topic.</p></div>';
    }
});