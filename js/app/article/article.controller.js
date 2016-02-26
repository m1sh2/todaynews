'use strict';

app.controller('ArticleCtrl', ['$scope', '$http', '$routeParams', '$sce', ArticleCtrl]);

function ArticleCtrl($scope, $http, $routeParams, $sce) {
  // console.info(1234, $routeParams);
  var art = this;
  art.category = $routeParams.category;
  art.article = $routeParams.article;
  $http.get('api.php?act=getArticle&category=' + art.category + '&article=' + art.article).then(function(result) {
    // console.info(result.data);
    art.title = result.data.title;
    art.content = result.data.content;
    // $scope.categories = result.data;
  });
}
