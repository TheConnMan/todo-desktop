(function() {
	'use strict';

	var app = angular.module('app');
	app.controller('listController', ['$scope', function($scope) {
		$scope.header = 'ToDo Header';
		$scope.adding = false;
		$scope.newItem = '';

		$scope.items = [];

		$scope.createItem = function() {
			$scope.adding = true;
			$scope.newItem = '';
			setTimeout(function() {
				$('#itemName').focus();
			}, 0);
		};

		$scope.submitItem = function() {
			var item = {
				name: $scope.newItem,
				dateCreated: new Date(),
				complete: false
			};
			$scope.items.push(item);
			$scope.adding = false;
		};
	}]);
})();
