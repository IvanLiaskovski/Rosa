"use strict";

const selectElement = function (el) {
    return document.querySelector(el);
};

//Burgger functional

(() => {
    let menuToggler = selectElement(".menu-toggler");

    menuToggler.addEventListener("click", () => {
        selectElement("body").classList.toggle("open");
    })
})();


//Scroll reveal

(() => {
    window.sr = ScrollReveal();

    sr.reveal(".animate-left", {
        origin: "left",
        duration: 1000,
        distance: "25rem",
        delay: 600,
    });

    sr.reveal(".animate-right", {
        origin: "right",
        duration: 1000,
        distance: "25rem",
        delay: 600,
    });

    sr.reveal(".animate-top", {
        origin: "top",
        duration: 1000,
        distance: "25rem",
        delay: 600,
    });

    sr.reveal(".animate-bottom", {
        origin: "bottom",
        duration: 1000,
        distance: "25rem",
        delay: 600,
    });
})();
