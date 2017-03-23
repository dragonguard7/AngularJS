'use strict';

app.controller('mainController', 
                                  function ($scope, $timeout, $state ) {
    
	//Direction control
	var LEFT = 37,
    	UP = 38,
    	RIGHT = 39,
    	DOWN = 40,
    	interval = 100;
	
	$scope.Game = $scope.Game || {
		temp : 5,
		highScore : 5,
		totalGames : 0,
		size : 8,
		speed : 75,
		passThrough : false,
		currentScore : 0,
		immortal: false,
		snake: {},
		board : []
	};
	
	
	$scope.startNewGame = function () {
    	$scope.Game.totalGames++;
    	$state.go('home.gameState');
		initSnake();
    	initBoard();
		generateApple();
		//$scope.inGame = true; 
        interval = $scope.Game.speed * -2.5 + 300;
        $timeout(runGame, interval);

    };
//**********Init functions
	function initBoard() {
		$scope.Game.board = [];
        var i, len;
        for (i = 0; i < $scope.Game.size; i++) {
            $scope.Game.board[i] = [];
            for (var j = 0; j < $scope.Game.size; j++) {
                $scope.Game.board[i][j] = 'board';
            }
        }
        
        for (i = 0, len = $scope.Game.snake.body.length; i < len; i++) {

            $scope.Game.board[$scope.Game.snake.body[i].x][$scope.Game.snake.body[i].y] = 'snake';
        }

    }
	
    function initSnake() {
        $scope.Game.snake = {
            body: [{x: 1, y: 0}, {x: 0, y: 0}],
            direction: RIGHT,
            pendingDirection: RIGHT
        };
    }
//*********** Main loop
    function runGame(){
    	var newHead = nextMove();
    	
        if (checkHitWall(newHead) && !$scope.Game.passThrough) {
            gameOver();
            return;
        }
        /*
        if (!$scope.game.immortal && checkHitBody(newHead)) {
            gameOver();
            return;
        }
        */
        
        $scope.Game.snake.body.unshift(newHead);
        $scope.Game.board[newHead.x][newHead.y] = 'snake';
        /*
        if (checkHitApple(newHead)) {
            eatApple();
        }
        */
        var tail = $scope.Game.snake.body.pop();
        
        $scope.Game.board[tail.x][tail.y] = hitSnake(tail) ? 'snake' : 'board';
        /*
        snake.direction = snake.pendingDirection;
        
        if (limitReached()) {
            //win();
        } else {
            $timeout(nextStep, interval);
        }
        */
        $timeout(runGame, interval);
    	
    }
    
    function nextMove() {
        var newHead = angular.copy($scope.Game.snake.body[0]);
        if ($scope.Game.snake.pendingDirection === LEFT) {
            newHead.x--;
        } else if ($scope.Game.snake.pendingDirection === RIGHT) {
            newHead.x++;
        } else if ($scope.Game.snake.pendingDirection === UP) {
            newHead.y--;
        } else if ($scope.Game.snake.pendingDirection === DOWN) {
            newHead.y++;
        }
        if ($scope.Game.passThrough) {
            if (newHead.x < 0 || newHead.x >= $scope.Game.size) {
                newHead.x = (newHead.x + $scope.Game.size) % $scope.Game.size;
            }
            if (newHead.y < 0 || newHead.y >= $scope.Game.size) {
                newHead.y = (newHead.y + $scope.Game.size) % $scope.Game.size;
            }
        }
        return newHead;
    }
    
	
//***********Helper functions	
    function generateApple() {
        var apple = {
            x: Math.floor(Math.random() * $scope.Game.size),
            y: Math.floor(Math.random() * $scope.Game.size)
        };
        
        $scope.Game.board[apple.x][apple.y] = 'apple';
        /*
        if (hitSnake(apple)) {
            generateApple();
        } else {
            $scope.board[apple.x][apple.y] = 'apple';
        }
        */
        
    }
    
    function hitSnake(point) {
        var i, len;
        for (i = 0, len = $scope.Game.snake.body.length; i < len; i++) {
            if ($scope.Game.snake.body[i].x === point.x && $scope.Game.snake.body[i].y === point.y) {
                return true;
            }
        }
        return false;
    }
    
    function checkHitWall(point) {
        return point.x < 0 || point.y < 0 || point.x >= $scope.Game.size || point.y >= $scope.Game.size;
    }
	
    function gameOver() {
        
        if ($scope.Game.currentScore > $scope.Game.highScore) {
            $scope.Game.highScore = $scope.Game.currentScore;
        }
        $state.go('home.endState');
    }
	
	//Getter functions
	
	$scope.getColor = function (i, j) {
        if ($scope.Game.board[i][j] === 'snake') {
            return $scope.Game.immortal ? '#7f203B' : '#595241';
        }
        if ($scope.Game.board[i][j] === 'apple') {
            return $scope.Game.immortal ? '#222526' : '#8A0917';
        }
        return $scope.Game.immortal ? '#FFBB6E' : '#ACCFCC';
    };
	
    
});