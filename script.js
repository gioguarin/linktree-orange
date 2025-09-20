document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.link');
    
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