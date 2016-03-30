'use strict';

app.controller('HomeCtrl', ['$scope', 'xhr', HomeCtrl]);

function HomeCtrl($scope, xhr) {
  // console.info(123);
  var home = this;
  home.mostViewed = [];
  home.mostNew = [];
  function getArticles() {
    xhr.get('api.php?act=getArticlesHomeMostViewed', {}, function(result) {
      // console.info(result);
      home.mostViewed = result.data;
      // $scope.user = data;
    });
    xhr.get('api.php?act=getArticlesHomeMostNew', {}, function(result) {
      // console.info(result);
      home.mostNew = result.data;
      // $scope.user = data;
    });
  }

  getArticles();
}
