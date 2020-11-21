function serializeForm(form) {
    return form.serializeArray().reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
    }, {});
}