'use strict';

describe('Service: gitRepoService', function () {

  // load the service's module
  beforeEach(module('movioApp'));

  // instantiate service
  var gitRepoService;
  beforeEach(inject(function (_gitRepoService_) {
    gitRepoService = _gitRepoService_;
  }));

  it('should do something', function () {
    expect(!!gitRepoService).toBe(true);
  });

});
