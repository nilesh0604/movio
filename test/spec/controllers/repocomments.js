'use strict';

describe('Controller: RepocommentsCtrl', function () {

  // load the controller's module
  beforeEach(module('movioApp'));

  var RepocommentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RepocommentsCtrl = $controller('RepocommentsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
