app.controller('mainController', ['$scope', '$state', function ($scope, $state) {
    $scope.Game = $scope.Game || {
		
		highScore : 5,
		totalGames : 0,
		size : 15,
		speed : 75,
		passThrough : false,
		currentScore : 0,
		immortal: false,
		board : []
	};
	
	
	 $scope.startNewGame = function () {
    	$scope.Game.totalGames++;
    	$state.go('home.gameState');
		initBoard();
		//$scope.inGame = true; 

    }
	    
	function initBoard() {
		$scope.Game.board = [];
        var i, len;
        for (i = 0; i < $scope.Game.size; i++) {
            $scope.Game.board[i] = [];
            for (var j = 0; j < $scope.Game.size; j++) {
                $scope.Game.board[i][j] = 'board';
            }
        }

    }
	
	$scope.getColor = function (i, j) {
        if ($scope.Game.board[i][j] === 'snake') {
            return $scope.Game.immortal ? '#7f203B' : '#595241';
        }
        if ($scope.Game.board[i][j] === 'apple') {
            return $scope.Game.immortal ? '#222526' : '#8A0917';
        }
        return $scope.Game.immortal ? '#FFBB6E' : '#ACCFCC';
    };
	
}]);