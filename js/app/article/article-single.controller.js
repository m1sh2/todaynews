'use strict';

app.controller('ArticleSingleCtrl', ['$scope', 'xhr', '$routeParams', '$sce', '$location', ArticleSingleCtrl]);

function ArticleSingleCtrl($scope, xhr, $routeParams, $sce, $location) {
  
  var art = this;
  art.article_url = $location.path().substr(1);
  art.title = '';
  art.content = '';
  console.info(art.article_url);

  xhr.get('api.php?act=getArticleSingle', {article: art.article_url}, function(result) {
    // console.info(result.data);
    art.title = result.data.title;
    art.date = result.data.date;
    art.views = result.data.views;
    art.content = result.data.content;
  });
}
