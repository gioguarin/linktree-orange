document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.link');
    const themeToggle = document.getElementById('theme-toggle');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleButton(savedTheme);
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleButton(newTheme);
    });
    
    function updateToggleButton(theme) {
        themeToggle.textContent = theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
    }
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkName = this.getAttribute('data-link');
            let count = localStorage.getItem(linkName) || 0;
            count = parseInt(count) + 1;
            localStorage.setItem(linkName, count);
            console.log(`${linkName} clicked ${count} times`);
            // For demo, alert the count
            alert(`${linkName} has been clicked ${count} times`);
        });
    });
});