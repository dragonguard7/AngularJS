app.controller('ChapterController', ['$scope', 'books', '$routeParams', function($scope, books, $routeParams) {
   books.getData().then(function(data) {
    // Your code here
    $scope.book = data[$routeParams.bookId];

    $scope.chapter = $scope.book.chapters[$routeParams.chapterId];



    // If there no more chapters left, go back to the bookshelf view
    if($routeParams.chapterId >= $scope.book.chapters.length - 1 || $routeParams.chapterId < 0) {
      $scope.nextChapterIndex = "#";
    }
  });

  // Using these properties to create the URLs in line 1 and line 11 of view/chapter.html
  $scope.currentBookIndex = parseInt($routeParams.bookId);
  $scope.currentChapterIndex = parseInt($routeParams.chapterId);
    $scope.previousChapterIndex = $scope.currentChapterIndex - 1;
  $scope.nextChapterIndex = $scope.currentChapterIndex + 1;
}]);
