const assert = require('assert');
const app = require('../../src/app');

describe('\'film\' service', () => {
  it('registered the service', () => {
    const service = app.service('film');

    assert.ok(service, 'Registered the service');
  });
});
