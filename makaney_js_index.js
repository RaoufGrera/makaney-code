// www.makaney.net 
// Sept. 9 2011 version 0.2 (Beta)
// Copyright (C) 2011 Makaney Code by Ziyad S. Al-Salloum <zss@zss.net>
// Permission is hereby granted, free of charge, to any person obtaining a copy of Makaney Code, 
// to deal in Makaney Code without restriction, including without limitation the rights to use, 
// copy, modify, merge, publish, distribute, sublicense, and/or sell copies, and to permit persons
// to whom Makaney Code is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or 
// substantial portions of Makaney Code.
//---------------------------------------------------------------------------------------
//
// Makaney code is a human-friendly alphanumeric representation (like postal or zip codes) of 
// the geographic latitude and longitude coordinates. Using Makaney code helps easily identify 
// places on earth with an easy to remember code. That's becomes very useful especially in 
// countries that do not implement a practical postal code system. In such countries people tend 
// to describe their locations using directions, which is not always straightforward, waste valuable 
// time, and results in many inconveniences especially when an ambulance needs to reach a certain 
// location as soon as possible.
//
// Q: Why Base33 why not Base36 or Base64?
// The idea is not to produce a short code only, but a code that is short and easy to read, write, speak, 
// and remember. Base36 will be a bit confusing (i.e. 0 or O, I or 1) and Base64 is not human friendly.
// We exclude 0, 1, and V as they usually mistaken with O, I, and U, giving a more human friendly code.
//
// Description (JavaScript):
// decimalToBase33(Math.round([latitude or longitude]*10000)) return Makaney Code of the coordinate.
// Example:
// Convert Latitude and longitude (24.4973, 44.38599999999997) to Makaney Code:
// 	decimalToBase33(Math.round(24.4973*10000)); // gives THUN
// 	decimalToBase33(Math.round(44.38599999999997*10000)); // gives MW9K 
// 	so Latitude and longitude (24.4973, 44.38599999999997) becomes THUN+MW9K
// Convert Makaney Code to Latitude and longitude:
//	makaneyToLatLon(Makaney Code) returns Latitude and longitude up to X digits.
//	makaneyToLatLon("THUN+MW9K") // gives 24.4973, 44.3860

function copydir(x) {
    document.getElementById(x).value = document.getElementById("Makaney").innerHTML;
}

function showhide(x) {
    var dis = document.getElementById(x);
    //dis.style.display == "block" ? dis.style.display = "none" : dis.style.display = "block";	

    if (dis.style.display == "block") {
        dis.style.display = "none";
    } else {
        dis.style.display = "block";

        switch (x) {
            case 'fplace':
                document.getElementById('PageFooter').style.display = "none";
                break;
            case 'PageFooter':
                document.getElementById('fplace').style.display = "none";
        }

    }
}

function urlMKC() {
    var query = location.search.substring(1);
    var mkc = decodeURIComponent(query.substring(query.indexOf('=') + 1));
    return mkc;
}

var zbase33 = "abo2zptscjkwmgnxqfd984ery3h5l76ui";

var mbase = 33;

function base33ToDecimal(Str) {
    Sign = "";
    if (Str.charAt(0) == "-") {
        Sign = "-";
        Str = Str.substring(1);
    }
    else if (Str.charAt(0) == "+") Str = Str.substring(1);
    Str = Str.toLowerCase();
    var sum = 0;
    for (var i = 0; i < Str.length; i++) {
        sum += zbase33.indexOf(Str.charAt((Str.length - 1) - i)) * Math.pow(mbase, i);
    }
    console.log("sum: ", sum)

    return Sign + sum;
}

function decimalToBase33(N) {

    if (N == 0) { return "A" }
    X = Math.abs(N)
    var code = "";
    while (X > 0) {
        code = zbase33.charAt(X % mbase) + code;
        X = Math.floor(X / mbase);
    }
    return ((N < 0) ? "-" + code : code);
}

function makaneyToLatLon(Str) {

    pos = Str.indexOf("+");

    if (pos != -1) lon = base33ToDecimal(Str.substring(pos)) / 10000;
    else {
        pos = Str.lastIndexOf("-");
        lon = base33ToDecimal(Str.substring(pos)) / 10000;
    }

    lat = base33ToDecimal(Str.substring(0, pos)) / 10000;

    return lat + "," + lon;
}

function outOfBounds(lat, lon) {
    return ((lat > 84.9999 || lat < -84.9999) || (lon > 179.9999 || lon < -179.9999)) ? true : false;
}

function updateMakaney(lat, lon) {
    lon >= 0 ? Sign = "+" : Sign = "";
    lat = Math.round(lat * 10000);
    lon = Math.round(lon * 10000);
    document.getElementById("Makaney").innerHTML = decimalToBase33(lat).toString().toUpperCase() + Sign + decimalToBase33(lon).toString().toUpperCase();
    document.getElementById("MakaneyLatLon").innerHTML = "  (" + base33ToDecimal(decimalToBase33(lat).toString().toUpperCase()) / 10000 + ", " + base33ToDecimal(decimalToBase33(lon).toString().toUpperCase()) / 10000 + ")";
}

var map;
var initialLocation;
var geocoder;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var pattern = /^[ybndrfg8ejkmcpqxot2uwisza345h769l-]+[+-]+[ybndrfg8ejkmcpqxot2uwisza345h769l]+$/i;
var myMarker = false;
var useragent = navigator.userAgent;
var markersArray = [];

function addMarker() {
    var location = map.getCenter();

    if (markersArray.indexOf(document.getElementById("Makaney").innerHTML) == -1) {
        marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            position: location,
            map: map
        });
        marker.setTitle(document.getElementById("Makaney").innerHTML);

        markersArray.push(document.getElementById("Makaney").innerHTML);

    }
}


function geocode() {
    showhide("fplace");
    var address = document.getElementById("address").value;
    geocoder.geocode({
        'address': address,
        'partialmatch': true
    }, geocodeResult);
}

function takemehome() {
    showhide("fplace");
    if (myMarker) {
        var pos = myMarker.getPosition();
        map.setCenter(pos);
        updateMakaney(pos.lat(), pos.lng());
        map.setZoom(18);
    } else get_pos();
}

function geocodeResult(results, status) {

    if (pattern.test(document.getElementById("address").value.replace(/\s+/g, ''))) {
        var coor = makaneyToLatLon(document.getElementById("address").value.replace(/\s+/g, '')).split(",");
        if (outOfBounds(coor[0], coor[1])) {
            alert("Sorry can't find the place: " + "OUT_OF_BOUND");
        } else {
            map.setCenter(new google.maps.LatLng(coor[0], coor[1]));
            updateMakaney(coor[0], coor[1]);
            var center = map.getCenter();
            //document.getElementById("latlon").innerHTML = center.lat() + ', ' + center.lng();
            map.setZoom(18);
        }
    } else if (status == 'OK' && results.length > 0) {
        map.fitBounds(results[0].geometry.viewport);
        var center = map.getCenter();
        updateMakaney(center.lat(), center.lng());
    }
    else {

        alert("Sorry can't find the place: " + status);
    }
}

function calcRoute() {
    showhide("PageFooter");
    var start = document.getElementById("FROM").value;
    var end = document.getElementById("TO").value;
    if (pattern.test(start.replace(/\s+/g, '')) && pattern.test(end.replace(/\s+/g, ''))) {

        start = makaneyToLatLon(start.replace(/\s+/g, '')).split(",");
        end = makaneyToLatLon(end.replace(/\s+/g, '')).split(",");

        if (!outOfBounds(start[0], start[1]) && !outOfBounds(end[0], end[1])) {
            var request = {
                origin: new google.maps.LatLng(start[0], start[1]),
                destination: new google.maps.LatLng(end[0], end[1]),
                provideRouteAlternatives: false,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                } else { alert("Sorry could not calculate directions for this area.") }
            });
        } else { alert("Sorry can't get results: OUT_OF_BOUND"); }
    } else { alert("Sorry Makaney Code only: INVALID INPUT"); }
}


//------------ START GEOLOCATION TRACKING ----
// Base Code provided By Neil Craig http://www.thedotproduct.org/experiments/geo/ 

var wpid = false, prev_lat, prev_long, min_accuracy = 150;


// This is the function which is called each time the Geo location position is updated
function geo_success(position) {

    // Check that the accuracy of our Geo location is sufficient for our needs
    if (position.coords.accuracy <= min_accuracy) {
        // We don't want to action anything if our position hasn't changed - we need this because on IPhone Safari at least, we get repeated readings of the same location with 
        // different accuracy which seems to count as a different reading - maybe it's just a very slightly different reading or maybe altitude, accuracy etc has changed
        if (prev_lat != position.coords.latitude || prev_long != position.coords.longitude) {

            prev_lat = position.coords.latitude;
            prev_long = position.coords.longitude;

            var myLatLng = new google.maps.LatLng(prev_lat, prev_long);
            // Marker

            // build entire marker first time thru
            if (!myMarker) {
                // define the 'you are here' marker image
                var image = new google.maps.MarkerImage('blue_dot_circle.png',
                    new google.maps.Size(38, 38), // size
                    new google.maps.Point(0, 0), // origin
                    new google.maps.Point(19, 19) // anchor
                );

                // then create the new marker
                myMarker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: image,
                    optimized: false,
                    flat: true,
                    title: 'I might be here'
                });

                map.setCenter(myLatLng);
                updateMakaney(myLatLng.lat(), myLatLng.lng());
                map.setZoom(18);

                // just change marker position on subsequent passes
            } else {
                myMarker.setPosition(myLatLng);
            }

            // End Marker
        }
    }
}


//------------ END GEOLOCATION TRACKING ----




function handleError(error) {
    switch (error.code) {
        case error.TIMEOUT:
            //alert('Sorry. Timed out.');
            break;
        case error.PERMISSION_DENIED:
            alert('Sorry. Permission to find your location has been denied.');
            break;
        case error.POSITION_UNAVAILABLE:
            //	alert('Sorry. Position unavailable.');
            break;
        default:
            //	alert('Sorry. Mystery error code: ' + error.code);
            break;
    }
}


function get_pos() {
    // Set up a watchPosition to constantly monitor the geo location provided by the browser - NOTE: !! forces a boolean response
    // We  use watchPosition rather than getPosition since it more easily allows (on IPhone at least) the browser/device to refine the geo location rather than simply taking the first available position
    // Full spec for navigator.geolocation can be foud here: http://dev.w3.org/geo/api/spec-source.html#geolocation_interface

    // First, check that the Browser is capable
    if (!!navigator.geolocation)
        wpid = navigator.geolocation.watchPosition(geo_success, handleError, { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 });
    else
        alert('Sorry! your browser does not support Geo Location, unable to detect your location.');
}


function initialize() {

    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('iPod') != -1) {
        window.location = "http://www.makaney.net/smartphone.html";
    } else if (useragent.indexOf('Android') != -1) {
        window.location = "http://www.makaney.net/smartphone_android.html";
    } else if (useragent.indexOf('BlackBerry') != -1) {
        window.location = "http://www.makaney.net/blackberry.html";
    }

    // adjust map size according to window size. START
    var uniwin = {
        width: window.innerWidth || document.documentElement.clientWidth
            || document.body.offsetWidth,
        height: window.innerHeight || document.documentElement.clientHeight
            || document.body.offsetHeight
    };

    var bd_div = document.getElementById('bd');
    var cross_div = document.getElementById('crosshair');
    var bd_height = uniwin.height - 44 - 36;
    bd_div.style.height = (uniwin.height - 44 - 36 - 1) + "px";
    cross_div.style.top = ((bd_height * 182.4) / 382) + "px";

    // adjust map size according to window size. END

    directionsDisplay = new google.maps.DirectionsRenderer();
    var latlng = new google.maps.LatLng(21.422504205370878, 39.82621175670624);
    var myOptions = {
        zoom: 4,
        center: latlng,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_LEFT
        },
        mapTypeId: google.maps.MapTypeId.HYBRID,
        streetViewControl: false,
        draggableCursor: 'hand'
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);



    var MKC = urlMKC();

    if (!MKC) {

        get_pos();

    } // !MKC

    directionsDisplay.setMap(map);

    geocoder = new google.maps.Geocoder();

    document.getElementById("address").value = "";

    google.maps.event.addListener(map, 'center_changed', function () {

        var center = map.getCenter();
        lat = center.lat();
        lon = center.lng();

        if (outOfBounds(lat, lon)) {
            if (lat > 84.9999) { lat = 84.9999; }
            else if (lat < -84.9999) { lat = -84.9999; }
            if (lon > 179.9999) { lon = 179.9999; }
            else if (lon < -179.9999) { lon = -179.9999; }
            map.setCenter(new google.maps.LatLng(lat, lon));
        }

        updateMakaney(lat, lon);

    });

    google.maps.event.addListener(map, 'zoom_changed', function () {
        if (map.getZoom() < 2) map.setZoom(2);
    });
    var center = map.getCenter();
    if (!MKC || !pattern.test(MKC)) {
        updateMakaney(center.lat(), center.lng());
    } else {
        var coor = makaneyToLatLon(MKC).split(",");
        if (outOfBounds(coor[0], coor[1])) {
            alert("Sorry can't find the place: " + "OUT_OF_BOUND");
            updateMakaney(center.lat(), center.lng());
        } else {
            map.setCenter(new google.maps.LatLng(coor[0], coor[1]));
            updateMakaney(coor[0], coor[1]);
            center = map.getCenter();
            map.setZoom(18);
        }
    }
}


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-3446541-3']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
