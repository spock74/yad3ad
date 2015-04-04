angular.module('d3AngularApp')
  .controller('ClockCtrl', ['$scope', function($scope){
        $scope.format = 'M/d/yy h:mm:ss a';
  }])
.directive('clockDirect', ['$interval', 'dateFilter', function(interval, dateFilter) {
  function link(scope, element, attrs){
      var format;
      var timeoutId;

      function updateTime(){
            element.text(dateFilter(new Date(), format));
      }
      scope.$watch(attrs.clockDirect, function(value){
        format = value;
        updateTime();
      });

      element.on('$destroy', function(){
        $interval.calcel(timeoutId);
      });

      timeoutId = $interval(function(){
        updateTime();
      }, 1000);
  }
  return {
    link: link
  };
}]);