(function(angular){

angular.module('d3AngularApp', ['d3serviceMod'])
.controller('MainCtrl', ['$scope', function($scope){
      $scope.greeting = "Resize the page to see the re-rendering";
      $scope.data = [
        {name: "A", score: 98},
        {name: "B", score: 70},
        {name: 'C', score: 15},
        {name: "D", score: 48},
        {name: "E", score: 30}
      ];
  }]);
})(window.angular);