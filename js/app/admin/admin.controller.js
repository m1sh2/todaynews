'use strict';

app.controller('AdminCtrl', [
  '$scope', '$http', '$routeParams', '$sce', '$location',
  function($scope, $http, $routeParams, $sce, $location) {
    console.info(1234, $routeParams.category);
    var code = null;
    code = localStorage.getItem('code');
    if (code !== null && typeof code !== 'undefined' && code.length === 64) {
      $scope.user = code;
      displayAdmin();
    } else {
      $scope.user = null;
      $location.path("/login");
    }
    
    getArticles();
    // $scope.article = {};
    $scope.article_title = 'test article';
    $scope.article_content = 'content article';
    $scope.addArticle = function(f) {
      console.info(f, $scope.article_title);
      var data = {};
      data.title = $scope.article_title;
      data.content = $scope.article_content;
      $http.post('api.php?act=addArticle&data=' + btoa(JSON.stringify(data))).then(function(result) {
        console.info(result);
        getArticles();
        // $scope.user = data;
      });
    }

    function getArticles() {
      $http.get('api.php?act=getArticles').then(function(result) {
        console.info(result);
        $scope.articles = result.data;
        // $scope.user = data;
      });
      
    }
    
    function displayAdmin() {
      console.assert('admin');
    }
  }
]);
