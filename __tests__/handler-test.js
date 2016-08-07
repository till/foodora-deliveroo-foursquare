jest.unmock('../lib/handler');

describe('Handler', () => {
    const VENUE_ID = 'some-random-id';

    const FAKE_API_RESULT = {
        response: {
            venues: [
                {
                    id: VENUE_ID,
                    stats: {
                        checkinsCount: 100,
                        tipCount: 11,
                        usersCount: 3
                    }
                }
            ]
        }
    };

    it('fills the template', () => {
        var Handler = require('../lib/handler'),
            // ignores links for now
            handler = new Handler('{checkin}-{retention}-{tips}', null);

        expect(handler.handle(FAKE_API_RESULT)).toEqual('100-33.3-11');
    });

    it('sets multiple links', () => {
      var Handler = require('../lib/handler'),
          // multiple links
          handler = new Handler('{link}_{link}', null);

      expect(handler.handle(FAKE_API_RESULT))
          .toEqual(
              'https://foursquare.com/v/' + VENUE_ID + '_' + 'https://foursquare.com/v/' + VENUE_ID
          );
    });
});
