const assert = require('assert');
const app = require('../../src/app');

describe('\'parentsDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('parentsDetails');

    assert.ok(service, 'Registered the service (parentsDetails)');
  });
});
