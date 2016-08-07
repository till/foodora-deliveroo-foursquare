/* jshint node: true */
/* global $, $$ */
'use strict';

var LocationParser = require('./location_parser');

class Bootstrap {
    constructor(location, handler){
        this.location = location;
        this.handler = handler;
        this.query = new LocationParser(this.location)
    }

    create_query(){
        if (this.query.is_foodora()) {
            return this.query.foodora();
        }

        return this.query.deliveroo();
    }

    go(query_data, fsq) {
        var restaurant;

        $$(this.config.wrapper).forEach(function(the_this, i) {
            restaurant = $(this.config.restaurant_name, the_this).textContent.trim();

            query_data.query = restaurant;
            console.log(restaurant);
            //this.request(query_data, fsq);
        });
    }

    is_foodora() {
        return this.query.is_foodora();
    }

    request(query_data, fsq) {
        fsq.match(query_data).then(function(data){
            this.handler.update(
                this.handler.handle(data)
            );
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
