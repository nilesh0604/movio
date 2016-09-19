'use strict';

describe('Controller: SearchresultsCtrl', function () {

  // load the controller's module
  beforeEach(module('movioApp'));

  var SearchresultsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchresultsCtrl = $controller('SearchresultsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
