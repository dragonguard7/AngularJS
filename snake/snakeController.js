'use strict';

app.controller('mainController', 
                                  function ($scope, $timeout, $state, $window ) {
    
	//Direction control
	var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40,
		MAXSIZE = 20, MINSIZE = 5, MAXSPEED = 100, MINSPEED=0,
    	apple = {},
    	interval = 100;
	
	$scope.Game = $scope.Game || {
		highScore : 0,
		totalGames : 0,
		size : 10,
		speed : 70,
		passThrough : false,
		currentScore : 0,
		immortal: false,
		snake: {},
		board : []
	};
	
	
	$scope.startNewGame = function () {
    	initSettings();
    	$state.go('home.gameState');
		initSnake();
    	initBoard();
		generateApple();
        interval = $scope.Game.speed * -2 + 250;
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
            pendingDirection: DOWN
        };
    }
    
	function initSettings() {	 
		if($scope.Game.size > MAXSIZE){ $scope.Game.size = MAXSIZE;}
		if($scope.Game.size < MINSIZE){ $scope.Game.size = MINSIZE;}
		if($scope.Game.speed > MAXSPEED) {$scope.Game.speed = MAXSPEED;}
		if($scope.Game.speed < MINSPEED) {$scope.Game.speed = MINSPEED;}
        $scope.Game.totalGames++;
        $scope.Game.immortal = false;	
		$scope.Game.currentScore = 0;
    }
    
//*********** Main loop
    function runGame(){
    	var newHead = nextMove();
    	
    	if(!$scope.Game.immortal){
	        if (checkHitWall(newHead) && !$scope.Game.passThrough) {
	            gameOver();
	            return;
	        }
	        
	        if (hitSnake(newHead)) {
	            gameOver();
	            return;
	        }
    	}
        
        $scope.Game.snake.body.unshift(newHead);
        $scope.Game.board[newHead.x][newHead.y] = 'snake';
        
        if (checkHitApple(newHead)) {
            eatApple();
        }
        
        var tail = $scope.Game.snake.body.pop();
        
        $scope.Game.board[tail.x][tail.y] = hitSnake(tail) ? 'snake' : 'board';
        
        $scope.Game.snake.direction = $scope.Game.snake.pendingDirection;
        /*
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
        if ($scope.Game.passThrough || $scope.Game.immortal) {
            if (newHead.x < 0 || newHead.x >= $scope.Game.size) {
                newHead.x = (newHead.x + $scope.Game.size) % $scope.Game.size;
            }
            if (newHead.y < 0 || newHead.y >= $scope.Game.size) {
                newHead.y = (newHead.y + $scope.Game.size) % $scope.Game.size;
            }
        }
        return newHead;
    }
    
    $scope.moveSnake = function(direction){
    	if(direction.which == RIGHT){
    		
    	}
    	
    }
    
    $window.addEventListener("keydown", function (e) {
        var keyCode = e.keyCode;
        if (keyCode === LEFT && $scope.Game.snake.direction !== RIGHT) {
        	$scope.Game.snake.pendingDirection = LEFT;
        } else if (keyCode === UP && $scope.Game.snake.direction !== DOWN) {
        	$scope.Game.snake.pendingDirection = UP;
        } else if (keyCode === RIGHT && $scope.Game.snake.direction !== LEFT) {
        	$scope.Game.snake.pendingDirection = RIGHT;
        } else if (keyCode === DOWN && $scope.Game.snake.direction !== UP) {
        	$scope.Game.snake.pendingDirection = DOWN;
        } else {
            //checkImmortal(e);
        }

    });
    
	
//***********Helper functions
    //*********Generate, collision, and consumption
    function generateApple() {
        apple = {
            x: Math.floor(Math.random() * $scope.Game.size),
            y: Math.floor(Math.random() * $scope.Game.size)
        };
           
        if (hitSnake(apple)) {
            generateApple();
        } else {
            $scope.Game.board[apple.x][apple.y] = 'apple';
        }
           
    }
    
    function checkHitApple(head) {
        return head.x === apple.x && head.y === apple.y;
    }
    
    function eatApple() {
        $scope.Game.currentScore++;
        var tail = angular.copy($scope.Game.snake.body[$scope.Game.snake.body.length - 1]);
        $scope.Game.snake.body.push(tail);
        generateApple();
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