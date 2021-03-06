"use strict";

const CAR_STATE = {
    $name: undefined,
    $consumption: undefined,
    $color: undefined,
    $manufacturer: undefined,
    $available: undefined,
    $year: undefined,
    $horsepower: undefined,
    id: undefined
};

async function initCars() {
    // initialize API state
    await initApiState();

    // initialize component state
    CAR_STATE.$name = $("input[name=name]");
    CAR_STATE.$consumption = $("input[name=consumption]");
    CAR_STATE.$color = $("input[name=color]");
    CAR_STATE.$manufacturer = $("select[name=manufacturer]");
    CAR_STATE.$available = $("input#car-available");
    CAR_STATE.$year = $("input[name=year]");
    CAR_STATE.$horsepower = $("input[name=horsepower]");

    buildCarsList();

    $(".item-details form").hide();

    $(".item-details form").on("submit",
        (event) => {
            event.preventDefault();
            const data = serializeForm($(".item-details form"));
            submitCar(data);
        }
    )
}

function buildCarsList() {
    // building list items with jQuery
    const $list = $(".item-list");
    $(".list-item-select").remove();
    $.each(API_STATE.cars, (i, car) => {
        const id = car._id;
        $list.append(`
        <button type="button" class="list-item list-item-select"
        data-car-id="${id}">${car.name ? `${car.manufacturer} ${car.name}` : "<üres>"} <span class="list-item-select__right">${id.substring(id.length - 4)}</span></button>`);
    })

    CAR_STATE.$manufacturer.children().remove();
    const manufacturerNames = [...new Set(
        API_STATE.manufacturers.map(x => x.name).concat(API_STATE.cars.map(x => x.manufacturer))
    )];
    manufacturerNames.sort((a, b) => a.localeCompare(b));
    $.each(manufacturerNames, (i, name) => {
        CAR_STATE.$manufacturer.append(`<option value="${name}">${name}</option>`);
    })

    // adding onclick handler to the previously built list items
    $(".list-item-select").on("click",
        (event) => showCarDetails($(event.currentTarget).data("car-id"))
    );
}

function showCarDetails(id) {
    CAR_STATE.id = id;

    const car = id ? API_STATE.cars.find(x => x._id === id) : {};

    CAR_STATE.$name.val(car.name);
    CAR_STATE.$consumption.val(car.consumption);
    CAR_STATE.$color.val(car.color);
    CAR_STATE.$manufacturer.val(car.manufacturer);
    CAR_STATE.$available.val(car.avaiable ? car.avaiable : car.available);
    CAR_STATE.$year.val(car.year);
    CAR_STATE.$horsepower.val(car.horsepower);

    $(".item-details form").show();
    $(".item-details .placeholder").hide();

    $(".list-item-select").removeClass("list-item-select-active");
    $(".list-item-add").removeClass("list-item-add-active");

    if (id) {
        $(".form-button-delete").show()
        $(`.list-item-select[data-car-id="${id}"]`).addClass("list-item-select-active")
    } else {
        $(".form-button-delete").hide();
        $(".list-item-add").addClass("list-item-add-active");
    }
}

async function submitCar(data) {
    if (CAR_STATE.id) {
        await patchCar(data, CAR_STATE.id);
    } else {
        await postCar(data);
    }

    showNotification(`Autó sikeresen ${CAR_STATE.id ? "módosítva" : "létrehozva"}.`);
    buildCarsList();
    const cars = API_STATE.cars;
    cars.sort((a, b) => a._id.localeCompare(b._id));
    showCarDetails(cars[cars.length - 1]._id);
}

async function removeCar() {
    await deleteCar(CAR_STATE.id);

    showNotification("Gyártó sikeresen törölve.");
    buildCarsList();

    $(".item-details form").hide();
    $(".item-details .placeholder").show();

    $(".list-item-select").removeClass("list-item-select-active");
    $(".list-item-add").removeClass("list-item-add-active");
}