jest.unmock('../lib/http');

describe('Http', () => {
    it('http_build_query', () => {
        var Http = require('../lib/http'),
            http_client = new Http('foo', 1, 2);

        var qs = http_client.http_build_query({foo: 'bar'});

        expect(qs).toBeDefined();

        // ensure we add a date for API version
        expect(qs.indexOf('v=')).toBeGreaterThan(1);

        // ensure we define the response as foursquare
        expect(qs.indexOf('m=foursquare')).toBeGreaterThan(1);
    });
});
