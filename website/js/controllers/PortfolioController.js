app.controller('portfolioController', function($scope){
   $scope.portfolio = "Portfolio";

   $scope.types = ["All", "java", "angular", "C", "C++"];
   $scope.apps = [ 
	  { 
	    icon: 'img/move.jpg', 
	    title: 'MOVE', 
	    developer: 'MOVE, Inc.',
		type: "Java",
		url: "none"
	  }, 
	  { 
	    icon: 'img/carousel.jpg', 
	    title: 'Carousel', 
	    developer: 'Me',
		type: "Angular",
		url: "portfolio_projects/Carousel/index.html"
	  },
	  {
	    icon: 'img/gameboard.jpg',
	    title: 'Gameboard',
	    developer: 'Armando P.',
		type: "C",
		url: "none"
	  },
	  {
	    icon: 'img/forecast.jpg',
	    title: 'Forecast',
	    developer: 'Forecast',
		type: "Java",
		url: "none"
	  }, 
	  { 
	    icon: 'img/drjekyllmrhyde.jpg', 
	    title: 'Dr. Jekyll and Mr. Hyde', 
	    developer: 'Chico Dusty',
		type: "Java",
		url: "none"
	  },
	  {
	    icon: 'img/metamorphosis.jpg',
	    title: 'Metamorphosis',
	    developer: 'Armando P.',
		type: "C++",
		url: "none"
	  },
	  {
	    icon: 'img/heartofdarkness.jpg',
	    title: 'Heart of Darkness',
	    developer: 'Forecast',
		type: "C",
		url: "none"
	  },
	  {
	    icon: 'img/reader.jpg',
	    title: 'Reader',
	    developer: 'Me',
		type: "Angular",
		url: "portfolio_projects/Reader/index.html"
	  }
	];

});