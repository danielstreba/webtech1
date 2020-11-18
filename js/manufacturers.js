"use strict";

const state = {
    nameInput: {},
    country: {},
    founded: {},
    id: undefined
};

async function initManufacturers() {
    await initState();
    const flexbox = $(".container-inside .manufacturer-list");
    $.each(STATE.manufacturers, (i, manufacturer) => {
        const id = manufacturer._id;
        flexbox.append(`
        <a class="manufacturer-item manufacturer-item-select"
        data-manufacturer-id="${id}">
        ${manufacturer.name} (${id.substring(id.length - 4)})
        </a>`);
    })

    $(".manufacturer-item-select").on("click",
        (e) => showDetails($(e.currentTarget).data("manufacturer-id"))
    );
    $(".manufacturer-item-add").on("click", () => showDetails());
    $(".form-button-submit").on("click", () => saveItem());
    $(".form-button-delete").on("click", () => deleteItem());
}

function showDetails(id) {
    state.id = id;

    state.name = $("#manufacturer-name");
    state.country = $("#manufacturer-country");
    state.founded = $("#manufacturer-founded");

    const manufacturer = id ? STATE.manufacturers.find(e => e._id === id) : {};

    state.name.val(manufacturer.name);
    state.country.val(manufacturer.country);
    state.founded.val(manufacturer.founded ? new Date(manufacturer.founded).toISOString().substr(0, 10) : null);

    $(".manufacturer-details form").removeClass("hidden");
    $(".manufacturer-details .placeholder").addClass("hidden");
}

function saveItem() {
    
}

function deleteItem() {

}