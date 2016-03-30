'use strict';

app.controller('ArticleCtrl', ['$scope', 'xhr', '$routeParams', '$sce', ArticleCtrl]);

function ArticleCtrl($scope, xhr, $routeParams, $sce) {
  // console.info(1234, $routeParams);
  var art = this;
  art.article_url = $routeParams.article;
  art.category_url = $routeParams.category;
  art.category = {};
  art.title = '';
  art.contentBegin = '';
  art.contentEnd = '';
  art.mostViewed = [];
  art.mostNew = [];


  xhr.get('api.php?act=getArticle', {category: art.category_url, article: art.article_url}, function(result) {
    // console.info(result.data);
    art.title = result.data.title;
    art.date = result.data.date;
    art.views = result.data.views;
    var content = $('<div>');
    content.append(result.data.content);
    var ch = content.children();
    var begin = $('<div>');
    var end = $('<div>');
    if (ch.length > 1) {
      var half = Math.floor(ch.length / 2);
      var i = 0;
      content.children().each(function() {
        var child = $(this);
        if (i < half) {
          begin.append(child);
        } else {
          end.append(child);
        }
        i++;
      });
    } else {
      begin.append(content.html());
      end = $('<div>');
    }
    // console.info(begin, end, ch);
    art.contentBegin = begin.html();
    art.contentEnd = end.html();
    // art.content = result.data.content.split(/(p>)(.*)(<p)/g);

    // art.contentBegin = art.content[0];
    // console.info(content);
    // $scope.categories = result.data;
  });

  function getArticles() {
    xhr.get('api.php?act=getArticlesMostViewed', {category_url: art.category_url, limit: 5}, function(result) {
      if (result.data.error) {
        art.mostViewed = [];
        art.category.title = _txt(result.data.error);
      } else {
        art.mostViewed = result.data.articles;
        art.category = result.data.category;
      }
    });
    
    xhr.get('api.php?act=getArticlesMostNew', {category_url: art.category_url, limit: 5}, function(result) {
      if (result.data.error) {
        art.mostNew = [];
      } else {
        art.mostNew = result.data.articles;
      }
    });
  }

  getArticles();
}
