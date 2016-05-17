﻿var tryingToReconnect = false, user;

$(document).ready(function () {
    $.mobile.pageContainer.pagecontainer("change", "#pageLogin");

    //adjust for status bar in iOS
    if (/iPad|iPod|iPhone/i.test(navigator.userAgent)) {
        $("body").css("background-color", "black");
        $("div[role='dialog']").css("background-color", "#efecec");
        $(".pg").css({ "margin-top": "20px" });
    }

    if (navigator.onLine) {
        checkCookie();
        getSpinner();
        $("#spinCont").hide();

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "0",
            "hideDuration": "0",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

    }
    else {
        if (navigator.notification.confirm("No network connection detected, check settings and try again!", networkIssue, "Please Confirm:", "Cancel, Ok")) {
            window.location.reload();
        }
        else {
            $.mobile.pageContainer.pagecontainer("change", "#pageLogin");
        }
    }
});

//region Login&Cookies
function checkLogin() {
    user = $("#un").val().trim();
    var _pw = $("#pw").val().trim();
    var paramItems = user + "|" + _pw;
    $.ajax({
        type: "GET",
        url: "http://gis.fourcty.org/FCEMCrest/FCEMCDataService.svc/authenticateYouSir/" + paramItems,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (results) {
            if (results.authenticateYouSirResult) {
                $("#loginError").text("");

                $.mobile.pageContainer.pagecontainer("change", "#page1");

                //$("#spinCont").show();

                if (localStorage.fcemcInventory_uname == undefined || localStorage.fcemcInventory_uname == "") {
                    setCookie(user, _pw, 1); //expires 1 day from inital login
                }

                initLoad();

            }
            else {
                //window.localStorage.clear();
                localStorage.setItem("fcemcInventory_uname", "");
                localStorage.setItem("fcemcInventory_pass", "");

                $("#loginError").text("Login Unsucessful");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var e = errorThrown;
            if (!(navigator.onLine)) {
                $("#loginError").text("No network connection - cannot login!");
            }
            else {
                $("#loginError").text("Login Unsucessful");
            }
        }
    });
}

function setCookie(u, p, t) {
    //window.localStorage.clear();
    localStorage.setItem("fcemcInventory_uname", u);
    localStorage.setItem("fcemcInventory_pass", p);
    var d = new Date();
    d.setDate(d.getDate() + t);
    d.setHours(6);
    d.setMinutes(00);
    d.setSeconds(00);
    localStorage.setItem("fcemcInventory_timeout", d);    
}

function getCookie() {
    var isCookies = false;
    if (localStorage.fcemcInventory_uname != null && localStorage.fcemcInventory_pass != null) {
        isCookies = true;
    }
    return isCookies;
}

function checkCookie() {
    var valid = getCookie();
    if (valid == true) {
        if (new Date(localStorage.fcemcInventory_timeout) > new Date()) {
            $("#un").val(localStorage.fcemcInventory_uname);
            $("#pw").val(localStorage.fcemcInventory_pass);
        }
        else {
            //localStorage.clear();
            localStorage.setItem("fcemcInventory_uname", "");
            localStorage.setItem("fcemcInventory_pass", "");
        }
    }
}
//endregionphon

function initLoad() {
    //$("#spinCont").show();
}

function scan() {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          "preferFrontCamera": false, // iOS and Android
          "showFlipCameraButton": true, // iOS and Android
          "prompt": "Place a barcode inside the scan area", // supported on Android only
          "formats": "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          "orientation": "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
      }
   );
}


function getSpinner() {
    var opts = {
        lines: 12             // The number of lines to draw
        , length: 7             // The length of each line
        , width: 5              // The line thickness
        , radius: 10            // The radius of the inner circle
        , scale: 1.0            // Scales overall size of the spinner
        , corners: 1            // Roundness (0..1)
        , color: '#000'         // #rgb or #rrggbb
        , opacity: 1 / 4          // Opacity of the lines
        , rotate: 0             // Rotation offset
        , direction: 1          // 1: clockwise, -1: counterclockwise
        , speed: 1              // Rounds per second
        , trail: 100            // Afterglow percentage
        , fps: 20               // Frames per second when using setTimeout()
        , zIndex: 2e9           // Use a high z-index by default
        , className: 'spinner'  // CSS class to assign to the element
        , top: '50%'            // center vertically
        , left: '50%'           // center horizontally
        , shadow: false         // Whether to render a shadow
        , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
        , position: 'absolute'  // Element positioning
    }
    var target = document.getElementById('spinwheel');
    spinner = new Spinner(opts).spin(target);
}

function quit() {
    $.mobile.pageContainer.pagecontainer("change", "#page1");
}

function networkIssue(button) {
    if (button == 2) {
        window.location.reload();
    }
    else if (button == 1) {
        $.mobile.pageContainer.pagecontainer("change", "#pageLogin");
    }
}

function fakeCallback() { }
