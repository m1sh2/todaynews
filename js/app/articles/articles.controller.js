'use strict';

app.controller('ArticlesCtrl', ['$scope', 'xhr', '$routeParams', '$sce', ArticlesCtrl]);

function ArticlesCtrl($scope, xhr, $routeParams, $sce) {
  // console.info($routeParams.category);
  var arts = this;
  arts.category_url = $routeParams.category;
  arts.category = {};
  xhr.get('api.php?act=getArticles', {category_url: arts.category_url}, function(result) {
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
