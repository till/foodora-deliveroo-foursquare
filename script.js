// ==UserScript==
// @name         foodora-deliveroo-foursquare
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Foursquare ratings & foodora!
// @author       Till Klampaeckel <till@php.net>
// @match        https://www.foodora.de/restaurants/*
// @match        https://deliveroo.de/de/restaurants/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // api credentials - DO NOT COMMIT
    var client_id = '',
        client_secret = '';


    // CONFIGURATION END
    // CONFIGURATION END
    // CONFIGURATION END

    var query_data = {};

    // foursquare API
    query_data.v = 20160730;
    query_data.m = 'foursquare';

    // foursquare auth
    query_data.client_id = client_id;
    query_data.client_secret = client_secret;

    // configure request
    query_data.intend = 'match';
    query_data.limit = 1;

    // deliveroo
    var deliveroo_config = {
        wrapper: '.restaurant-index-page--list-section',
        restaurant_name: '.restaurant-index-page-tile--name',
        replace: '.restaurant-index-page-tile--tag'
    };

    // foodora
    var foodora_config = {
        wrapper: '.restaurants__list__item-wrapper',
        restaurant_name: '.restaurants__list__item-name',
        replace: '.restaurants__list__item-description'
    };

    var $ = function(selector, el) {
        if (!el) {el = document;}
        return el.querySelector(selector);
    };

    var $$ = function(selector, el) {
        if (!el) {el = document;}
        return Array.prototype.slice.call(el.querySelectorAll(selector));
    };

    var make_request = function(query_data, ref, replace) {
        var http = new XMLHttpRequest(),
            query_string = [];

        Object.keys(query_data).forEach(function(k){
            query_string.push(k + '=' + encodeURIComponent(query_data[k]));
        });

        http.onreadystatechange = function() {
            var result = JSON.parse(http.responseText); // LOL

            if (result.meta.code != 200) {
                console.error('Could not determine query foursquare for venue.');
                return;
            }

            var venue = result.response.venues[0];
            //console.log(venue);

            var new_text = '';

            new_text += 'Checkins: ' + venue.stats.checkinsCount;
            new_text += ' (' + (venue.stats.checkinsCount/venue.stats.usersCount).toFixed(1) + ')';
            new_text += ', Tips: ' + venue.stats.tipCount;

            $(replace, ref).textContent = new_text;
        };

        http.open('GET', 'https://api.foursquare.com/v2/venues/search?' + query_string.join('&'));
        http.send();
    };

    var deliveroo_bootstrap = function(url_parts) {
        var location = {};

        // parse URL: /de/restaurants/berlin/kreuzberg
        // 0 = language
        // 1 = 'restaurants'

        location.city = url_parts[2];
        location.near = url_parts[3];
    };

    var foodora_bootstrap = function(url_parts) {
        var location = {}, latitude, longitude;

        // parse URL: /foo/value-foo/bar/bar-value
        url_parts.forEach(function(a_part, i, all_parts) {
            if (a_part == 'lat') {
                latitude = parseFloat(all_parts[i+1]).toFixed(1);
                return;
            }

            if (a_part == 'lng') {
                longitude = parseFloat(all_parts[i+1]).toFixed(1);
                return;
            }

            if (a_part == 'plz') {
                location.zip = parseInt(all_parts[i+1]);
            }

            if (a_part == 'city') {
                location.city = all_parts[i+1];
            }
        });

        location.ll = latitude + ',' + longitude;
        return location;
    };

    var build_request = function(query_data, config) {
        var restaurant, the_this, new_text;
        $$(config.wrapper).forEach(function(the_this, i) {
            //the_this = $(this);

            restaurant = $(config.restaurant_name, the_this).textContent.trim();

            query_data.query = restaurant;

            make_request(query_data, the_this, config.replace);
        });
    };

    var url_parts = window.location.pathname.split('/');

    if (window.location.hostname.indexOf('foodora.de')) {
        Object.assign(query_data, foodora_bootstrap(url_parts));
        build_request(query_data, foodora_config);
    } else {
        Object.assign(query_data, deliveroo_bootstrap(url_parts));
        build_request(query_data, deliveroo_config);
    }
})();
