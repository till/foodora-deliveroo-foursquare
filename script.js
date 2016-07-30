// ==UserScript==
// @name         foodora-deliveroo-foursquare
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Foursquare ratings & foodora!
// @author       Till Klampaeckel <till@php.net>
// @match        https://www.foodora.de/restaurants/*
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

    // foodora
    var foodora_config = {
        wrapper: '.restaurants__list__item-wrapper',
        restaurant_name: '.restaurants__list__item-name',
        replace: '.restaurants__list__item-description'
    };

    var make_request = function(query_data, ref, replace) {
        $.get('https://api.foursquare.com/v2/venues/search', query_data, 'json')
            .done(function(result) {
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

            $(ref).find(replace).text(new_text);
        })
            .error(function(){
            console.error('Could not HTTP!!11');
        });
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

    var foodora = function(query_data, config) {
        var restaurant, the_this, new_text;
        $(config.wrapper).each(function(i) {
            the_this = $(this);

            restaurant = $(the_this).find(config.restaurant_name).text().trim();

            query_data.query = restaurant;

            make_request(query_data, the_this, config.replace);
        });
    };

    $.extend(query_data, foodora_bootstrap(window.location.pathname.split('/')));
    foodora(query_data, foodora_config);
})();
