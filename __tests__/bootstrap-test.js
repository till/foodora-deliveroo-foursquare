jest.unmock('../lib/bootstrap');

describe('Bootstrap', () => {
    it('detects foodora', () => {
        var Bootstrap = require('../lib/bootstrap'),
            fake_location = {
              hostname: 'foodora.de',
              pathname: '/'
            },
            start = new Bootstrap(fake_location);

        expect(start.is_foodora()).toBeTruthy();
    });

    it('detects deliveroo', () => {
      var Bootstrap = require('../lib/bootstrap'),
          fake_location = {
            hostname: 'deliveroo.de',
            pathname: '/'
          },
          start = new Bootstrap(fake_location);

      expect(start.is_foodora()).toBeFalsy();
    });

    it('foodora: extracts the right data', () => {
        var Bootstrap = require('../lib/bootstrap'),
            fake_location = {
              hostname: 'foodora.de',
              pathname: '/restaurants/lat/52.50065060000001/lng/13.417732099999967/plz/10999/city/Berlin/'
            },
            start = new Bootstrap(fake_location),
            query_data = start.create_query();

        ['city', 'zip', 'll'].forEach(function(property){
            expect(query_data.hasOwnProperty(property)).toBeTruthy();
        });

        expect(query_data.city).toEqual('Berlin');
        expect(query_data.zip).toEqual(10999);
        expect(query_data.ll).toEqual('52.5,13.4');
    });

    it('deliveroo: extracts the right data', () => {
        var Bootstrap = require('../lib/bootstrap'),
            fake_location = {
              hostname: 'deliveroo.de',
              pathname: '/de/restaurants/berlin/kreuzberg'
            },
            start = new Bootstrap(fake_location),
            query_data = start.create_query();

        ['city', 'near'].forEach(function(property){
            expect(query_data.hasOwnProperty(property)).toBeTruthy();
        });

        expect(query_data.city).toEqual('berlin');
        expect(query_data.near).toEqual('kreuzberg');
    });
});
