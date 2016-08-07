/* jshint node: true */
/* global $, $$ */
'use strict';

class Bootstrap {
    constructor(location){
        this.location = location;
    }

    create_query(){
        var url_parts = this.location.pathname.split('/'), location = {};

        if (this.is_foodora()) {
            var latitude, longitude;

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
        }

        // parse URL: /de/restaurants/berlin/kreuzberg
        // 0 =
        // 1 = language
        // 2 = 'restaurants'

        location.city = url_parts[3];
        location.near = url_parts[4];

        return location;
    }

    go(query_data, fsq) {
        var restaurant;

        $$(config.wrapper).forEach(function(the_this, i) {
            restaurant = $(config.restaurant_name, the_this).textContent.trim();

            query_data.query = restaurant;
            console.log(restaurant);
            //this.request(query_data, fsq);
        });
    }

    is_foodora() {
        if (this.location.hostname.indexOf('foodora.de') !== -1) {
            return true;
        }
        return false;
    }

    request(query_data, fsq) {
        fsq.match(query_data).then(function(data){
            var handler = new Handler(template, this.config.replace);
            handler.update(handler.handle(data));
        }).catch(function(data){
            console.log("Error: " + data);
        });
    }

    get config(){
        return this.config;
    }

    set config(config){
        this.config = config;
    }
}

module.exports = Bootstrap;
