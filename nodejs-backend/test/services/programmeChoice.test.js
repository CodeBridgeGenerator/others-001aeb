const assert = require('assert');
const app = require('../../src/app');

describe('\'programmeChoice\' service', () => {
  it('registered the service', () => {
    const service = app.service('programmeChoice');

    assert.ok(service, 'Registered the service (programmeChoice)');
  });
});
