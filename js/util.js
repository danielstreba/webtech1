function serializeForm(form) {
    return form.serializeArray().reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
    }, {});
}

function startSpinner() {
    if (API_STATE.runningRequests++ <= 0) {
        setTimeout(() => {
            $(".spinner-wrapper").fadeIn(250);
            $(".body-wrapper").hide()
        }, 45);
    }
}

function stopSpinner() {
    setTimeout(() => {
        if (--API_STATE.runningRequests <= 0) {
            $(".spinner-wrapper").fadeOut(250);
            $(".body-wrapper").show();
        }
    }, 0);
}

function showNotification(message) {
    const $snackbar = $("#snackbar");
    if (!$snackbar.hasClass("show")) {
        $snackbar.html(message);
        $snackbar.addClass("show");
        setTimeout(() => {
            $snackbar.removeClass("show");
        }, 3000);
    }
}