var app = angular
  .module('MyApp', [
    'ui.router'
  ])
.config(['$stateProvider', '$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home/settings');

    $stateProvider
        // States
     .state("home", {
          controller:'mainController',
          url:"/home",
          templateUrl: "snake.html"
      })  
	  .state("home.settings", {
          controller:'mainController',
          parent: 'home',
          url:"/settings",
          templateUrl: 'settings.html'
      }) 
      .state("home.gameState", {
          controller:'mainController',
          parent: 'home',
          url:"/gameState",
          templateUrl: 'gameState.html'
      })  
      .state("home.endState", {
          controller:'mainController',
          parent: 'home',
          url: "/endState",
          templateUrl: 'endState.html'
      })  
}])
;
app.run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ])