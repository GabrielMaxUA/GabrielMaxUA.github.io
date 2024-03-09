document.addEventListener("DOMContentLoaded", function() {
    const menu = document.querySelector('.menu');
    const side = document.querySelector('aside');

    menu.addEventListener('click', function() {
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
            side.classList.remove('active');
        } else {
            menu.classList.add('active');
            side.classList.add('active');
        }
    });

    document.addEventListener('click', function(event) {
        const targetElement = event.target;
        if (!side.contains(targetElement) && !menu.contains(targetElement)) {
            menu.classList.remove('active');
            side.classList.remove('active');
        }
    });
});
