app.directive('breadcrumbs', ['$location', function(location) {
  return {
    restrict: 'C',
    link: function($scope, $element, $attrs) {
      console.info(arguments);
      var elementPath = $attrs.href.substring(1);
      $scope.$location = location;
      $scope.$watch('$location.path()', function(locationPath) {
        console.info(locationPath);
        // (elementPath === locationPath) ? $element.addClass("current") : $element.removeClass("current");
      });
    }
  };
}]);