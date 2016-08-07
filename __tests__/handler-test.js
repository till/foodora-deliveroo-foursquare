jest.unmock('../lib/handler');

describe('Handler', () => {
    it('detects foodora', () => {
        var Bootstrap = require('../lib/bootstrap'),
            start = new Bootstrap('https://www.foodora.de/');

        expect(start.is_foodora()).to_be(true);
    });

    it('detects deliveroo', () => {

    });
});
