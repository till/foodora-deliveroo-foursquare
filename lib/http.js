/* jshint node: true */
/* global resolve, reject */
'use strict';

/*
* Small http client to talk to Foursquare.
*/
class Http {
    constructor(base, id, secret){
        this.base = base;
        this.id = id;
        this.secret = id;
    }

    get(uri, query_data) {
        return this.request(this.base + uri + '?' + this.http_build_query(query_data), 'GET');
    }

    request(url, method) {
        var self = this, p = new Promise(function(resolve, reject){

            var xml_http = new XMLHttpRequest();

            xml_http.onreadystatechange = function() {
                self.parse_response(this.status, this.statusText, this.response);
            };

            xml_http.onerror = function () {
                reject(this.statusText);
            };

            xml_http.open(method, url);
            xml_http.send();
        });

        return p;
    }

    parse_response(status, status_text, body) {
        var response = JSON.parse(body);

        if (status >= 200 && status < 300) {
            resolve(response);
        }

        reject('Unknown error: ' + status_text);
    }

    http_build_query(query_data) {
        // foursquare API
        query_data.v = 20160730;
        query_data.m = 'foursquare';

        // foursquare auth
        query_data.client_id = this.id;
        query_data.client_secret = this.secret;

        var query_string = [];
        Object.keys(query_data).forEach(function(k){
            query_string.push(k + '=' + encodeURIComponent(query_data[k]));
        });

        return query_string.join('&');
    }
}

module.exports = Http;
