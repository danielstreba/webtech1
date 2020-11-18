"use strict";

$(document).ready(initApplication);

function initApplication() {
    // error handling
    $(document).ajaxError(errorHandler);

    $(document).on({
        ajaxStart: startSpinner,
        ajaxStop: stopSpinner
    });

    // initialize body
    $(document.body).load("body.html", initBody);

    // routing
    $(window).on("hashchange", loadPage);
}

function errorHandler(_, jqxhr) {
    $(".error-message").html(jqxhr.status + " " + jqxhr.statusText);
    $(".modal").show();
    $(".container").hide();
}

function initBody() {
    $("header").load("header.html");
    loadPage();
    $("footer").load("footer.html");
}

function loadPage() {
    const page = window.location.hash
        ? window.location.hash.substring(1)
        : "home";

    $(".container").load(page + ".html", function () {
        $("a.active").removeClass("active");
        $("a." + page).addClass("active");
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
    $("body>:not(.spinner-wrapper)").addClass("hidden");
    $(".spinner-wrapper").removeClass("hidden");
}

function stopSpinner() {
    $("body>:not(.spinner-wrapper)").removeClass("hidden");
    $(".spinner-wrapper").addClass("hidden");
}