'use strict';

app.controller('ArticlesCtrl', ['$scope', '$http', '$routeParams', '$sce', function($scope, $http, $routeParams, $sce) {
  console.info(1234, $routeParams.category);
  $scope.category = $routeParams.category;
  $http.get('api.php?act=getCategories').success(function(data) {
    console.info(data);

    $scope.categories = data;
  });
}]);
