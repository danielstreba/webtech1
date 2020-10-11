"use strict";

const API_URL = "https://webtechcars.herokuapp.com";
const STATE = {
    cars: [],
    manufacturers: []
};

async function getAll() {
    STATE.cars = await getCars();
    STATE.manufacturers = await getManufacturers();
    return STATE;
}

function getCars() {
    return $.get({
        url: API_URL + "/api/cars",
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    });
}

function getManufacturers() {
    return $.get({
        url: API_URL + "/api/manufacturers",
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    });
}
