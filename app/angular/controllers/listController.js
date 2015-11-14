(function() {
	'use strict';

	var app = angular.module('app');
	app.controller('listController', ['$scope', function($scope) {
		$scope.header = 'ToDo Header';
		$scope.adding = false;
		$scope.newItem = '';

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
				dateCreated: new Date().toISOString(),
				complete: false
			};
			$scope.items.push(item);
			$scope.adding = false;
			$scope.saveItems();
			setTimeout(function() {
				$('.timeago').timeago();
			}, 0);
		};

		$scope.saveItems = function() {
			localStorage.setItem('todo-items', JSON.stringify($scope.items));
		};

		$scope.loadItems = function() {
			var itemString = localStorage.getItem('todo-items');
			return itemString ? JSON.parse(itemString) : [];
		};

		$scope.items = $scope.loadItems();

		setTimeout(function() {
			$('.timeago').timeago();
		}, 0);
	}]);
})();
