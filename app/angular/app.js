(function() {
	'use strict';

	var _templateBase = './angular/views';

	var app = angular.module('app', ['ngRoute', 'cfp.hotkeys']);
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: _templateBase + '/list.html',
			controller: 'listController',
			controllerAs: '_ctrl'
		});
		$routeProvider.otherwise({
			redirectTo: '/'
		});
	}]);
})();
