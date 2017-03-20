"use strict";

var app = angular.module('snakeApp', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/game', {
                templateUrl: 'snake.html',
                controller: 'SnakeController'
            })
            .otherwise({redirectTo: '/game'});
    }]);