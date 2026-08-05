/*!
* Start Bootstrap - Blog Post v5.0.9 (https://startbootstrap.com/template/blog-post)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-blog-post/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

document.addEventListener("DOMContentLoaded", function () {
    var sectionIds = ["home-content", "parent-info-content", "sign-up-content"];
    var navLinks = Array.from(document.querySelectorAll("[data-content-target]"));
    var sections = sectionIds
        .map(function (id) {
            return document.getElementById(id);
        })
        .filter(Boolean);

    if (!navLinks.length || sections.length !== sectionIds.length) {
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

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            var targetId = link.getAttribute("data-content-target");
            if (!targetId) {
                return;
            }

            showSection(targetId);
            history.replaceState(null, "", "#" + targetId);
        });
    });

    var initialSection = window.location.hash.replace("#", "");
    showSection(sectionIds.includes(initialSection) ? initialSection : "home-content");
});