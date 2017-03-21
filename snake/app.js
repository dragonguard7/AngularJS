"use strict";

var app = angular.module('snakeApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'snake.html',
        })
        .state('game', {
            url: '/game',
            templateUrl: 'gameState.html',
        })
        .state('end', {
            url: '/end',
            templateUrl: 'endState.html',
        });
            // nested list with custom controller
		
    });

	