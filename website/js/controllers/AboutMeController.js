app.controller('aboutMeController', function($scope){
   $scope.home = "Home";
   $scope.aboutMe = "About Me!";
   $scope.portfolio = "Portfolio";
    $scope.customers=[
        {name:'jerry',city:'chicago'},
        {name:'tom',city:'houston'},
        {name:'enslo',city:'taipei'}
    ];
});