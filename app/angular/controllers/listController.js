(function() {
	'use strict';

	var app = angular.module('app');
	app.controller('listController', ['$scope', '$filter', function($scope, $filter) {
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

		$scope.haveCompleted = function() {
			return $scope.getCompleted().length !== 0;
		};

		$scope.clearCompleted = function() {
			var completed = $scope.getCompleted();
			completed.forEach(function(item) {
				var index = $scope.items.indexOf(item);
				$scope.items.splice(index, 1);
			});
			$scope.saveItems();
		};

		$scope.getCompleted = function() {
			return $filter('filter')($scope.items, {complete: true});
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
