app.controller('portfolioController', function($scope){
   $scope.portfolio = "Portfolio";


   $scope.setSelectedImage = function(image){
	   $scope.selectedImage = image;
   }
   
   $scope.popUp = false;
   $scope.togglePopUp = function() {
	   $scope.popUp = !$scope.popUp;
	   
   };
     
   $scope.types = ["All", "java", "angular", "C", "C++"];
   $scope.images = [ 
	  { 
	    icon: 'img/snake.jpg', 
	    title: 'Snake', 
	    description: 'Slither around, eat and grow!',
		type: "Angular",
		url: "portfolio_projects/snake/index.html"
	  }, 
	  { 
	    icon: 'img/carousel.jpg', 
	    title: 'Carousel', 
	    description: 'Look through pictures in style',
		type: "Angular",
		url: "portfolio_projects/Carousel/index.html"
	  },
	  {
	    icon: 'img/SeniorDesignProject.jpg',
	    title: 'Senior Design Project',
	    description: 'Self flying, tracking airplane',
		type: "C",
		url: "http://www.eecs.ucf.edu/seniordesign/fa2012sp2013/g02/"
	  },
	  {
	    icon: 'img/breakout.jpg',
	    title: 'Breakout',
	    description: 'Destroy all the bricks',
		type: "Java",
		url: "No link"
	  }, 
	  { 
	    icon: 'img/hitori.jpg', 
	    title: 'Hitori Solver', 
	    description: 'Give it a puzzle to solve',
		type: "Java",
		url: "No link"
	  },
	  {
	    icon: 'img/linkList.jpg',
	    title: 'Linked list',
	    description: 'Adjust the list to your desire',
		type: "C++",
		url: "No link"
	  },
	  {
		icon: 'img/mazeRunner.jpg',
		title: 'Maze Runner',
		description: 'Look for the goal!',
		type: "Java",
		url: "No link"
	  },
	  {
	    icon: 'img/RPG.jpg',
	    title: 'Tile RPG',
	    description: 'Explore the world!',
		type: "Java",
		url: "No link"
	  },
	  {
	    icon: 'img/reader.jpg',
	    title: 'Reader',
	    description: 'Navigate through books',
		type: "Angular",
		url: "portfolio_projects/Reader/index.html"
	  },
	  { 
		    icon: 'img/sudoku.jpg', 
		    title: 'Sudoku Solver', 
		    description: 'Give it a puzzle to solve',
			type: "Java",
			url: "No link"
	  }
	];

});