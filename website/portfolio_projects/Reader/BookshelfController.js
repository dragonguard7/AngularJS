app.controller('BookshelfController', ['$scope', 'books', function($scope, books) {
  books.getData().then(function(data) {
    $scope.myBooks = data;
  });
}]);
