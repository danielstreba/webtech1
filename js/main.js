"use strict";

$(document).ready(initApplication);

function initApplication() {
    // error handling
    $(document).ajaxError(errorHandler);

    // loading spinner
    $(document).on({
        ajaxStart: startSpinner,
        ajaxStop: stopSpinner
    });

    // initialize body
    $(document.body).load("body.html", loadPage);

    // routing
    $(window).on("hashchange", loadPage);
}

function errorHandler(_, jqxhr) {
    $(".error-message").html(jqxhr.status + " " + jqxhr.statusText);
    $(".modal").removeClass("hidden");
    $(".container").addClass("hidden");
}

function loadPage() {
    const page = window.location.hash
        ? window.location.hash.substring(1)
        : "home";

    $(".container").load(page + ".html", () => {
        $("a.active").removeClass("active");
        $("a[href=\"#" + page + "\"").addClass("active");

        initPage(page);
    });
}

function initPage(page) {
    switch (page) {
        case "home":
            break;
        case "manufacturers":
            initManufacturers();
            break;
        case "cars":
            initCars();
            break;
        default:
            console.error("Invalid page");
            break;
    }
}

function startSpinner() {
    $("body .body-wrapper").addClass("hidden");
    $(".spinner-wrapper").removeClass("hidden");
}

function stopSpinner() {
    $("body > .body-wrapper").removeClass("hidden");
    $(".spinner-wrapper").addClass("hidden");
}