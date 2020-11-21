"use strict";

const MANUFACTURER_STATE = {
    name: undefined,
    country: undefined,
    founded: undefined,
    id: undefined
};

async function initManufacturers() {
    // initialize API state
    await initApiState();

    // initialize component state
    MANUFACTURER_STATE.name = $("input[name=name]");
    MANUFACTURER_STATE.country = $("input[name=country]");
    MANUFACTURER_STATE.founded = $("input[name=founded]");

    buildList();

    $(".manufacturer-details form").on("submit",
        (event) => {
            event.preventDefault();
            const data = serializeForm($(".manufacturer-details form"));
            submitManufacturer(data);
        }
    )
}

function buildList() {
    // building list items with jQuery
    const list = $(".manufacturer-list");
    $(".manufacturer-item-select").remove();
    $.each(API_STATE.manufacturers, (i, manufacturer) => {
        const id = manufacturer._id;
        list.append(`
        <input type="button" class="manufacturer-item manufacturer-item-select"
        data-manufacturer-id="${id}" value="${manufacturer.name ? manufacturer.name : "<üres>"} (${id.substring(id.length - 4)})
        "/>`);
    })

    // adding onclick handler to the previously built list items
    $(".manufacturer-item-select").on("click",
        (event) => showDetails($(event.currentTarget).data("manufacturer-id"))
    );
}

function showDetails(id) {
    MANUFACTURER_STATE.id = id;

    const manufacturer = id ? API_STATE.manufacturers.find(x => x._id === id) : {};

    MANUFACTURER_STATE.name.val(manufacturer.name);
    MANUFACTURER_STATE.country.val(manufacturer.country);
    MANUFACTURER_STATE.founded.val(manufacturer.founded);

    $(".manufacturer-details form").removeClass("hidden");
    $(".manufacturer-details .placeholder").addClass("hidden");

    $(".manufacturer-item-select").removeClass("manufacturer-item-select-active");
    $(".manufacturer-item-add").removeClass("manufacturer-item-add-active");

    if (id) {
        $(".form-button-delete").removeClass("hidden");
        $(`.manufacturer-item-select[data-manufacturer-id="${id}"]`).addClass("manufacturer-item-select-active");
    } else {
        $(".form-button-delete").addClass("hidden");
        $(".manufacturer-item-add").addClass("manufacturer-item-add-active");
    }
}

async function submitManufacturer(data) {
    if (MANUFACTURER_STATE.id) {
        await patchManufacturer(data, MANUFACTURER_STATE.id);
    } else {
        await postManufacturer(data);
    }

    buildList();

    showDetails(API_STATE.manufacturers[API_STATE.manufacturers.length - 1]._id);
}

async function deleteManufacturer() {
    await deleteManufacturerApi(MANUFACTURER_STATE.id);

    buildList();

    $(".manufacturer-details form").addClass("hidden");
    $(".manufacturer-details .placeholder").removeClass("hidden");

    $(".manufacturer-item-select").removeClass("manufacturer-item-select-active");
    $(".manufacturer-item-add").removeClass("manufacturer-item-add-active");
}

function serializeForm(form) {
    return form.serializeArray().reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
    }, {});
}