(function() {
	'use strict';

	var app = angular.module('app');
	app.controller('listController', ['$scope', '$filter', 'hotkeys', function($scope, $filter, hotkeys) {
		$scope.adding = false;
		$scope.newItem = '';

		hotkeys.bindTo($scope).add({
			combo: 'esc',
			description: 'Cancel the addition of a new item',
			callback: function(event, hotkey) {
				$scope.adding = false;
			}
		});

		hotkeys.bindTo($scope).add({
			combo: 'enter',
			description: 'Submit the new item input',
			callback: function(event, hotkey) {
				if ($scope.adding) {
					$scope.submitItem();
				}
			}
		});

		hotkeys.bindTo($scope).add({
			combo: 'q',
			description: 'Start creating a new item',
			callback: function(event, hotkey) {
				if (!$scope.adding) {
					$scope.createItem();
				}
			}
		});

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

		$scope.stopEditing = function() {
			$scope.adding = false;
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
