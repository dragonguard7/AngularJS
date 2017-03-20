var app = angular.module("myApp", ["ngRoute", "ngMaterial", 'jkAngularCarousel']);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
	    controller: 'homeController',
        templateUrl : "js/views/home.html"
    })
    .when('/aboutMe', {
	    controller: 'aboutMeController',
        templateUrl : "js/views/aboutMe.html"
    })
    .when('/portfolio', {
	    controller: 'portfolioController',
        templateUrl : "js/views/portfolio.html"
    })
	.when('/snake', {
		controller: 'SnakeController',
        templateUrl: "js/views/snake.html"       
    });
	
});