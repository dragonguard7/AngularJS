
app.controller('SnakeController', ['$scope', '$timeout', '$window', function ($scope, $timeout, $window) {

    var snake, apple, interval, immortalTickInterval, immortalChecker;

	
		
	
    var SIZE = 20,
        LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40,
        SNAKE = 'snake',
        APPLE = 'apple',
        BOARD = 'board',
        IMMORTAL_CODE = "iddqd",
        IMMORTAL_DURATION_SEC = 60;
		
		

    function initGame() {
        $scope.game = {};
		$scope.size = 15;
		$scope.speed = 75;
		$scope.passThrough = false;
        $scope.game.highScore = 0;
        $scope.game.totalGames = 0;
    }

    $scope.startNewGame = function () {
		if($scope.size > SIZE){ $scope.size = SIZE;}
		if($scope.speed > 100) {$scope.speed = 100;}
		if($scope.speed < 0) {$scope.speed = 0;}
        $scope.game.totalGames++;
        $scope.game.immortal = false;
        $scope.game.currentScore = 0;
        resetImmortal();
        initSnake();
        initBoard();
        generateApple();
        interval = $scope.speed * -2.5 + 300;
		$timeout(nextStep, interval);
    }

    function initBoard() {
        $scope.board = [];
        var i, len;
        for (i = 0; i < $scope.size; i++) {
            $scope.board[i] = [];
            for (var j = 0; j < $scope.size; j++) {
                $scope.board[i][j] = BOARD;
            }
        }
        for (i = 0, len = snake.body.length; i < len; i++) {

            $scope.board[snake.body[i].x][snake.body[i].y] = SNAKE;
        }

    }

    function initSnake() {
        snake = {
            body: [{x: 1, y: 0}, {x: 0, y: 0}],
            direction: RIGHT,
            pendingDirection: RIGHT
        };
    }

    // todo - refactor - use styles approach
    $scope.getColor = function (i, j) {
        if ($scope.board[i][j] === SNAKE) {
            return $scope.game.immortal ? '#7f203B' : '#595241';
        }
        if ($scope.board[i][j] === APPLE) {
            return $scope.game.immortal ? '#222526' : '#8A0917';
        }
        return $scope.game.immortal ? '#FFBB6E' : '#ACCFCC';
    };

    function nextStep() {
        var newHead = getNextHead();
        if (checkHitWall(newHead) && !$scope.passThrough) {
            gameOver();
            return;
        }
        if (!$scope.game.immortal && checkHitBody(newHead)) {
            gameOver();
            return;
        }
        snake.body.unshift(newHead);
        $scope.board[newHead.x][newHead.y] = SNAKE;
        if (checkHitApple(newHead)) {
            eatApple();
        }
        var tail = snake.body.pop();
        $scope.board[tail.x][tail.y] = checkHitBody(tail) ? SNAKE : BOARD;
        snake.direction = snake.pendingDirection;
        if (limitReached()) {
            win();
        } else {
            $timeout(nextStep, interval);
        }
    }

    function checkHitWall(point) {
        return point.x < 0 || point.y < 0 || point.x >= $scope.size || point.y >= $scope.size;
    }

    function checkHitBody(point) {
        var i, len;
        for (i = 0, len = snake.body.length; i < len; i++) {
            if (snake.body[i].x === point.x && snake.body[i].y === point.y) {
                return true;
            }
        }
        return false;
    }

    function checkHitApple(head) {
        return head.x === apple.x && head.y === apple.y;
    }

    function limitReached() {
        return snake.body.length === $scope.size * $scope.size;
    }

    function getNextHead() {
        var newHead = angular.copy(snake.body[0]);
        if (snake.pendingDirection === LEFT) {
            newHead.x--;
        } else if (snake.pendingDirection === RIGHT) {
            newHead.x++;
        } else if (snake.pendingDirection === UP) {
            newHead.y--;
        } else if (snake.pendingDirection === DOWN) {
            newHead.y++;
        }
        if ($scope.passThrough) {
            if (newHead.x < 0 || newHead.x >= $scope.size) {
                newHead.x = (newHead.x + $scope.size) % $scope.size;
            }
            if (newHead.y < 0 || newHead.y >= $scope.size) {
                newHead.y = (newHead.y + $scope.size) % $scope.size;
            }
        }
        return newHead;
    }

    function eatApple() {
        $scope.game.currentScore++;
        var tail = angular.copy(snake.body[snake.body.length - 1]);
        snake.body.push(tail);
        interval -= 2;
        generateApple();
    }

    // todo - make generation by index from empty place to remove stack overflow
    function generateApple() {
        apple = {
            x: Math.floor(Math.random() * $scope.size),
            y: Math.floor(Math.random() * $scope.size)
        };
        if (checkHitBody(apple)) {
            generateApple();
        } else {
            $scope.board[apple.x][apple.y] = APPLE;
        }
    }

    function gameOver() {
       
        if ($scope.game.currentScore > $scope.game.highScore) {
            $scope.game.highScore = $scope.game.currentScore;
        }
        //startNewGame();// todo - show game over popup
    }

    function win() {
        
        if ($scope.game.currentScore > $scope.game.highScore) {
            $scope.game.highScore = $scope.game.currentScore;
        }
        //startNewGame();// todo - show win popup
    }

    // todo - need refactor, don't use 'view' in 'controller'
    $window.addEventListener("keydown", function (e) {
        var keyCode = e.keyCode;
        if (keyCode === LEFT && snake.direction !== RIGHT) {
            snake.pendingDirection = LEFT;
        } else if (keyCode === UP && snake.direction !== DOWN) {
            snake.pendingDirection = UP;
        } else if (keyCode === RIGHT && snake.direction !== LEFT) {
            snake.pendingDirection = RIGHT;
        } else if (keyCode === DOWN && snake.direction !== UP) {
            snake.pendingDirection = DOWN;
        } else {
            checkImmortal(e);
        }

    });

    function checkImmortal(e) {
        var charCode = e.which;
        if (!e.shiftKey) {
            charCode += 32;
        }
        if (immortalChecker.length > 0 && immortalChecker.charCodeAt(0) === charCode) {
            immortalChecker = immortalChecker.substr(1);
            if (immortalChecker.length === 0) {
                clearInterval(immortalTickInterval);
                if (!$scope.game.immortal)
                {
                    $scope.game.immortal = true;
                    $scope.game.timeout = IMMORTAL_DURATION_SEC;
                    immortalTickInterval = setInterval(tickImmortalTimeout, 1000);
                } else {
                    resetImmortal();
                }
            }
        } else {
            resetImmortalInput();
        }
    }

    function tickImmortalTimeout()
    {
        $scope.game.timeout--;
        if ($scope.game.timeout <= 0)
        {
            resetImmortal();
        }
    }

    function resetImmortal(){
        clearInterval(immortalTickInterval);
        $scope.game.immortal = false;
        $scope.game.timeout = 0;
        resetImmortalInput();
    }

    function resetImmortalInput() {
        immortalChecker = IMMORTAL_CODE;
    }

    initGame();
}
]);