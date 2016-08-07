'use strict';

class Foursquare {
    constructor(http_client){
        this.http_client = http_client;
    }

    match(query_data){
        // configure request
        query_data.intend = 'match';
        query_data.limit = 1;

        return this.http_client.get('/venues/search', query_data);
    }
}

module.exports = Foursquare;
