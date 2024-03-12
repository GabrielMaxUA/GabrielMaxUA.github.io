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

document.addEventListener("DOMContentLoaded", function() {
    var aboutLink = document.querySelector("#about");
    var goalsLink = document.querySelector("#goals");
    var linksLink = document.querySelector("#links");
    var aboutSection = document.querySelector(".aText");
    var goalsSection = document.querySelector(".leftSide");
    var linksSection = document.querySelector(".rightSide");

    function hideAllSections() {
        aboutSection.style.display = "none";
        goalsSection.style.display = "none";
        linksSection.style.display = "none";
    }

    function removeActiveClassFromLinks() {
        goalsLink.classList.remove("active");
        linksLink.classList.remove("active");
        aboutLink.classList.remove("active");
        aboutSection.classList.remove("active");
        goalsSection.classList.remove("active");
        linksSection.classList.remove("active");
    }

    aboutLink.classList.add("active");
   
    function addActiveClass(link) {
        link.classList.add("active");
    }

    aboutLink.addEventListener("click", function() {
        hideAllSections();
        aboutSection.style.display = "block";
        removeActiveClassFromLinks();
        addActiveClass(aboutLink);
    });

    goalsLink.addEventListener("click", function() {
        hideAllSections();
        goalsSection.style.display = "block";
        removeActiveClassFromLinks();
        addActiveClass(goalsLink);
    });

    linksLink.addEventListener("click", function() {
        hideAllSections();
        linksSection.style.display = "block";
        removeActiveClassFromLinks();
        addActiveClass(linksLink);
    });
});