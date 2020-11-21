"use strict";

const API_URL = "https://webtechcars.herokuapp.com";
const API_STATE = {
    cars: [],
    manufacturers: [],
    runningRequests: 0
};

async function initApiState() {
    if (API_STATE.cars.length === 0)
        await getCars();
    if (API_STATE.manufacturers.length === 0)
        await getManufacturers();
}

async function getCars() {
    API_STATE.cars = await $.get({
        url: API_URL + "/api/cars"
    });
    API_STATE.manufacturers.sort((a, b) => a.name.localeCompare(b.name));
}

async function getManufacturers() {
    API_STATE.manufacturers = await $.get({
        url: API_URL + "/api/manufacturers"
    });
    API_STATE.manufacturers.sort((a, b) => a.name.localeCompare(b.name));
}

async function postManufacturer(form) {
    await $.post({
        url: API_URL + "/api/manufacturers",
        data: JSON.stringify(form),
        contentType: "application/json"
    });
    await getManufacturers();
}

async function patchManufacturer(form, id) {
    await deleteManufacturerApi(id);
    await postManufacturer(form);
}

async function deleteManufacturerApi(id) {
    await $.ajax({
        url: API_URL + "/api/manufacturers/" + id,
        type: "DELETE"
    });
    await getManufacturers();
}