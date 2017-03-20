app.factory('books', ['$http', function($http) {		
	
	var bookData = {};

	bookData.getData = function(){
     return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/books-api/books.json').then(function(res){
       return res.data;
     },function(error){
       console.log(error);
       return [];
     });
   }

   return bookData;
}]);