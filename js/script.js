document.addEventListener('DOMContentLoaded', function () {
    const loadingOverlay = document.getElementById('loading');
    const mainContent = document.getElementById('main-content');
    const searchBar = document.getElementById('search-bar');
    const blogPosts = document.querySelectorAll('.post');

    // Ensure main content is hidden initially
    mainContent.style.display = 'none';

    // Hide loading overlay and show main content after delay
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
        mainContent.style.display = 'block';
    }, 1500);

    // Handle search bar input
    searchBar.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const currentUrl = new URL(window.location);

        // Update the URL with the search query
        if (query) {
            currentUrl.searchParams.set('search', query);
        } else {
            currentUrl.searchParams.delete('search');
        }

        window.history.pushState({ path: currentUrl.href }, '', currentUrl.href);

        // Filter blog posts
        blogPosts.forEach((post) => {
            const title = post.querySelector('h3').textContent.toLowerCase();
            const description = post.querySelector('p').textContent.toLowerCase();

            if (title.includes(query) || description.includes(query)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', (event) => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchValue = urlParams.get('search') || '';
        searchBar.value = searchValue;

        // Trigger filtering again
        blogPosts.forEach((post) => {
            const title = post.querySelector('h3').textContent.toLowerCase();
            const description = post.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchValue) || description.includes(searchValue)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });
});
