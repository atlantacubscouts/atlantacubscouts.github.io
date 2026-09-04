/*!
* Start Bootstrap - Blog Post v5.0.9 (https://startbootstrap.com/template/blog-post)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-blog-post/blob/master/LICENSE)
*/

document.addEventListener("DOMContentLoaded", function () {
    var sectionIds = ["home-content", "parent-info-content", "sign-up-content", "popcorn-content"];
    // Any element on the page may switch sections; only navbar links get the active state.
    var triggers = Array.from(document.querySelectorAll("[data-content-target]"));
    var navLinks = Array.from(document.querySelectorAll(".navbar [data-content-target]"));
    var sections = sectionIds
        .map(function (id) {
            return document.getElementById(id);
        })
        .filter(Boolean);

    if (!triggers.length || sections.length !== sectionIds.length) {
        return;
    }

    function showSection(sectionId) {
        sections.forEach(function (section) {
            section.hidden = section.id !== sectionId;
        });

        navLinks.forEach(function (link) {
            var isActive = link.getAttribute("data-content-target") === sectionId;
            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    function collapseNavbar() {
        var menu = document.getElementById("navbarSupportedContent");
        if (!menu || !menu.classList.contains("show") || !window.bootstrap) {
            return;
        }
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }

    triggers.forEach(function (trigger) {
        trigger.addEventListener("click", function (event) {
            var targetId = trigger.getAttribute("data-content-target");
            if (!targetId || !sectionIds.includes(targetId)) {
                return;
            }

            event.preventDefault();
            showSection(targetId);
            collapseNavbar();
            history.replaceState(null, "", "#" + targetId);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    var initialSection = window.location.hash.replace("#", "");
    showSection(sectionIds.includes(initialSection) ? initialSection : "home-content");

    // A deep link such as /#sign-up-content would otherwise leave the browser
    // scrolled to the anchor, tucking the page heading under the sticky navbar.
    if (sectionIds.includes(initialSection)) {
        window.scrollTo(0, 0);
    }

    // Popcorn Sale: copy the pack unit code to the clipboard.
    var copyCodeButton = document.getElementById("popcorn-copy-code");
    if (copyCodeButton) {
        copyCodeButton.addEventListener("click", function () {
            var codeEl = document.getElementById("popcorn-unit-code");
            var code = codeEl ? codeEl.textContent.trim() : "";
            navigator.clipboard.writeText(code).then(function () {
                var original = copyCodeButton.textContent;
                copyCodeButton.textContent = "Copied!";
                setTimeout(function () {
                    copyCodeButton.textContent = original;
                }, 1400);
            }).catch(function () {});
        });
    }
    
});
