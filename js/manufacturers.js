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

    $(".item-details form").on("submit",
        (event) => {
            event.preventDefault();
            const data = serializeForm($(".item-details form"));
            submitManufacturer(data);
        }
    )
}

function buildList() {
    // building list items with jQuery
    const list = $(".item-list");
    $(".list-item-select").remove();
    $.each(API_STATE.manufacturers, (i, manufacturer) => {
        const id = manufacturer._id;
        list.append(`
        <button type="button" class="list-item list-item-select"
        data-manufacturer-id="${id}">${manufacturer.name ? manufacturer.name : "<üres>"} <span class="list-item-select__right">${id.substring(id.length - 4)}</span></button>`);
    })

    // adding onclick handler to the previously built list items
    $(".list-item-select").on("click",
        (event) => showDetails($(event.currentTarget).data("manufacturer-id"))
    );
}

function showDetails(id) {
    MANUFACTURER_STATE.id = id;

    const manufacturer = id ? API_STATE.manufacturers.find(x => x._id === id) : {};

    MANUFACTURER_STATE.name.val(manufacturer.name);
    MANUFACTURER_STATE.country.val(manufacturer.country);
    MANUFACTURER_STATE.founded.val(manufacturer.founded);

    $(".item-details form").removeClass("hidden");
    $(".item-details .placeholder").addClass("hidden");

    $(".list-item-select").removeClass("list-item-select-active");
    $(".list-item-add").removeClass("list-item-add-active");

    if (id) {
        $(".form-button-delete").removeClass("hidden");
        $(`.list-item-select[data-manufacturer-id="${id}"]`).addClass("list-item-select-active");
    } else {
        $(".form-button-delete").addClass("hidden");
        $(".list-item-add").addClass("list-item-add-active");
    }
}

async function submitManufacturer(data) {
    if (MANUFACTURER_STATE.id) {
        await patchManufacturer(data, MANUFACTURER_STATE.id);
    } else {
        await postManufacturer(data);
    }

    showNotification(`Gyártó sikeresen ${MANUFACTURER_STATE.id ? "módosítva" : "létrehozva"}.`);
    buildList();
    const manufacturers = API_STATE.manufacturers;
    manufacturers.sort((a, b) => a._id.localeCompare(b._id));
    showDetails(manufacturers[manufacturers.length - 1]._id);
}

async function deleteManufacturer() {
    await deleteManufacturerApi(MANUFACTURER_STATE.id);

    showNotification("Gyártó sikeresen törölve.");
    buildList();

    $(".item-details form").addClass("hidden");
    $(".item-details .placeholder").removeClass("hidden");

    $(".list-item-select").removeClass("list-item-select-active");
    $(".list-item-add").removeClass("list-item-add-active");
}

function serializeForm(form) {
    return form.serializeArray().reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
    }, {});
}