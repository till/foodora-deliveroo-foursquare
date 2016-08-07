/* jshint node: true */
'use strict';

class LocationParser {
    constructor(location){
        this.location = location;
        this.parts = this.location.pathname.split('/');
    }

    /**
     * parse URL: /de/restaurants/berlin/kreuzberg
     * 0 =
     * 1 = language
     * 2 = 'restaurants'
     */
    deliveroo(){
        return {
            city: this.parts[3],
            near: this.parts[4]
        };
    }

    /**
     * parse URL: /foo/value-foo/bar/bar-value
     */
    foodora(){
        var latitude, longitude, location = {};

        this.parts.forEach(function(a_part, i, all_parts) {
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

    is_foodora(){
        if (this.location.hostname.indexOf('foodora.de') !== -1) {
            return true;
        }
        return false;
    }
}

module.exports = LocationParser;
