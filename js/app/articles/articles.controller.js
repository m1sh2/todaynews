'use strict';

app.controller('ArticlesCtrl', ['$scope', 'xhr', '$routeParams', '$sce', ArticlesCtrl]);

function ArticlesCtrl($scope, xhr, $routeParams, $sce) {
  // console.info($routeParams.category);
  var arts = this;
  arts.category_url = $routeParams.category;
  arts.category = {};
  arts.mostViewed = [];
  arts.mostNew = [];

  function getArticles() {
    xhr.get('api.php?act=getArticlesMostViewed', {category_url: arts.category_url, limit: 11}, function(result) {
      if (result.data.error) {
        arts.mostViewed = [];
        arts.category.title = _txt(result.data.error);
      } else {
        arts.mostViewed = result.data.articles;
        arts.category = result.data.category;
      }
    });

    xhr.get('api.php?act=getArticlesMostNew', {category_url: arts.category_url, limit: 5}, function(result) {
      if (result.data.error) {
        arts.mostNew = [];
      } else {
        arts.mostNew = result.data.articles;
      }
    });
  }

  getArticles();
}
