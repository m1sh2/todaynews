'use strict';

app.controller('ArticlesCtrl', ['$scope', '$http', '$routeParams', '$sce', ArticlesCtrl]);

function ArticlesCtrl($scope, $http, $routeParams, $sce) {
  // console.info(1234, $routeParams.category);
  var arts = this;
  arts.category_url = $routeParams.category;
  arts.category = {};
  $http.get('api.php?act=getArticles&category_url=' + arts.category_url).then(function(result) {
    if (result.data.error) {
      arts.articles = [];
      arts.category.title = _txt(result.data.error);
    } else {
      arts.articles = result.data.articles;
      arts.category = result.data.category;
    }
    
    // $scope.categories = result.data;
  });
}
