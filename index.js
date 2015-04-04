(function(angular){

  var app = angular.module('d3AngularApp', ['d3serviceMod']);

  app.controller('MainCtrl', ['$scope', function($scope){
      $scope.greeting = "Resize the page to see the re-rendering";
      $scope.data = [
        {name: "A", score: 98},
        {name: "B", score: 70},
        {name: 'C', score: 15},
        {name: "D", score: 48},
        {name: "E", score: 30}
      ];
  }]);

  app.directive('d3Bars', ['$window', '$timeout', 'd3Service', 
    function($window, $timeout, d3Service) {
      return {
        restrict: 'E',
        scope: {
          data: '=',
          label: '@',
          onClick: '&'
        },
        link: function(scope, ele, attrs) {
          d3Service.d3().then(function(d3) {

            var renderTimeout;
            var margin = parseInt(attrs.margin) || 20,
                barHeight = parseInt(attrs.barHeight) || 20,
                barPadding = parseInt(attrs.barPadding) || 5;

            var svg = d3.select(ele[0])
              .append('svg')
              .attr('width', 800);

            $window.onresize = function() {
              scope.$apply();
            };

            scope.$watch(function() {
              return angular.element($window)[0].innerWidth;
            }, function() {
              scope.render(scope.data);
            });

            scope.$watch('data', function(newData) {
              scope.render(newData);
            }, true);

            scope.render = function(data) {
              svg.selectAll('*').remove();

              if (!data) return;
              if (renderTimeout) clearTimeout(renderTimeout);

              renderTimeout = $timeout(function() {
                var width = d3.select(ele[0])[0][0].offsetWidth - margin,
                    height = scope.data.length * (barHeight + barPadding),
                    color = d3.scale.category20(),
                    xScale = d3.scale.linear()
                      .domain([0, d3.max(data, function(d) {
                        return d.score;
                      })])
                      .range([0, width]);

                svg.attr('height', height);

                svg.selectAll('rect')
                  .data(data)
                  .enter()
                    .append('rect')
                    .on('click', function(d,i) {
                      return scope.onClick({item: d});
                    })
                    .attr('height', barHeight)
                    .attr('width', 140)
                    .attr('x', Math.round(margin/2))
                    .attr('y', function(d,i) {
                      return i * (barHeight + barPadding);
                    })
                    .attr('fill', function(d) {
                      return color(d.score);
                    })
                    .transition()
                      .duration(1000)
                      .attr('width', function(d) {
                        return xScale(d.score);
                      });
                svg.selectAll('text')
                  .data(data)
                  .enter()
                    .append('text')
                    .classed('bar-label', true)
                    .attr('fill', '#fff')
                    .attr('y', function(d,i) {
                      return i * (barHeight + barPadding) + 15;
                    })
                    .attr('x', 15)
                    .text(function(d) {
                      return d.name + " (scored: " + d.score + ")";
                    });
              }, 200);
            };
          });
        }};
  }]);

  app.controller('ClockCtrl', ['$scope', function($scope){
          $scope.format = 'M/d/yy h:mm:ss a';
    }]);

  app.directive('clockDirect', ['$interval', 'dateFilter', function($interval, dateFilter) {
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

})(window.angular);











