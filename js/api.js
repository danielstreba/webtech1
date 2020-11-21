"use strict";

const API_URL = "https://webtechcars.herokuapp.com";
const API_STATE = {
    cars: [],
    manufacturers: []
};

async function getAll() {
    API_STATE.cars = await getCars();
    API_STATE.manufacturers = await getManufacturers();
    return API_STATE;
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
    if (API_STATE.cars.length === 0 || API_STATE.cars.length === 0) {
        await getAll();
    }
}