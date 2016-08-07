/* jshint node: true */
/* global $, fsq_logo */
'use strict';

class Handler {
    constructor(template){
        this.template = template;
    }

    get ref(){
        return this.ref;
    }

    set ref(reference){
        this.ref = reference;
    }

    handle(result){
        var venue = result.response.venues[0];

        if (typeof venue === 'undefined') {
            this.update('Venue not found. :(');
            return;
        }

        if (!venue.hasOwnProperty('stats')) {
            this.update('No stats, or not enough visitors.');
            return;
        }

        //console.log(venue);

        return this.template
            .replace('{checkin}', venue.stats.checkinsCount)
            .replace('{retention}', (venue.stats.checkinsCount/venue.stats.usersCount).toFixed(1))
            .replace('{tips}', venue.stats.tipCount)
            .replace(new RegExp('{link}', 'g'), 'https://foursquare.com/v/' + venue.id);
    }

    update(text) {
        // prefix logo apply update
        this.ref.innerHTML = '<img src="' + fsq_logo + '" width="20" height="20"/> ' + text;
    }
}

module.exports = Handler;
