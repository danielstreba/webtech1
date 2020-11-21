"use strict";

const MANUFACTURER_STATE = {
    name: {},
    country: {},
    founded: {},
    id: undefined
};

async function initManufacturers() {
    await initState();
    const flexbox = $(".manufacturer-list");
    $.each(API_STATE.manufacturers, (i, manufacturer) => {
        const id = manufacturer._id;
        flexbox.append(`
        <input type="button" class="manufacturer-item manufacturer-item-select"
        data-manufacturer-id="${id}" value="${manufacturer.name} (${id.substring(id.length - 4)})"/>`);
    })

    $(".manufacturer-item-select").on("click",
        (e) => showDetails($(e.currentTarget).data("manufacturer-id"))
    );
}

function showDetails(id) {
    MANUFACTURER_STATE.id = id;
    MANUFACTURER_STATE.name = $("input[name=name]");
    MANUFACTURER_STATE.country = $("input[name=country]");
    MANUFACTURER_STATE.founded = $("input[name=founded]");

    const manufacturer = id ? API_STATE.manufacturers.find(e => e._id === id) : {};

    MANUFACTURER_STATE.name.val(manufacturer.name);
    MANUFACTURER_STATE.country.val(manufacturer.country);
    MANUFACTURER_STATE.founded.val(manufacturer.founded ? new Date(manufacturer.founded).toISOString().substr(0, 10) : null);

    $(".manufacturer-details form").removeClass("hidden");
    $(".manufacturer-details .placeholder").addClass("hidden");
    
    if (id) {
        $(".form-button-delete").removeClass("hidden");
    } else {
        $(".form-button-delete").addClass("hidden");
    }
}

function submitManufacturer() {
    const form = $(".manufacturer-details form");
    const data = new FormData(form);

    console.log(data);
}

function deleteManufacturer() {

}