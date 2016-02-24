'use strict';

app.controller('ArticlesCtrl', ['$scope', '$http', '$routeParams', '$sce', ArticlesCtrl]);

function ArticlesCtrl($scope, $http, $routeParams, $sce) {
  console.info(1234, $routeParams.category);
  var arts = this;
  arts.category = $routeParams.category;
  $http.get('api.php?act=getArticles&category=' + arts.category).then(function(result) {
    console.info(result.data);
    arts.articles = result.data;
    // $scope.categories = result.data;
  });
}
