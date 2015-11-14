(function() {
	'use strict';

	var app = angular.module('app');
	app.controller('listController', ['$scope', function($scope) {
		$scope.header = 'ToDo Header';
	}]);
})();
