var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', onDeviceReady, true);
    },
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function (id) {
        var _id = id;
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
    }
};

function onDeviceReady() {
    document.addEventListener("resume", onResume, false);
    document.addEventListener("backbutton", function (e) {
        if ($("#home").length > 0) {
            // call this to get a new token each time. don't call it to reuse existing token.
            //pushNotification.unregister(successHandler, errorHandler);
            e.preventDefault();
            navigator.app.exitApp();
        }
        else {
            navigator.app.backHistory();
        }
    }, false);

    //try {
    //    pushNotification = window.plugins.pushNotification;
    //    if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'amazon-fireos') {
    //        pushNotification.register(successHandler, errorHandler, { "senderID": "18994795059", "ecb": "onNotification" });		// required!            
    //    } else {
    //        pushNotification.register(tokenHandler, errorHandler, { "badge": "true", "sound": "true", "alert": "true", "ecb": "onNotificationAPN" });	// required!
    //    }
    //}
    //catch (err) {
    //    txt = "There was an error on this page.\n\n";
    //    txt += "Error description: " + err.message + "\n\n";
    //    alert(txt);
    //}
}

function onResume() {
    //if (new Date(localStorage.fcemcOMS_timeout) > new Date()) {
    //    getOutages();
    //}
    //else {
    //    location.reload();
    //}
}