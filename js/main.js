"use strict";

$(initApp);

function initApp() {
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
        // remove setTimeout when async/await fixed
        setTimeout(() => {
            $(".body-wrapper").addClass("hidden");
            $(".spinner-wrapper").removeClass("hidden");
        }, 45);
    }
}

function stopSpinner() {
    // remove setTimeout when async/await fixed
    setTimeout(() => {
        if (--API_STATE.runningRequests <= 0) {
            $(".body-wrapper").removeClass("hidden");
            $(".spinner-wrapper").addClass("hidden");
        }
    }, 0);
}

function showNotification(message) {
    const $snackbar = $("#snackbar");
    if (!$snackbar.hasClass("show")) {
        $snackbar.html(message);
        $snackbar.addClass("show");
        setTimeout(() => {
            $snackbar.removeClass("show");
        }, 3000);
    }
}


