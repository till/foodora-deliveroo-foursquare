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

    var fsq_logo = 'data:image/png;base64,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';

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
        wrapper: '.restaurant-index-page-tile',
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
            query_string = [],
            template = 'Checkins: <a href="{link}" target="_blank">{checkin}</a> ({retention}), Tips: <a href="{link}" target="_blank">{tips}</a>';

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

            if (typeof venue === 'undefined') {
                update_text('Venue not found. :(', $(replace, ref));
                return;
            }

            if (!venue.hasOwnProperty('stats')) {
                update_text('No stats, or not enough visitors.', $(replace, ref));
                return;
            }

            var new_text = template
                .replace('{checkin}', venue.stats.checkinsCount)
                .replace('{retention}', (venue.stats.checkinsCount/venue.stats.usersCount).toFixed(1))
                .replace('{tips}', venue.stats.tipCount)
                .replace(new RegExp('{link}', 'g'), 'https://foursquare.com/v/' + venue.id);

            update_text(new_text, $(replace, ref));
        };

        http.open('GET', 'https://api.foursquare.com/v2/venues/search?' + query_string.join('&'));
        http.send();
    };

    var update_text = function(text, ref) {
        // prefix logo
        text = '<img src="' + fsq_logo + '" width="20" height="20"/> ' + text;

        // apply update
        ref.innerHTML = text;
    };

    var deliveroo_bootstrap = function(url_parts) {
        var location = {};

        // parse URL: /de/restaurants/berlin/kreuzberg
        // 0 =
        // 1 = language
        // 2 = 'restaurants'

        location.city = url_parts[3];
        location.near = url_parts[4];

        return location;
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
            restaurant = $(config.restaurant_name, the_this).textContent.trim();

            query_data.query = restaurant;

            make_request(query_data, the_this, config.replace);
        });
    };

    var url_parts = window.location.pathname.split('/');

    if (window.location.hostname.indexOf('foodora.de') !== -1) {
        Object.assign(query_data, foodora_bootstrap(url_parts));
        build_request(query_data, foodora_config);
    } else {
        Object.assign(query_data, deliveroo_bootstrap(url_parts));
        build_request(query_data, deliveroo_config);
    }
})();
