"use strict";

$(document).ready(initApplication);

function initApplication() {
    // error handling
    $(document).ajaxError(errorHandler);

    // loading spinner
    $.ajaxSetup({
        beforeSend: startSpinner,
        complete: stopSpinner
    });

    // initialize body
    $(document.body).load("body.html", loadPage);

    // routing
    $(window).on("hashchange", loadPage);
}

function errorHandler(_, xhr) {
    $(".error-message").html(`${xhr.status} ${xhr.statusText}`);
    $(".modal").removeClass("hidden");
    $(".body-wrapper > :not(.modal)").addClass("hidden");
}

function loadPage() {
    const page = window.location.hash
        ? window.location.hash.substring(1)
        : "home";

    $(".container").load(`${page}.html`, () => {
        $("a.active").removeClass("active");
        $(`a[href="#${page}"]`).addClass("active");

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
    if (API_STATE.runningRequests++ <= 0) {
        $(".body-wrapper").addClass("hidden");
        $(".spinner-wrapper").removeClass("hidden");
    }
}

function stopSpinner() {
    if (--API_STATE.runningRequests <= 0) {
        $(".body-wrapper").removeClass("hidden");
        $(".spinner-wrapper").addClass("hidden");
    }
}