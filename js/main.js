"use strict";

$(initApp);

function initApp() {
    // error handling
    $(document).ajaxError(errorHandler);

    // loading spinner
    $.ajaxSetup({
        beforeSend: (xhr, settings) => {
            if (!settings.url.endsWith(".html")) {
                startSpinner();
                xhr.always(stopSpinner);
            }
        }
    });

    // initialize body
    $(document.body).load("body.html", () => {
        $(".spinner-wrapper").hide();
        $(".modal").hide();
        loadPage();
    });

    // routing
    $(window).on("hashchange", loadPage);
}

function errorHandler(_, xhr) {
    $(".error-message").html(`${xhr.status} ${xhr.statusText}`);
    $(".modal").show();
    $(".body-wrapper > :not(.modal)").hide();
}

function loadPage() {
    const page = window.location.hash
        ? window.location.hash.substring(1)
        : "home";

    $(".container").fadeOut(100, () => {
        $(".container").load(`${page}.html`, () => {
            $("a.active").removeClass("active");
            $(`a[href="#${page}"]`).addClass("active");

            initPage(page);

            $(".container").fadeIn(100);
        })
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