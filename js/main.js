"use strict";

const API_URL = "https://webtechcars.herokuapp.com";
let STATE = {
    cars: [],
    manufacturers: []
};

$(document).ready(function () {
    $(document).ajaxError(function(event, jqxhr) {
        $(".error-message").html(jqxhr.status + " " + jqxhr.statusText);
        $(".modal").show();
        $(".container").hide();
    });

    $("body").load("body.html", function () {
        $("header").load("header.html");
        $(".container").load("content.html");
        $("footer").load("footer.html");

        $(".button-reload").on("click", function () {
            location.reload();
        });

        getCars();
        getManufacturers();
    });
});

function getCars() {
    $.get(API_URL + "/api/cars", function (res) {
        STATE.cars = res;
        console.log(res);
    });
}

function getManufacturers() {
    $.get(API_URL + "/api/manufacturers", function (res) {
        STATE.cars = res;
        console.log(res);
    });
}