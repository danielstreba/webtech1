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

async function getCars() {
    console.log("get cars");
    return $.get({
        url: API_URL + "/api/cars"
    });
}

function getManufacturers() {
    console.log("get manufacturers");
    return $.get({
        url: API_URL + "/api/manufacturers"
    });
}

async function initState() {
    if (STATE.cars.length === 0 || STATE.cars.length === 0) {
        await getAll();
    }
}