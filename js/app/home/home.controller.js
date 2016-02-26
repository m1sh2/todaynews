'use strict';

app.controller('HomeCtrl', ['$scope', '$http', HomeCtrl]);

function HomeCtrl($scope, $http) {
  // console.info(123);
  var home = this;
  function getArticles() {
    $http.get('api.php?act=getArticlesHome').then(function(result) {
      // console.info(result);
      home.articles = result.data;
      // $scope.user = data;
    });
  }

  getArticles();
}
