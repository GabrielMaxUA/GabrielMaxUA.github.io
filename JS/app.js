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
    var worksLink = document.querySelector("#works")
    var aboutSection = document.querySelector(".aText");
    var goalsSection = document.querySelector(".leftSide");
    var linksSection = document.querySelector(".rightSide");
    var worksSection = document.querySelector(".works");

    function hideAllSections() {
        aboutSection.style.display = "none";
        goalsSection.style.display = "none";
        linksSection.style.display = "none";
        worksSection.style.display = "none";
    }

    function removeActiveClassFromLinks() {
        goalsLink.classList.remove("Active");
        linksLink.classList.remove("Active");
        aboutLink.classList.remove("Active");
        worksLink.classList.remove("Active");
        aboutSection.classList.remove("Active");
        goalsSection.classList.remove("Active");
        linksSection.classList.remove("Active");
        worksSection.classList.remove("Active");
    }

    aboutLink.classList.add("Active");
    goalsSection.style.display = "none";
    linksSection.style.display = "none";
    worksSection.style.display = "none";
   
    function addActiveClass(link) {
        link.classList.add("Active");
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

    worksLink.addEventListener("click", function(){
        hideAllSections();
        worksSection.style.display = "block";
        removeActiveClassFromLinks();
        addActiveClass(worksLink);
    })
});

