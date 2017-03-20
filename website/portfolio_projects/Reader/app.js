var app = angular.module('bookTest', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider 
     .when("/",{
      controller: 'BookshelfController',
      templateUrl: 'bookshelf.html'
    })
	 .when("/books/:bookId",{
	  controller: 'BookController',
      templateUrl: 'book.html'
	})
	 .when("/books/:bookId/chapters/:chapterId",{
      controller: 'ChapterController',
      templateUrl: 'chapter.html'
    })
    .otherwise({
      redirectTo: '/'
    });
	
  });