'use strict';

app.controller('ArticlesCtrl', ['$scope', '$http', '$routeParams', '$sce', ArticlesCtrl]);

function ArticlesCtrl($scope, $http, $routeParams, $sce) {
  console.info(1234, $routeParams.category);
  $scope.category = $routeParams.category;
  $http.get('api.php?act=getCategories').then(function(result) {
    console.info(result.data);

    $scope.categories = result.data;
  });
}
